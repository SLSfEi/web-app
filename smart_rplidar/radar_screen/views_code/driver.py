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
    return driver_executable.is_file()

def is_driver_alive():
    global driver_process
    try:
        if(driver_process is not None and driver_process.poll() is None):
            return True
    except Exception as e:
        print("error while checking driver state", e)
    return False

def terminate_driver():
    if(not is_driver_exist()):
        return

    global driver_process
    if(driver_process is not None):
        if sys.platform.startswith("win"):
            try:
                driver_process.send_signal(signal.SIGTERM)
                driver_process = None
            except Exception as e:
                print("error while terminating driver", e)
        else:
            try:
                os.killpg(os.getpgid(driver_process.pid), signal.SIGTERM)
                #driver_process = None
            except Exception as e:
                print("error while terminating driver", e)

def restart_driver():
    if(not is_driver_exist()):
        return

    global driver_process
    terminate_driver()

    if sys.platform.startswith("win"):
        driver_process = subprocess.Popen(driver_executable,
                                            cwd=driver_cwd,
                                            stdin=subprocess.PIPE,
                                            stdout=subprocess.PIPE,
                                            stderr=subprocess.PIPE)
    else:
        driver_process = subprocess.Popen(driver_executable,
                                            cwd=driver_cwd,
                                            stdin=subprocess.PIPE,
                                            stdout=subprocess.PIPE,
                                            stderr=subprocess.PIPE,
                                            preexec_fn=os.setsid)

    print("creating new process", driver_process)
restart_driver()

# terminate driver before server exiting
import atexit
atexit.register(lambda *x : terminate_driver())
    