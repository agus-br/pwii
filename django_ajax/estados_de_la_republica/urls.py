from django.urls import path
from . import views  # Importa las vistas desde el mismo directorio

urlpatterns = [
    path('', views.home, name='home'),  # Ruta para la página principal
    path('municipios/', views.municipios, name='municipios'),  # Ruta para manejar las solicitudes AJAX de municipios
]