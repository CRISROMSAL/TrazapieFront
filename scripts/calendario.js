document.addEventListener("DOMContentLoaded", () => {
    const monthYear = document.getElementById("month-year");
    const calendarGrid = document.getElementById("calendar-grid");

    const pasosElem = document.getElementById("valor-pasos");
    const caloriasElem = document.getElementById("valor-calorias");
    const tiempoElem = document.getElementById("valor-tiempo");

    let currentDate = new Date();

    // Obtener usuario logueado
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
    if (!usuarioActual) {
        alert("No hay usuario logueado");
        window.location.href = "login.html";
        return;
    }

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        const monthNames = [
            "Enero","Febrero","Marzo","Abril","Mayo","Junio",
            "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
        ];

        monthYear.textContent = `${monthNames[month]} ${year}`;

        // Limpiar calendario, mantener nombres de días
        while (calendarGrid.children.length > 7) {
            calendarGrid.removeChild(calendarGrid.lastChild);
        }

        const firstDay = new Date(year, month, 1);
        const startDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i < startDay; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("calendar__empty");
            calendarGrid.appendChild(emptyCell);
        }

        const hoy = new Date();
        const mesActual = hoy.getMonth();
        const diaActual = hoy.getDate();
        const anioActual = hoy.getFullYear();

        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement("div");
            cell.classList.add("calendar__day");
            cell.textContent = day;

            // Solo días anteriores o iguales al actual
            const esDiaValido = (year < anioActual) ||
                                 (year === anioActual && month < mesActual) ||
                                 (year === anioActual && month === mesActual && day <= diaActual);

            if (!esDiaValido) {
                cell.classList.add("disabled");
            } else {
                cell.addEventListener("click", () => {
                    mostrarDatosDia(day, month + 1, year);
                });
            }

            calendarGrid.appendChild(cell);
        }
    }

    // Función para actualizar los datos según el día
    function mostrarDatosDia(dia, mes, anio) {
        const keyMes = `${anio}-${String(mes).padStart(2,"0")}`;
        const historial = usuarioActual.historial[keyMes];

        if (historial && historial[dia]) {
            const datos = historial[dia];
            pasosElem.textContent = datos.pasos;
            caloriasElem.textContent = datos.calorias;
            tiempoElem.textContent = datos.tiempo;
        } else {
            pasosElem.textContent = 0;
            caloriasElem.textContent = 0;
            tiempoElem.textContent = 0;
        }
    }

    // Botones para navegar meses
    document.getElementById("prev").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    document.getElementById("next").addEventListener("click", () => {
        const hoy = new Date();
        if (currentDate.getFullYear() < hoy.getFullYear() || currentDate.getMonth() < hoy.getMonth()) {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        }
    });

    // Al cargar, mostrar calendario y datos del día de hoy
    renderCalendar(currentDate);
    const hoy = new Date();
    mostrarDatosDia(hoy.getDate(), hoy.getMonth() + 1, hoy.getFullYear());
});
