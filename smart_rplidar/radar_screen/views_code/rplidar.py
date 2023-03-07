from django.http import JsonResponse
import csv
import random
from radar_screen.views_code.broadcast import broadcast_ticks

def parse_csv_to_list(csv_str):
    reader = csv.DictReader(csv_str.split("\n"))

    # Convert string values to their appropriate type
    result = []
    for line in list(reader):
        line_converted = {}
        for k,v in line.items():
            if k == "start_flag":
                line_converted[k] = bool(v)
            else:
                line_converted[k] = float(v)
        result.append(line_converted)
    return result

max_radar_points = 1000
def update_scan(req):
    if(req.content_type == "text/csv"):
        decoded_str = req.body.decode("utf-8")
        try:
            data = parse_csv_to_list(decoded_str)
            if len(data) == 0:
                raise ValueError("cannot parse scan data")
            if len(data) > max_radar_points:
                data = random.sample(data, max_radar_points)
            # Broadcast to clients via WEBSOCKET
            broadcast_ticks([{"scan_data": data}])
            return JsonResponse({"status":"OK"})
        except:
            return JsonResponse({"status": "error", "description": "cannot parse data"})
        
        
    return JsonResponse({"status": "error", "description": 'must be "text/csv"'})