document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://localhost:7052/api/Cliente';

    // Función para obtener los clientes
    async function fetchClientes() {
        try {
            const response = await fetch(API_URL);
            const clientes = await response.json();
            cargarClientes(clientes);
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
        }
    }

    // Función para cargar la lista de clientes en la tabla
    function cargarClientes(clientes) {
        const tbody = document.getElementById('componentes-body');
        tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

        clientes.forEach(cliente => {
            const row = document.createElement('tr');

            // Columna Código
            const codTd = document.createElement('td');
            codTd.textContent = cliente.idCliente;
            row.appendChild(codTd);

            // Columna Nombre
            const nombreTd = document.createElement('td');
            nombreTd.textContent = cliente.nombre;
            row.appendChild(nombreTd);

            // Columna Apellido
            const apellidoTd = document.createElement('td');
            apellidoTd.textContent = cliente.apellido;
            row.appendChild(apellidoTd);

            //Columna Sexo
            const sexoTd = document.createElement('td');
            sexoTd.textContent = cliente.sexo;
            row.appendChild(sexoTd);

            //Columna DNI
            const dniTd = document.createElement('td');
            dniTd.textContent = cliente.dni;
            row.appendChild(dniTd);

            //Columna Sexo
            const telTd = document.createElement('td');
            telTd.textContent = cliente.telefono;
            row.appendChild(telTd);

            //Columna FechaBaja
            const fecTd = document.createElement('td');
            fecTd.textContent = cliente.fechaBaja;
            row.appendChild(fecTd);

            //Columna Motivo
            const motivoTd = document.createElement('td');
            motivoTd.textContent = cliente.motivoBaja;
            row.appendChild(motivoTd);
        
            // Columna Acciones (Detalle y Eliminar)
            const accionesTd = document.createElement('td');

            // Botón Detalle 
            const detalleBtn = document.createElement('button');
            detalleBtn.classList.add('btn', 'btn-info', 'btn-sm');
            detalleBtn.textContent = 'Detalle';
            detalleBtn.addEventListener('click', () => {
                window.location.href = `detalleCliente.html?codigo=${cliente.idCliente}`;
            });

            // Botón Eliminar
            const eliminarBtn = document.createElement('button');
            eliminarBtn.classList.add('btn', 'btn-danger', 'btn-sm');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.addEventListener('click', () => {
                if (confirm('¿Estás seguro que deseas dar de baja este cliente?')) {
                    // Preguntar el motivo de baja
                    const motivoBaja = prompt('Por favor, ingresa el motivo de baja:');

                    // Si el motivo de baja no es vacío o nulo
                    if (motivoBaja && motivoBaja.trim() !== '' && motivoBaja.length <= 25) {
                        darDeBajaCliente(cliente.idCliente, motivoBaja);
                    }else if(motivoBaja && motivoBaja.length > 25)
                    {
                        alert('El motivo de baja no debe exceder los 25 caracteres.');
                    } 
                    else {
                        alert('Debes ingresar un motivo de baja válido.');
                    }
                }
            });

            accionesTd.appendChild(detalleBtn);
            if (!cliente.fechaBaja) { // Mostrar el botón de eliminar si el cliente no está dado de baja
                accionesTd.appendChild(eliminarBtn);
            }

            row.appendChild(accionesTd);

            // Agregar la fila a la tabla
            tbody.appendChild(row);
        });
    }

    // Función para dar de baja un cliente
    async function darDeBajaCliente(id, motivoBaja) {
        try {
            const response = await fetch(`${API_URL}/${id}?motivoBaja=${encodeURIComponent(motivoBaja)}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Cliente dado de baja con éxito');
                fetchClientes(); // Recargar los clientes después de dar de baja
            } else {
                alert('Error al dar de baja el cliente');
            }
        } catch (error) {
            console.error('Error al dar de baja cliente:', error);
            alert('Ocurrió un error al intentar dar de baja el cliente');
        }
    }

    // Llamar a la función para cargar los clientes cuando la página cargue
    fetchClientes();
});