// Función para obtener el parámetro "id" del query string
function obtenerIdDeQueryString() {
    const params = new URLSearchParams(window.location.search);
    return params.get('codigo');
}

// Función para obtener la mascota por ID desde la base de datos
async function obtenerMascotaPorId(id) {
    try {
        const response = await fetch(`https://localhost:7052/api/Mascota/${id}`);
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        console.log('Datos de la mascota obtenidos:', data); // Verificación de datos
        return data;
    } catch (error) {
        console.error('Error al obtener los datos de la mascota:', error);
        alert('Ocurrió un error al obtener los datos de la mascota.');
    }
}

// Función para obtener las especies desde la base de datos
async function obtenerEspecies() {
    try {
        const response = await fetch('https://localhost:7052/api/Especie');
        if (!response.ok) {
            throw new Error('Error al obtener las especies');
        }
        const especies = await response.json();
        console.log('Especies obtenidas:', especies); // Verificación de datos
        return especies;
    } catch (error) {
        console.error('Error al obtener las especies:', error);
        return [];
    }
}

// Función para obtener los clientes desde la base de datos
async function obtenerClientes() {
    try {
        const response = await fetch('https://localhost:7052/api/Cliente');
        if (!response.ok) {
            throw new Error('Error al obtener los clientes');
        }
        const clientes = await response.json();
        console.log('Clientes obtenidos:', clientes); // Verificación de datos
        return clientes;
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        return [];
    }
}

// Función para cargar los valores del JSON en los inputs del formulario
function cargarDatosEnFormulario(mascota) {
    document.getElementById('codigo').value = mascota.idMascota;
    document.getElementById('nombre').value = mascota.nombre;
    document.getElementById('especieComboBox').value = mascota.idEspecie;
    document.getElementById('sexo').value = mascota.sexo;
    document.getElementById('anio').value = mascota.anionacimiento;
    document.getElementById('clienteComboBox').value = mascota.idCliente;
    document.getElementById('fechaBaja').value = mascota.fechaBaja;
    document.getElementById('motivoBaja').value = mascota.motivoBaja;
}

// Función para cargar las opciones en los combos y setear los valores seleccionados
async function cargarCombos(mascota) {
    const especies = await obtenerEspecies();
    const clientes = await obtenerClientes();

    const especieComboBox = document.getElementById('especieComboBox');
    const clienteComboBox = document.getElementById('clienteComboBox');

    // Verificar si los combos existen en el DOM
    if (!especieComboBox || !clienteComboBox) {
        console.error('No se encontraron los elementos especieComboBox o clienteComboBox en el DOM');
        return;
    }

    // Llenar combo de especies
    especies.forEach(especie => {
        const option = document.createElement('option');
        option.value = especie.idEspecie;
        option.textContent = especie.nombreEspecie;
        if (especie.idEspecie === mascota.idEspecie) {
            option.selected = true;
        }
        especieComboBox.appendChild(option);
    });

    // Llenar combo de clientes
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.idCliente;
        option.textContent = cliente.nombre+", "+cliente.apellido+" | DNI: "+cliente.dni;
        if (cliente.idCliente === mascota.idCliente) {
            option.selected = true;
        }
        clienteComboBox.appendChild(option);
    });
}

// Cargar datos al cargar la página
document.addEventListener('DOMContentLoaded', async function () {
    const id = obtenerIdDeQueryString();
    if (id) {
        const mascota = await obtenerMascotaPorId(id);
        if (mascota) {
            cargarDatosEnFormulario(mascota);
            await cargarCombos(mascota); // Asegurarse de que los combos se cargan después de obtener la mascota
        }
    } else {
        alert('No se ha proporcionado un ID válido en la URL.');
    }

    // Configuración del formulario para actualizar los datos
    document.getElementById('mascotaForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        // Obtener valores del formulario
        const codigo = parseInt(document.getElementById('codigo').value);
        const nombre = document.getElementById('nombre').value;
        const especie = document.getElementById('especieComboBox').value;
        const sexo = document.getElementById('sexo').value;
        const anioNac = document.getElementById('anio').value;
        const cliente = document.getElementById('clienteComboBox').value;

        // Crear el objeto JSON para la mascota actualizada
        const mascotaActualizada = {
            idMascota: codigo,
            nombre: nombre,
            idEspecie: especie,
            sexo: sexo,
            anionacimiento: anioNac,
            idCliente: cliente
        };

        try {
            const response = await fetch(`https://localhost:7052/api/Mascota/${codigo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mascotaActualizada)
            });

            if (response.ok) {
                alert('Mascota actualizada con éxito');
                window.location.href = 'listadoMascota.html';
            } else {
                alert('Hubo un error al actualizar la mascota');
            }
        } catch (error) {
            console.error('Error al actualizar la mascota:', error);
            alert('Ocurrió un error al intentar actualizar la mascota');
        }
    });
});



