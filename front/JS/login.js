async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Oculta el mensaje de error antes de verificar las credenciales
    errorMessage.style.display = "none"; 

    // Verifica que los campos no estén vacíos
    if (username !== '' && password !== '') {
        try {
            const response = await fetch(`https://localhost:7052/api/Usuario?nombre=${encodeURIComponent(username)}&contra=${encodeURIComponent(password)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                // Si la respuesta es exitosa, redirige a la página de inicio
                window.location.href = "home.html"; // Redirige a la página principal
            } else {
                // Si la respuesta no es exitosa, muestra un mensaje de error
                const errorText = await response.text();
                errorMessage.textContent = "Usuario o contraseña incorrectos";
                errorMessage.style.display = "block";
            }
        } catch (error) {
            errorMessage.textContent = "Error de conexión con el servidor: " + error.message;
            errorMessage.style.display = "block"; // Muestra el mensaje de error
        }
    } else {
        // Muestra el mensaje de error si los campos están vacíos
        errorMessage.textContent = "Usuario o contraseña incorrectos";
        errorMessage.style.display = "block";
    }
}

function enviarAForm() {
    window.location.href = "registrar.html";
}

