# Web Application
The purpose of this web-app is to facilitate explosive installation processes in the mining industry.
It works by receiving scan data from [SLSfEi/scan-provider-cpp](https://github.com/SLSfEi/scan-provider-cpp) and displaying it to the operator while providing markers management overlay.
## Components
### backend
The backend have the following API endpoints.
Endpoint | Request Type | Description
--- | --- | ---
/api/v1/scan | POST | For receiving scan data
/api/v1/driver | POST | For driver management
### frontend
The front have the following pages.
URL | Description
--- | ---
/ | Home page and markers configurations
/radar | Actual radar screen with markers and driver controls
## Configurations
The configuration file must be named `.env` and be located in the same directory as the `settings.py` script.

**Note:** These variables can also be set as environment variables. In that case configuration file is not needed.
Variable | Type | Description
--- | --- | ---
DEBUG | boolean | Enable django debug mode
SECRET_KEY | string | Django secret key
DRIVER_EXECUTABLE | string | Path to driver or scan provider executable
# RPLidar Spoofer
Included in this repository inside `utility` directory is a python script that mimics [SLSfEi/scan-provider-cpp](https://github.com/SLSfEi/scan-provider-cpp) HTTP POST requests for ease of testing.

`rplidar_spoofer.py` accepts the following command line arguments
- `--once` or `-o` will only send the spoofing request once. If not specified, the spoofing request will be sent repeatedly and indefinitely with `0.3` second delay.
- `--sample` or `s` will use the included sample data `scan_sample.csv`. If not specified, data used will be randomly generated.