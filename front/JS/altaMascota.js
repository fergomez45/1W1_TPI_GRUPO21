// Función para cargar las especies al combo box
async function loadEspecies() {
    try {
        const response = await fetch('https://localhost:7052/api/Especie');
        const especies = await response.json();

        const comboBox = document.getElementById('especieComboBox');
        especies.forEach(especie => {
            const option = document.createElement('option');
            option.value = especie.idEspecie;
            option.text = especie.nombreEspecie;
            comboBox.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las especies:', error);
    }
}
// Función para cargar los clientes al combo box
async function loadClientes() {
    try {
        const response = await fetch('https://localhost:7052/api/Cliente');
        const clientes = await response.json();

        const comboBox = document.getElementById('clienteComboBox');
        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.idCliente;
            option.text = cliente.nombre +", "+ cliente.apellido +" | DNI: "+ cliente.dni;
            comboBox.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los clientes', error);
    }
}

// Llama a la función para cargar el combo box al iniciar la página
window.onload = loadClientes(), loadEspecies();

document.addEventListener('DOMContentLoaded', () => {
        const API_URL = 'https://localhost:7052/api/Mascota'; // Reemplaza con la URL real de tu API
    
        // Obtener los elementos del formulario
        const form = document.getElementById('form-mascota');
        const inputNombre = document.getElementById('input-nombre-mascota');
        const comboEspecie = document.getElementById('especieComboBox');
        const inputSexo = document.getElementById('input-sexo');
        const inputAnio = document.getElementById('input-anio-nac');
        const comboCliente = document.getElementById('clienteComboBox');
    
        // Agregar un listener al formulario
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevenir que el formulario se envíe de manera tradicional
            console.log('Formulario enviado'); // Para depuración
    
            const nombre = inputNombre.value;
            const especie = comboEspecie.value;
            const sexo = inputSexo.value;
            const anio = inputAnio.value;
            const cliente = comboCliente.value;
    
            // Cuerpo de la solicitud (datos que se enviarán a la API)
            const body = {
                nombre: nombre,
                idEspecie: especie,
                sexo: sexo,
                anionacimiento: anio,
                idCliente: cliente
            };
            if(anio >= 1990 && anio <= 2024){
                try {
                    const response = await fetch(`${API_URL}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    });
        
                    if (response.ok) {
                        alert('Mascota registrada con éxito');
                        form.reset(); // Limpiar el formulario después de enviar
                    } else {
                        alert('Error al registrar la mascota');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Ocurrió un error al intentar registrar la mascota');
                }
            }else{
                alert('Debe ingresar año entre 1990 y 2024');
            }
            
        });
    });

