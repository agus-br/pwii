document.getElementById('estado-selector').addEventListener('change', function() {
    var estadoId = this.value;
    const municipiosList = document.getElementById('municipios-list');
    municipiosList.innerHTML = '<li>Cargando municipios...</li>'; // Placeholder mientras se carga la respuesta

    // Verifica si hay un estado seleccionado
    if (estadoId) {
        fetch(`/municipios/?estado_id=${estadoId}`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            municipiosList.innerHTML = ''; // Limpia la lista de municipios
            if (data.municipios.length > 0) {
                data.municipios.forEach(municipio => {
                    const li = document.createElement('li');
                    li.classList.add('municipio-item');
                    li.textContent = municipio.nombre;
                    municipiosList.appendChild(li);
                });
            } else {
                municipiosList.innerHTML = '<li>No se encontraron municipios para este estado</li>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            municipiosList.innerHTML = '<li>Error al cargar los municipios</li>';
        });
    } else {
        municipiosList.innerHTML = '';
    }
});