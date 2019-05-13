from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index/index.html')

def mapviews(request):
    return render(request, 'index/mapviews.html')

def jquery(request):
    return render(request, 'index/learnjq.html')

def api(request):
    return render(request, 'index/map.html')

def dmsconverter(request):
    return render(request, 'index/dmsconverter.html')

def degreeconverter(request):
    return render(request, 'index/degreeconverter.html')