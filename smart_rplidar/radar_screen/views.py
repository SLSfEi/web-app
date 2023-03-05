from django.template import loader
from django.http import HttpResponse, JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
import radar_screen.views_code.rplidar as rplidar

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
    return Http404()
