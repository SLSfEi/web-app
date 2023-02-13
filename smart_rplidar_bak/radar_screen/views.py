from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
import radar_screen.views_code.rplidar as rplidar
from .models import ScanIteration

from smart_rplidar.settings import BASE_DIR

TEMPLATE_DIR =  BASE_DIR / "radar_screen" / "templates"

def home(req):
    #Basic template render
    template = loader.get_template(TEMPLATE_DIR / "home.html")
    context = {}
    return HttpResponse(template.render(context, req))

def radar(req):
    #[TODO: Research on how to make ws tick work or something]
    scan_iter = ScanIteration.objects.filter(id=0).first()
    if scan_iter is None:
        context = {
            "scan_timestamp": "NODATA",
            "scan_csv": "NODATA"
        }
    else:
        scan_timestamp = scan_iter.timestamp
        scan_csv = scan_iter.csv_string
        context = {
            "scan_timestamp": scan_timestamp,
            "scan_csv": scan_csv
        }

    template = loader.get_template(TEMPLATE_DIR / "radar.html")
    return HttpResponse(template.render(context, req))

@csrf_exempt
def scan(req):
    #rplidar endpoints
    if req.method == "POST":
        return rplidar.update_scan(req)
    elif req.method == "GET":
        return rplidar.get_scan(req)
    else:
        return Http404()
