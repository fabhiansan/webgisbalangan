from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers import serialize
from . models import AllBor, RciHauling, Reklamasi
from django.views.generic import CreateView, ListView
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# Create your views here.
def index(request):
    return render(request, 'gomap/gomap.html')

def AllBorView(request):
    allbors = serialize('geojson', AllBor.objects.all())
    return HttpResponse(allbors, content_type='json')

def RcihaulingView(request):
    rci = serialize('geojson', RciHauling.objects.all())
    return HttpResponse(rci, content_type='json')

def ReklamasiView(request):
    WwmReklamasis = serialize('geojson', Reklamasi.objects.all())
    return HttpResponse(WwmReklamasis, content_type='json')

def pojokss(request):
    return render(request, 'index/index.html')


def AllBorList(request):
    search_term = ''
    allbor = AllBor.objects.all()
    page = request.GET.get('page', 1)
    paginator = Paginator(allbor, 50)

    try:
        bors = paginator.page(page)
    except PageNotAnInteger:
        bors = paginator.page(1)
    except EmptyPage:
        bors = paginator.page(paginator.num_pages)

    if 'search' in request.GET:
        search_term = request.GET['search']
        bors = allbor.filter(id_bor__icontains=search_term)

    context = {
        'allbor' : allbor,
        'bors' : bors,
        'search_term' : search_term,
    }

    return render(request, 'gomap/allborlist.html', context=context)

class allborclass(ListView):
    model = AllBor
    context_object_name = 'allbor'
    template_name='gomap/allborclass.html'
    ordering= ['-id_bor']
    paginate_by = 15
