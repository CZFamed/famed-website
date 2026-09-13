/**
 * 无头 Edge + CDP 的最小封装，给 tools\ 下的审计脚本共用。
 * 只在本机做开发期检查用，不参与站点构建。
 */
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

export const EDGE =
  process.env.AUDIT_EDGE ||
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.events = [];
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      } else if (msg.method) {
        this.events.push(msg);
      }
    });
  }

  send(method, params = {}, timeout = 60000) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`CDP 超时：${method}`));
        }
      }, timeout);
    });
  }

  async waitEvent(method, timeout = 15000) {
    const start = Date.now();
    for (;;) {
      const hit = this.events.findIndex((e) => e.method === method);
      if (hit >= 0) return this.events.splice(hit, 1)[0];
      if (Date.now() - start > timeout) throw new Error(`等待事件超时：${method}`);
      await sleep(40);
    }
  }

  /** 在页面里跑一段 JS，返回结果值（支持 async 表达式） */
  async eval(expression, { awaitPromise = true } = {}) {
    const { result, exceptionDetails } = await this.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise,
    });
    if (exceptionDetails) throw new Error(exceptionDetails.text || "页面 JS 抛错");
    return result.value;
  }

  async goto(url, { settle = 500, waitLoad = 20000 } = {}) {
    this.events.length = 0;
    await this.send("Page.navigate", { url });
    try {
      await this.waitEvent("Page.loadEventFired", waitLoad);
    } catch {
      /* 加载事件超时也继续，后面照常取数据 */
    }
    await sleep(settle);
  }
}

/**
 * 起一个无头 Edge，返回 { child, cdp, close }。
 * 注意：必须带 --no-sandbox、独立 user-data-dir，否则这台机器上
 * Edge 会启动即退出或者并入已有实例，调试端口连不上。
 */
export async function launchEdge({ port = 9333 } = {}) {
  const profile = path.join(os.tmpdir(), `edge-audit-${port}-${Date.now()}`);
  const child = spawn(
    EDGE,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--hide-scrollbars",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  let info;
  for (let i = 0; i < 100; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) {
        info = await res.json();
        break;
      }
    } catch {
      /* 还没起来 */
    }
    await sleep(200);
  }
  if (!info) throw new Error("无头 Edge 启动失败");

  // /json/version 的 ws 是浏览器级连接，Page/Runtime 域要连到具体页面目标上
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target = targets.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
  if (!target) throw new Error("找不到可用的页面目标");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  const cdp = new CDP(ws);
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");

  return {
    child,
    cdp,
    close() {
      try {
        ws.close();
      } catch {
        /* 忽略 */
      }
      child.kill();
    },
  };
}

/** 按设备规格设置视口（mobile=true 会同时打开 meta viewport 的移动端行为） */
export function setViewport(cdp, { width, height, dpr = 3, mobile = true }) {
  return cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: dpr,
    mobile,
  });
}
