<#
  把「公司网站」的源码推送到 GitHub。

  只推送站点源码：index.html 等页面、assets/css、assets/js、assets/img、tools、README 等。
  不推送 _预览截图\（预览长图）、_素材审阅\（素材分析中间产物）、assets\video\（未被页面引用的原始视频）。

  用法（在本目录下）：
    powershell -File tools\publish_github.ps1 -RepoUrl https://github.com/用户名/仓库.git
    之后再发布就不用带 -RepoUrl 了（脚本记住在发布副本的 origin 里）：
    powershell -File tools\publish_github.ps1 -Message "改了什么"
    想把预览截图、素材审阅、原始视频也一起推上去，加 -IncludeNonSource

  首次推送会弹出 GitHub 登录（Git Credential Manager），登录一次之后就免登录。
#>
param(
  [string]$RepoUrl = "",
  [string]$Message = "",
  [string]$Staging = "",
  [string]$Proxy = "",
  [switch]$IncludeNonSource
)

# 直连 GitHub 经常被重置（"Empty reply from server" / 连不上 443），
# 所以这里带一层兜底：直连失败就探测本机常见代理端口，用代理重试一次。
function Test-LocalPort([int]$port) {
  $client = New-Object System.Net.Sockets.TcpClient
  try {
    $client.Connect("127.0.0.1", $port)
    return $true
  } catch {
    return $false
  } finally {
    $client.Dispose()
  }
}

function Find-LocalProxy {
  foreach ($port in 7897, 7890, 7891, 10809, 1080, 8080) {
    if (Test-LocalPort $port) { return "http://127.0.0.1:$port" }
  }
  return ""
}

$ErrorActionPreference = "Stop"

$siteDir = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
if (-not $Staging) { $Staging = Join-Path (Split-Path $siteDir -Parent) "网站源码-GitHub" }
if (-not $Message) { $Message = "更新网站源码 " + (Get-Date -Format "yyyy-MM-dd HH:mm") }

Write-Host "站点目录：$siteDir"
Write-Host "发布副本：$Staging"

# 1. 同步文件到发布副本（默认排除非源码目录，保留副本里的 .git）
$robocopyArgs = @($siteDir, $Staging, "/MIR", "/NFL", "/NDL", "/NJH", "/NJS", "/NP", "/R:1", "/W:1")
# 注意：/XD 要用绝对路径，相对路径（尤其是两级以上）在这里不可靠
$robocopyArgs += @("/XD", (Join-Path $Staging ".git"))
if (-not $IncludeNonSource) {
  $robocopyArgs += @(
    "/XD",
    (Join-Path $siteDir "_预览截图"),
    (Join-Path $siteDir "_素材审阅"),
    (Join-Path $siteDir "assets\video")
  )
}
if (-not (Test-Path $Staging)) { New-Item -ItemType Directory -Path $Staging | Out-Null }
$null = robocopy @robocopyArgs
if ($LASTEXITCODE -ge 8) { throw "robocopy 同步失败（退出码 $LASTEXITCODE）" }

# /MIR 不会清理"被排除目录"的旧内容（例如以前同步进去过的视频），这里显式兜底删一次。
# 删的是发布副本里的内容，源目录不动。
if (-not $IncludeNonSource) {
  foreach ($rel in @("_预览截图", "_素材审阅", "assets\video")) {
    $p = [System.IO.Path]::GetFullPath((Join-Path $Staging $rel))
    if ($p.StartsWith([System.IO.Path]::GetFullPath($Staging)) -and (Test-Path -LiteralPath $p)) {
      Remove-Item -LiteralPath $p -Recurse -Force
      Write-Host "已从发布副本移除：$rel"
    }
  }
}

# 2. 初始化 git 仓库（没有 remote 也照样把改动提交到本地，方便核对）
if (-not (Test-Path (Join-Path $Staging ".git"))) {
  git -C $Staging init -b main | Out-Null
}

if ($RepoUrl) {
  $existing = @(git -C $Staging remote 2>$null)
  if ($existing -contains "origin") { git -C $Staging remote set-url origin $RepoUrl }
  else { git -C $Staging remote add origin $RepoUrl }
}

git -C $Staging add -A
$staged = (git -C $Staging diff --cached --name-only | Measure-Object).Count
if ($staged -gt 0) {
  git -C $Staging -c user.name="FAMED Website" -c user.email="website@famedcasting.com" commit -q -m $Message
  Write-Host "已提交 $staged 个文件的改动"
} else {
  Write-Host "没有新改动，直接推送当前提交"
}

# git 往 stderr 写东西时，$ErrorActionPreference = "Stop" 会把它当成致命错误，这里临时放宽
$prevEap = $ErrorActionPreference
$ErrorActionPreference = "Continue"
$remotes = @(git -C $Staging remote 2>$null)
$remote = ""
if ($remotes -contains "origin") { $remote = (git -C $Staging remote get-url origin 2>$null) }
$ErrorActionPreference = $prevEap

# 3. 推送
if (-not $remote) {
  Write-Host ""
  Write-Host "发布副本已经在 $Staging 提交好了，但还没有配置 GitHub 仓库地址。" -ForegroundColor Yellow
  Write-Host "在 GitHub 建好空仓库后执行（会弹一次浏览器登录）：" -ForegroundColor Yellow
  Write-Host "  powershell -File tools\publish_github.ps1 -RepoUrl https://github.com/用户名/仓库.git"
  exit 2
}

$ErrorActionPreference = "Continue"   # git 往 stderr 写进度，别被当成致命错误

git -C $Staging push -u origin main
if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "完成：$remote"
  exit 0
}

# 直连失败：探测本地代理，用代理再试一次
$directCode = $LASTEXITCODE
$useProxy = if ($Proxy) { $Proxy } else { Find-LocalProxy }

if (-not $useProxy) {
  Write-Host ""
  Write-Host "推送失败（git 退出码 $directCode），也没探测到本地代理。" -ForegroundColor Red
  Write-Host "发布副本已经提交好了，改动没丢。" -ForegroundColor Yellow
  Write-Host "开了代理再重跑本脚本，或用 -Proxy http://127.0.0.1:端口 指定。" -ForegroundColor Yellow
  exit 1
}

Write-Host ""
Write-Host "直连推送失败（git 退出码 $directCode），改用本地代理 $useProxy 重试…" -ForegroundColor Yellow

$prevHttpsProxy = $env:HTTPS_PROXY
$prevHttpProxy = $env:HTTP_PROXY
$env:HTTPS_PROXY = $useProxy
$env:HTTP_PROXY = $useProxy
try {
  git -C $Staging push -u origin main
  $proxyCode = $LASTEXITCODE
} finally {
  # 别把代理变量留在当前会话里
  if ($null -eq $prevHttpsProxy) { Remove-Item Env:HTTPS_PROXY -ErrorAction SilentlyContinue } else { $env:HTTPS_PROXY = $prevHttpsProxy }
  if ($null -eq $prevHttpProxy) { Remove-Item Env:HTTP_PROXY -ErrorAction SilentlyContinue } else { $env:HTTP_PROXY = $prevHttpProxy }
}

if ($proxyCode -eq 0) {
  Write-Host ""
  Write-Host "完成：$remote（经本地代理 $useProxy 推送）" -ForegroundColor Green
  exit 0
}

Write-Host ""
Write-Host "推送失败：直连退出码 $directCode，走代理也失败（退出码 $proxyCode）。" -ForegroundColor Red
Write-Host "发布副本已经提交好了，改动没丢；确认代理可用后重跑本脚本即可。" -ForegroundColor Yellow
exit 1
