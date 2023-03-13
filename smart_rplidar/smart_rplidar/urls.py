"""smart_rplidar URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.conf import settings
from fileserveview.views import FileServeView
from radar_screen import views as rs_views

urlpatterns = [
    path("", rs_views.home),
    path("favicon.ico", FileServeView.as_view(
        authenticated_user_only=False,
        file=settings.STATIC_ROOT / "icon" / "favicon.ico",
        is_download=False
    )),
    path("radar", rs_views.radar),
    path("api/v1/scan", rs_views.scan),
    path("api/v1/driver", rs_views.driver)
]
