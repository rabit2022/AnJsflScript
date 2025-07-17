<#
.CODING
	UTF-8 ,输出的字符串没有中文，所以不用考虑编码问题。

.SYNOPSIS
    批量获取指定文件夹内音频文件的播放时长，并以单行 JSON 输出。

.DESCRIPTION
    递归扫描指定文件夹下所有常见音频文件（mp3、wav、flac、m4a、wma、aac、ogg）。
    通过 Windows Shell COM 读取时长元数据；若文件不存在、无法解析或时长为空，
    则直接跳过（“查无此人”），最终结果仅包含成功获取时长的条目。
    输出为一行紧凑 JSON，键为文件完整路径，值为时长字符串（如 00:03:45）。

.PARAMETER FolderPath
    必填。要扫描的目标文件夹完整路径；路径含空格需用引号包裹。

.EXAMPLE
    PS> & ".\Get-FolderAudioDurations.ps1" -FolderPath "D:\Music"
    {"D:\Music\\demo 1.mp3":"00:03:45","D:\Music\\intro.wav":"00:00:05"}

.EXAMPLE
    PS> & ".\Get-FolderAudioDurations.ps1" -FolderPath "H:\project\沙雕动画\音频"
    {"H:\project\沙雕动画\音频\\rbgbur.mp3":"00:01:23"}

.NOTES
    作者：穹的兔兔
    日期：2025-07-17
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$FolderPath
)

# 1. 文件夹检测
if (-not (Test-Path -LiteralPath $FolderPath -PathType Container)) {
    Write-Host '{}'
    exit 0
}

# 2. 支持的扩展名
$exts = @('*.mp3','*.wav','*.flac','*.m4a','*.wma','*.aac','*.ogg')

# 3. 先一次性拿文件
$files = Get-ChildItem -LiteralPath $FolderPath -Include $exts -File -Recurse
if (-not $files) { Write-Host '{}'; exit 0 }

# 4. 初始化 Shell
$shell = New-Object -ComObject Shell.Application

# 5. 只收集成功的条目
$result = [ordered]@{}
foreach ($f in $files) {
    try {
        $folderObj = $shell.Namespace($f.DirectoryName)
        $fileObj   = $folderObj.ParseName($f.Name)
        $duration  = $folderObj.GetDetailsOf($fileObj, 27)
        if (-not [string]::IsNullOrWhiteSpace($duration)) {
            $result[$f.FullName] = $duration
        }
    } catch { <# 静默跳过 #> }
}

# 6. 输出单行 JSON
$result | ConvertTo-Json -Compress