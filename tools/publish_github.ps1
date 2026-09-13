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
  [switch]$IncludeNonSource
)

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

# 2. 初始化 / 更新 git 仓库
if (-not (Test-Path (Join-Path $Staging ".git"))) {
  git -C $Staging init -b main | Out-Null
}

# git 往 stderr 写东西时，$ErrorActionPreference = "Stop" 会把它当成致命错误，这里临时放宽
$prevEap = $ErrorActionPreference
$ErrorActionPreference = "Continue"

if ($RepoUrl) {
  $existing = @(git -C $Staging remote 2>$null)
  if ($existing -contains "origin") { git -C $Staging remote set-url origin $RepoUrl }
  else { git -C $Staging remote add origin $RepoUrl }
}
$remotes = @(git -C $Staging remote 2>$null)
$remote = ""
if ($remotes -contains "origin") { $remote = (git -C $Staging remote get-url origin 2>$null) }
$ErrorActionPreference = $prevEap

if (-not $remote) {
  Write-Host ""
  Write-Host "发布副本已经准备好（$Staging），但还没有配置 GitHub 仓库地址。" -ForegroundColor Yellow
  Write-Host "在 GitHub 上建好空仓库后，执行（会弹一次浏览器登录）：" -ForegroundColor Yellow
  Write-Host "  powershell -File tools\publish_github.ps1 -RepoUrl https://github.com/用户名/仓库.git"
  exit 2
}

git -C $Staging add -A
$staged = (git -C $Staging diff --cached --name-only | Measure-Object).Count
if ($staged -gt 0) {
  git -C $Staging -c user.name="FAMED Website" -c user.email="website@famedcasting.com" commit -q -m $Message
  Write-Host "已提交 $staged 个文件的改动"
} else {
  Write-Host "没有新改动，直接推送当前提交"
}

# 3. 推送
git -C $Staging push -u origin main
Write-Host ""
Write-Host "完成：$remote"
