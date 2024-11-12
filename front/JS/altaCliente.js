document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://localhost:7052/api/Cliente'; // Reemplaza con la URL real de tu API

    // Obtener los elementos del formulario
    const form = document.getElementById('form-cliente');
    const inputNombre = document.getElementById('input-nombre');
    const inputApellido = document.getElementById('input-apellido');
    const inputSexo = document.getElementById('input-sexo');
    const inputDni = document.getElementById('input-doc');
    const inputTel = document.getElementById('input-tel');

    // Agregar un listener al formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir que el formulario se envíe de manera tradicional
        console.log('Formulario enviado'); // Para depuración

        const nombre = inputNombre.value;
        const apellido = inputApellido.value;
        const sexo = inputSexo.value;
        const dni = inputDni.value;
        const tel = inputTel.value;

        // Cuerpo de la solicitud (datos que se enviarán a la API)
        const body = {
            nombre: nombre,
            apellido: apellido,
            sexo: sexo,
            dni: dni,
            telefono: tel
        };

        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                alert('Cliente registrado con éxito');
                form.reset(); // Limpiar el formulario después de enviar
            } else {
                alert('Error al registrar el cliente');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al intentar registrar el cliente');
        }
    });
});