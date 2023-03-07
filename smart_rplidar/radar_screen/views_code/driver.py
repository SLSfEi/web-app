import asyncio

from radar_screen.views_code.broadcast import broadcast_ticks

is_driver_running = False
driver_executable = "D:\\rplidar\\cmake_scan_provider\\scan_provider\\scan_provider.exe"

def restart_driver():
    global is_driver_running
    is_driver_running = not is_driver_running
    broadcast_ticks([{"driver_status": is_driver_running}])
    print("reset driver plz")