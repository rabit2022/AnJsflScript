<#
.SYNOPSIS
    获取单个音频文件的播放时长（Windows Shell 元数据方式）。

.DESCRIPTION
    利用 Windows Shell COM 对象读取文件的“长度”元数据，无需安装 FFmpeg。
    支持格式取决于系统解码器，一般包括 mp3、wav、flac、m4a、wma、aac、ogg。
    若无法解析或文件无时长，脚本返回空并给出提示。

.PARAMETER Path
    必填。音频文件的完整绝对路径或相对路径；含空格需加引号。

.EXAMPLE
    # 命令行调用示例
    PS> & ".\Get-AudioDuration.ps1" -Path "D:\音乐\demo 1.mp3"
    00:03:45

.EXAMPLE
    # 路径含空格
    PS> & ".\Get-AudioDuration.ps1" -Path "H:\project\沙雕动画\音频\demo 2.wav"
    00:01:20

.NOTES
    作者：穹的兔兔
    日期：2025-07-17
#>

#-----------------------------------------------------------
# 参数定义
#-----------------------------------------------------------
param(
    [Parameter(Mandatory=$true, HelpMessage="音频文件完整路径")]
    [string]$Path
)

#-----------------------------------------------------------
# 1. 文件存在性检查
#-----------------------------------------------------------
if (-not (Test-Path -LiteralPath $Path)) {
    Write-Output "[Error]: 文件不存在 -> $Path" -ForegroundColor Red
    exit 1
}

#-----------------------------------------------------------
# 2. 通过 Shell COM 获取时长
#-----------------------------------------------------------
try {
    $shell  = New-Object -ComObject Shell.Application
    $folder = $shell.Namespace((Get-Item -LiteralPath $Path).DirectoryName)
    $file   = $folder.ParseName((Get-Item -LiteralPath $Path).Name)

    # 27 是“长度”列索引（中文系统通常为 27）
    $duration = $folder.GetDetailsOf($file, 27)

    #-------------------------------------------------------
    # 3. 输出结果
    #-------------------------------------------------------
    if ([string]::IsNullOrWhiteSpace($duration)) {
        # 无时长 → 直接返回空字符串，不报错
        Write-Output ""
    } else {
        Write-Output $duration   # 00:03:45 格式
    }
} catch {
    Write-Output "[Error]: 发生异常 -> $_" -ForegroundColor Red
    exit 1
}