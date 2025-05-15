import ctypes
from ctypes import wintypes
import struct
import os

# 定义Windows API函数
OpenProcess = ctypes.windll.kernel32.OpenProcess
ReadProcessMemory = ctypes.windll.kernel32.ReadProcessMemory
CloseHandle = ctypes.windll.kernel32.CloseHandle

# 定义常量
PROCESS_VM_READ = 0x0010
PROCESS_QUERY_INFORMATION = 0x0400

def get_process_handle(pid):
    """获取目标进程的句柄"""
    process_handle = OpenProcess(PROCESS_VM_READ | PROCESS_QUERY_INFORMATION, False, pid)
    if not process_handle:
        raise Exception("无法打开进程")
    return process_handle

def read_memory(process_handle, address, size):
    """从指定地址读取指定大小的内存"""
    buffer = ctypes.create_string_buffer(size)
    bytes_read = ctypes.c_size_t()
    if not ReadProcessMemory(process_handle, address, buffer, size, ctypes.byref(bytes_read)):
        raise Exception(f"读取内存失败，地址：{hex(address)}")
    return buffer.raw[:bytes_read.value]

def find_swf_in_memory(process_handle, start_address, end_address):
    """在指定内存范围内搜索SWF文件"""
    chunk_size = 0x1000  # 每次读取1KB
    swf_files = []  # 用于存储找到的SWF文件数据
    for address in range(start_address, end_address, chunk_size):
        try:
            memory_chunk = read_memory(process_handle, address, chunk_size)
        except Exception as e:
            print(f"读取内存失败，地址：{hex(address)}，错误：{e}")
            continue

        # 搜索SWF文件的特征码 "FWS" 或 "CWS"
        if b"FWS" in memory_chunk or b"CWS" in memory_chunk:
            # 找到SWF文件的起始位置
            swf_start = memory_chunk.find(b"FWS") if b"FWS" in memory_chunk else memory_chunk.find(b"CWS")
            if swf_start != -1:
                swf_start += address
                # 读取SWF文件的版本号和长度
                swf_header = read_memory(process_handle, swf_start, 8)
                version = swf_header[3]
                file_length = struct.unpack("<I", swf_header[4:8])[0]
                print(f"找到SWF文件，版本号：{version}，长度：{file_length}")

                # 检查文件长度是否超出进程内存范围
                if swf_start + file_length > end_address:
                    print(f"警告：SWF文件长度超出进程内存范围，地址：{hex(swf_start)}，长度：{file_length}")
                    continue

                # 提取整个SWF文件
                try:
                    swf_data = read_memory(process_handle, swf_start, file_length)
                    swf_files.append((swf_start, swf_data))  # 保存SWF文件数据
                except Exception as e:
                    print(f"提取SWF文件失败，地址：{hex(swf_start)}，长度：{file_length}，错误：{e}")
    return swf_files

def extract_swf_from_process(pid, start_address, end_address, output_dir):
    """从指定进程提取SWF文件并保存到指定目录"""
    process_handle = get_process_handle(pid)
    try:
        swf_files = find_swf_in_memory(process_handle, start_address, end_address)
        if swf_files:
            for idx, (start_address, swf_data) in enumerate(swf_files):
                output_file = os.path.join(output_dir, f"extracted_{idx + 1}.swf")
                with open(output_file, "wb") as f:
                    f.write(swf_data)
                print(f"SWF文件已保存到 {output_file}")
        else:
            print("未找到SWF文件")
    finally:
        CloseHandle(process_handle)

if __name__ == "__main__":
    # 示例：从指定进程提取SWF文件
    pid = 28840  # 替换为目标进程的ID
    start_address = 0x10000000  # 替换为起始内存地址
    end_address = 0x20000000  # 替换为结束内存地址
    output_dir = "./output"  # 输出目录
    os.makedirs(output_dir, exist_ok=True)  # 确保输出目录存在
    extract_swf_from_process(pid, start_address, end_address, output_dir)