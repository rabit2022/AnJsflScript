# �������
$AnExePath = "D:\01_software\05_pictures\02_ps\Adobe Animate 2024\Animate.exe"
$ProjectFileDir = "F:\04_ps\ɳ�񶯻�\_�زĿ�\WindowSWF-master\WindowSWF-master\AnJsflScript"

$TestFilePath = Join-Path -Path $ProjectFileDir -ChildPath "\test\flash\test.fla"
$FirstRun = Join-Path -Path $ProjectFileDir -ChildPath ".\FirstRun.jsfl"
$ReRun = Join-Path -Path $ProjectFileDir -ChildPath ".\config\require\ReRun.jsfl"

$AlertMessage = "��ʱֻ��ͨ�������ⲿ����ʵ��,�޷�ͨ��ps1�ű���ɡ� "


# �����ӡ����
function Write-Message {
    param (
        [string]$Message
    )
    Write-Output $Message
}


# ��������
Export-ModuleMember -Variable AnExePath, TestFilePath, FirstRun, ReRun, AlertMessage -Function Write-Message