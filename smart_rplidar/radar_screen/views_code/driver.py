import subprocess
import os
import sys
import signal
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
    print("state", driver_process)
    try:
        if(driver_process is not None and driver_process.poll() is None):
            return True
    except Exception as e:
        print("error while checking driver state", e)
    return False

def terminate_driver():
    print("======================attempting to terminate")
    if(not is_driver_exist()):
        return

    global driver_process
    if(driver_process is not None):
        print("======================terminating driver")
        if sys.platform.startswith("win"):
            print("==================== windows")
            try:
                driver_process.send_signal(signal.SIGTERM)
                driver_process = None
            except Exception as e:
                print("error while terminating driver", e)
        else:
            print("==================== else")
            try:
                print("==============killing", driver_process.pid)
                os.setpgrp()
                try:
                    os.killpg(0, signal.SIGINT)
                except KeyboardInterrupt:
                    pass
                driver_process = None
            except Exception as e:
                print("error while terminating driver", e)

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
#restart_driver()

# terminate driver before server exiting
import atexit
atexit.register(lambda *x : terminate_driver())
    