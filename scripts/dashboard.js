document.addEventListener("DOMContentLoaded", () => {

    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    if (!usuarioActual) {
        console.error("No hay usuario logueado");
        // Opcional: redirigir al login
        // window.location.href = "/TrazapieFront/login.html";
        return;
    }

    // Elementos donde pintar los datos
    const pasosElem = document.getElementById("pasosAct");
    const caloriasElem = document.getElementById("caloriasAct");
    const tiempoElem = document.getElementById("tiempoAct");

    // Fecha de hoy
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0"); // "11"
    const day = String(fecha.getDate()); // "24"

    const claveMes = `${year}-${month}`; // "2025-11"

    // Comprobamos si existe historial del mes y del día
    const mesHistorial = usuarioActual.historial[claveMes];
    const datosDia = mesHistorial ? mesHistorial[day] : null;

    if (datosDia) {
        pasosElem.innerText = `Pasos: ${datosDia.pasos}`;
        caloriasElem.innerText = `Calorías: ${datosDia.calorias}`;
        tiempoElem.innerText = `Tiempo de actividad: ${datosDia.tiempo} min.`;
    } else {
        pasosElem.innerText = `Pasos: 0`;
        caloriasElem.innerText = `Calorías: 0`;
        tiempoElem.innerText = `Tiempo de actividad: 0 min.`;
    }

});
