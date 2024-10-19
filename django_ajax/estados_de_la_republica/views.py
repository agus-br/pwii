from django.http import HttpResponseBadRequest, JsonResponse
from django.shortcuts import render

from estados_de_la_republica.models import Estado, Municipio

def home(request):
    estados = Estado.objects.all()
    return render(request, 'estados_de_la_republica/home.html', {'estados': estados})


def municipios(request):
    # Verifica si es una solicitud AJAX
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'

    if is_ajax and request.method == 'GET':
        # Obtiene los municipios asociados al estado seleccionado
        estado_id = request.GET.get('estado_id')
        if estado_id:
            municipios = list(Municipio.objects.filter(estado_id=estado_id).values('nombre'))
            return JsonResponse({'municipios': municipios})
        else:
            return JsonResponse({'error': 'No se encontró el estado'}, status=400)
    else:
        return HttpResponseBadRequest('Solicitud no válida')
