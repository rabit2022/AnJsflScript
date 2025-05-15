import ctypes
from ctypes import wintypes
import os

# 定义Windows API函数
OpenProcess = ctypes.windll.kernel32.OpenProcess
ReadProcessMemory = ctypes.windll.kernel32.ReadProcessMemory
CloseHandle = ctypes.windll.kernel32.CloseHandle
VirtualQueryEx = ctypes.windll.kernel32.VirtualQueryEx

# 定义常量
PROCESS_VM_READ = 0x0010
PROCESS_QUERY_INFORMATION = 0x0400

# 定义MEMORY_BASIC_INFORMATION结构
class MEMORY_BASIC_INFORMATION(ctypes.Structure):
    _fields_ = [
        ("BaseAddress", wintypes.LPVOID),
        ("AllocationBase", wintypes.LPVOID),
        ("AllocationProtect", wintypes.DWORD),
        ("RegionSize", wintypes.SIZE),
        ("State", wintypes.DWORD),
        ("Protect", wintypes.DWORD),
        ("Type", wintypes.DWORD),
    ]

def get_process_handle(pid):
    """获取目标进程的句柄"""
    process_handle = OpenProcess(PROCESS_VM_READ | PROCESS_QUERY_INFORMATION, False, pid)
    if not process_handle:
        raise Exception(f"无法打开进程，PID: {pid}")
    return process_handle

def get_readable_memory_regions(process_handle):
    """获取目标进程的所有可读内存区域"""
    regions = []
    address = 0
    mbi = MEMORY_BASIC_INFORMATION()
    while True:
        result = VirtualQueryEx(process_handle, address, ctypes.byref(mbi), ctypes.sizeof(mbi))
        if result == 0:
            break
        if mbi.State == 0x1000 and (mbi.Protect & 0x2):  # MEM_COMMIT and PAGE_READONLY or PAGE_EXECUTE_READ
            regions.append((mbi.BaseAddress, mbi.BaseAddress + mbi.RegionSize))
        address += mbi.RegionSize
    return regions

def print_memory_regions(pid):
    """打印目标进程的所有可读内存区域"""
    try:
        process_handle = get_process_handle(pid)
        regions = get_readable_memory_regions(process_handle)

        print(len(regions))
        print(f"进程ID: {pid} 的可读内存区域:")
        for start, end in regions:
            print(f"起始地址: {hex(start)}，结束地址: {hex(end)}")
    finally:
        CloseHandle(process_handle)

if __name__ == "__main__":
    # 示例：打印指定进程的可读内存区域
    pid = 28840  # 替换为目标进程的ID
    print_memory_regions(pid)