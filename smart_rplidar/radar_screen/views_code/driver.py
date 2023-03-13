import subprocess
from pathlib import Path
from django.conf import settings

driver_executable = Path(settings.DRIVER_EXECUTABLE)
driver_cwd = driver_executable.parent
driver_process = None

def is_driver_exist():
    print("driver exists")
    return driver_executable.is_file()

def is_driver_alive():
    global driver_process
    print("state", driver_process, driver_process.poll())
    if(driver_process is not None and driver_process.poll() is None):
        return True
    return False

def terminate_driver():
    print("attempting to terminate")
    if(not is_driver_exist()):
        return

    global driver_process
    if(is_driver_alive()):
        print("terminating driver")
        driver_process.terminate()

def restart_driver():
    if(not is_driver_exist()):
        return

    global driver_process
    terminate_driver()
    
    driver_process = subprocess.Popen(driver_executable,
                                        cwd=driver_cwd,
                                        stdin=subprocess.PIPE,
                                        stdout=subprocess.PIPE,
                                        stderr=subprocess.PIPE)
    print("creating new process", driver_process)
restart_driver()

# terminate driver before server exiting
import atexit
atexit.register(lambda *x : terminate_driver())
    