import subprocess
from pathlib import Path
from django.conf import settings

driver_executable = settings.DRIVER_EXECUTABLE
driver_cwd = Path(driver_executable).parent
driver_process = None

def is_driver_alive():
    global driver_process
    if(driver_process is not None and driver_process.poll() is None):
        return True
    return False

def terminate_driver():
    global driver_process
    if(is_driver_alive()):
        print("terminating driver")
        driver_process.terminate()

def restart_driver():
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
    