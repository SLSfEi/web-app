from django.template import loader
from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
import radar_screen.views_code.rplidar as rplidar
import radar_screen.views_code.driver as driver_ctrl

import json

from smart_rplidar.settings import BASE_DIR

TEMPLATE_DIR =  BASE_DIR / "radar_screen" / "templates"

def home(req):
    #Basic template render
    template = loader.get_template(TEMPLATE_DIR / "home.html")
    context = {}
    return HttpResponse(template.render(context, req))

def radar(req):
    context = {}
    template = loader.get_template(TEMPLATE_DIR / "radar.html")
    return HttpResponse(template.render(context, req))

@csrf_exempt
def scan(req):
    #rplidar endpoints
    if req.method == "POST":
        return rplidar.update_scan(req)
    return JsonResponse({"status": "error", "description": "this endpoint supports POST only"})

@csrf_exempt
def driver(req):
    #driver endpoints
    if req.method == "POST":
        if(req.content_type != "application/json"):
            return JsonResponse({"status": "error", "description": 'must be "application/json"'})
        try:
            decoded_str = req.body.decode("utf-8")
            data = json.loads(decoded_str)
            command = data["command"]
            if(command == "restart"):
                driver_ctrl.restart_driver()
            else:
                raise ValueError("unknown driver command")
        except Exception as e:
            print(e)
            return JsonResponse({"status": "error", "description": "cannot parse data"})
        return JsonResponse({"status": "OK"})
    return JsonResponse({"status": "error", "description": "this endpoint supports POST only"})
