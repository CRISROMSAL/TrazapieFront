document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("usuarioId");

    if (!userId) {
        window.location.href = "login.html";
        return;
    }

    const nombreElem = document.getElementById("nombreUsuario");
    const pasosElem = document.getElementById("pasosAct");
    const caloriasElem = document.getElementById("caloriasAct");
    const tiempoElem = document.getElementById("tiempoAct");

    try {
        const response = await fetch(`/api/usuario/${userId}`);
        if (!response.ok) throw new Error("Error al obtener datos");

        const usuario = await response.json();

        if (nombreElem) nombreElem.textContent = usuario.datos_personales.nombre;

        const pasos = usuario.actividad_resumen.pasosTotales || 0;
        const calorias = (pasos * 0.04).toFixed(0);
        const tiempo = (pasos / 100).toFixed(0);

        // --- IMPLEMENTACIÓN DE MICROINTERACCIÓN ---
        if (pasosElem) {
            pasosElem.innerText = `Pasos: ${pasos}`;
            
            // Añadimos la clase de animación que definiste en main.scss
            pasosElem.classList.add('pulse-animation');
            
            // La quitamos después de que termine (0.4s) para que pueda volver a activarse
            setTimeout(() => {
                pasosElem.classList.remove('pulse-animation');
            }, 400);
        }
        
        if (caloriasElem) caloriasElem.innerText = `Calorías: ${calorias}`;
        if (tiempoElem) tiempoElem.innerText = `Tiempo: ${tiempo} min`;

    } catch (error) {
        console.error("Error cargando dashboard:", error);
    }
});