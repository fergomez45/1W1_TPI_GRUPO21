// Función para obtener el parámetro "id" del query string
function obtenerIdDeQueryString() {
    const params = new URLSearchParams(window.location.search);
    return params.get('codigo');
}

// Función para obtener el cliente por ID desde la base de datos (fetch)
async function obtenerClientePorId(id) {
    try {
        const response = await fetch(`https://localhost:7052/api/Cliente/${id}`);
        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        console.log('Datos recibidos del cliente:', data);  // Verifica los datos aquí
        return data;
    } catch (error) {
        console.error('Error al obtener los datos del cliente:', error);
        alert('Ocurrió un error al obtener los datos del cliente.');
    }
}

// Función para cargar los valores del JSON en los inputs del formulario
function cargarDatosEnFormulario(cliente) {
    console.log(cliente);  // Verifica si los datos del cliente se están recibiendo correctamente
    document.getElementById('codigo').value = cliente.idCliente;
    document.getElementById('nombre').value = cliente.nombre;
    document.getElementById('apellido').value = cliente.apellido;
    document.getElementById('input-doc').value = cliente.dni;
    document.getElementById('input-tel').value = cliente.telefono;
    document.getElementById('sexo').value = cliente.sexo;
    document.getElementById('fechaBaja').value = cliente.fechaBaja;
    document.getElementById('motivoBaja').value = cliente.motivoBaja;
}

// Cargar datos al cargar la página
document.addEventListener('DOMContentLoaded', function () {
        const id = obtenerIdDeQueryString();
        if (id) {
        obtenerClientePorId(id).then(cliente => {
            if (cliente) {
                cargarDatosEnFormulario(cliente);
            }
        });
        } else {
        alert('No se ha proporcionado un ID válido en la URL.');
        }
    

    // Configuración del formulario para actualizar los datos
    document.getElementById('clienteForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        // Obtener valores del formulario
        const codigo = parseInt(document.getElementById('codigo').value);
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const dni = document.getElementById('input-doc').value;
        const telefono = document.getElementById('input-tel').value;
        const sexo = document.getElementById('sexo').value;

        // Crear el objeto JSON para el cliente actualizado
        const clienteActualizado = {
            idCliente: codigo,
            nombre: nombre,
            apellido: apellido,
            sexo: sexo,
            dni: dni,
            telefono: telefono
        };

        try {
            const response = await fetch(`https://localhost:7052/api/Cliente/${codigo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clienteActualizado)
            });

            if (response.ok) {
                alert('Cliente actualizado con éxito');
                document.getElementById('clienteForm').reset();
                window.location.href = 'listadoCliente.html';
            } else {
                alert('Hubo un error al actualizar el cliente');
            }
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            alert('Ocurrió un error al intentar actualizar el cliente');
        }
    });
});