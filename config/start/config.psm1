# 定义变量
$AnExePath = "D:\01_software\05_pictures\02_ps\Adobe Animate 2024\Animate.exe"
$ProjectFileDir = "F:\04_ps\沙雕动画\_素材库\WindowSWF-master\WindowSWF-master\AnJsflScript"

$TestFilePath = Join-Path -Path $ProjectFileDir -ChildPath "\test\flash\test.fla"
$FirstRun = Join-Path -Path $ProjectFileDir -ChildPath ".\FirstRun.jsfl"
$ReRun = Join-Path -Path $ProjectFileDir -ChildPath ".\config\require\ReRun.jsfl"

$AlertMessage = "暂时只能通过配置外部工具实现,无法通过ps1脚本完成。 "


# 定义打印函数
function Write-Message {
    param (
        [string]$Message
    )
    Write-Output $Message
}


# 导出变量
Export-ModuleMember -Variable AnExePath, TestFilePath, FirstRun, ReRun, AlertMessage -Function Write-Message