document.addEventListener('DOMContentLoaded', () => {
    const API_URL_MASCOTAS = 'https://localhost:7052/api/Mascota';
    const API_URL_ESPECIES = 'https://localhost:7052/api/Especie';
    const API_URL_CLIENTES = 'https://localhost:7052/api/Cliente';

    // Función para obtener las mascotas
    async function fetchMascotas() {
        try {
            const [mascotasResponse, especiesResponse, clientesResponse] = await Promise.all([
                fetch(API_URL_MASCOTAS),
                fetch(API_URL_ESPECIES),
                fetch(API_URL_CLIENTES)
            ]);
            const mascotas = await mascotasResponse.json();
            const especies = await especiesResponse.json();
            const clientes = await clientesResponse.json();
            /*const response = await fetch(API_URL);
            const mascotas = await response.json();*/

            //Crear mapas para especies y clientes
            const especiesMap = {};
            especies.forEach(especie =>{
                especiesMap[especie.idEspecie] = especie.nombreEspecie;
            });
            const clientesMap = {};
            clientes.forEach(cliente => {
                clientesMap[cliente.idCliente] = cliente.nombre +", "+cliente.apellido+" || "+cliente.dni;
            });
            
            // Cargar las mascotas en la tabla con nombres en lugar de IDs
            cargarMascotas(mascotas,especiesMap,clientesMap);
        } catch (error) {
            console.error('Error al obtener las mascotas:', error);
        }
    }

    // Función para cargar la lista de mascotas en la tabla
    function cargarMascotas(mascotas, especiesMap, clientesMap) {
        const tbody = document.getElementById('componentes-body');
        tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

        mascotas.forEach(mascota => {
            const row = document.createElement('tr');

            // Columna Código
            const codTd = document.createElement('td');
            codTd.textContent = mascota.idMascota;
            row.appendChild(codTd);

            // Columna Nombre
            const nombreTd = document.createElement('td');
            nombreTd.textContent = mascota.nombre;
            row.appendChild(nombreTd);

            // Columna Especie (mostrar nombre en lugar de ID)
            const especieTd = document.createElement('td');
            especieTd.textContent = especiesMap[mascota.idEspecie] || "Desconocida";
            row.appendChild(especieTd);

            //Columna Sexo
            const sexoTd = document.createElement('td');
            sexoTd.textContent = mascota.sexo;
            row.appendChild(sexoTd);

            //Columna Año
            const anioTd = document.createElement('td');
            anioTd.textContent = mascota.anionacimiento;
            row.appendChild(anioTd);

            //Columna Cliente (mostrar nombre en lugar de ID)
            const clienteTd = document.createElement('td');
            clienteTd.textContent = clientesMap[mascota.idCliente] || "Desconocida";
            row.appendChild(clienteTd);

            //Columna FechaBaja
            const fecTd = document.createElement('td');
            fecTd.textContent = mascota.fechaBaja;
            row.appendChild(fecTd);

            //Columna Motivo
            const motivoTd = document.createElement('td');
            motivoTd.textContent = mascota.motivoBaja;
            row.appendChild(motivoTd);
        
            // Columna Acciones (Detalle y Eliminar)
            const accionesTd = document.createElement('td');

            // Botón Detalle 
            const detalleBtn = document.createElement('button');
            detalleBtn.classList.add('btn', 'btn-info', 'btn-sm');
            detalleBtn.textContent = 'Detalle';
            detalleBtn.addEventListener('click', () => {
                window.location.href = `detalleMascota.html?codigo=${mascota.idMascota}`;
            });

            // Botón Eliminar
            const eliminarBtn = document.createElement('button');
            eliminarBtn.classList.add('btn', 'btn-danger', 'btn-sm');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro que deseas dar de baja esta mascota?')) {
            // Preguntar el motivo de baja
            let motivoBaja = prompt('Por favor, ingresa el motivo de baja (máximo 25 caracteres):');
            if (motivoBaja && motivoBaja.trim() !== '' && motivoBaja.length <= 25) {
            darDeBajaMascota(mascota.idMascota, motivoBaja);
            } else if (motivoBaja && motivoBaja.length > 25) {
            alert('El motivo de baja no debe exceder los 25 caracteres.');
            } else {
            alert('Debes ingresar un motivo de baja válido.');
            }
    }
});

            accionesTd.appendChild(detalleBtn);
            if (!mascota.fechaBaja) { // Mostrar el botón de eliminar si la mascota no está dada de baja
                accionesTd.appendChild(eliminarBtn);
            }

            row.appendChild(accionesTd);

            // Agregar la fila a la tabla
            tbody.appendChild(row);
        });
    }

    // Función para dar de baja una mascota
    async function darDeBajaMascota(id, motivoBaja) {
        try {
            const response = await fetch(`${API_URL_MASCOTAS}/${id}?motivoBaja=${encodeURIComponent(motivoBaja)}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Mascota dada de baja con éxito');
                fetchMascotas(); // Recargar mascotas después de dar de baja
            } else {
                alert('Error al dar de baja la mascota');
            }
        } catch (error) {
            console.error('Error al dar de baja mascota:', error);
            alert('Ocurrió un error al intentar dar de baja la mascota');
        }
    }

    // Llamar a la función para cargar los clientes cuando la página cargue
    fetchMascotas();
});