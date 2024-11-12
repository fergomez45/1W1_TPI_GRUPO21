async function registrar() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const errorMessage = document.getElementById('error-message');

    // Oculta el mensaje de error antes de verificar las credenciales
    errorMessage.style.display = "none"; 

    // Verifica que las contraseñas coincidan
    if(username !== '' || password !== '' || password2 !== ''){
        if (password === password2) {
            // Crea el objeto usuario para enviar en el cuerpo de la solicitud
            const usuario = {
                nombre: username,
                contraseña: password
            };
    
            try {
                const response = await fetch('https://localhost:7052/api/Usuario', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(usuario)
                });
    
                if (response.ok) {
                    alert("Usuario registrado con éxito");
                    window.location.href = "index.html"; // Redirige al formulario de inicio de sesión
                } else {
                    const errorText = await response.text();
                    errorMessage.textContent = "Error en el registro: " + errorText;
                    errorMessage.style.display = "block"; // Muestra el mensaje de error
                }
            } catch (error) {
                errorMessage.textContent = "Error de conexión con el servidor: " + error.message;
                errorMessage.style.display = "block"; // Muestra el mensaje de error
            }
        } else {
            // Muestra el mensaje de error si las contraseñas no coinciden
            errorMessage.textContent = "Las contraseñas no coinciden";
            errorMessage.style.display = "block"; // Muestra el mensaje de error
        }
    }else{
            errorMessage.textContent = "Debe ingresar los campos";
            errorMessage.style.display = "block"; // Muestra el mensaje de error
    }
    

}
