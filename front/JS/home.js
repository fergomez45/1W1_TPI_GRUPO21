document.getElementById('toggle-btn').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    const submenus = document.querySelectorAll('.submenu'); // Obtiene todos los submenús

    // Alternar la clase 'collapsed' para la sidebar
    sidebar.classList.toggle('collapsed');

    // Cerrar todos los submenús cuando se colapsa la sidebar
    if (sidebar.classList.contains('collapsed')) {
        submenus.forEach(submenu => {
            submenu.style.display = 'none'; // Ocultar submenús cuando la sidebar está colapsada
        });
    } else {
        // Mostrar los submenús nuevamente cuando la sidebar está expandida
        submenus.forEach(submenu => {
            submenu.style.display = 'block';
        });
    }
});

function toggleSubmenu(event, submenuId) {
    event.preventDefault();
    const submenu = document.getElementById(submenuId);
    const sidebar = document.getElementById('sidebar');

    // Solo mostrar submenú si la sidebar está expandida
    if (!sidebar.classList.contains('collapsed')) {
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block'; // Toggle para abrir/cerrar submenú
    }
}

// Obtener los elementos
const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const toggleIcon = document.getElementById('toggle-icon');

// Evento para alternar el colapso de la sidebar
toggleButton.addEventListener('click', () => {
  // Cambiar la clase 'collapsed' en la sidebar
    sidebar.classList.toggle('collapsed');
});
