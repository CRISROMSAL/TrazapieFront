document.addEventListener("DOMContentLoaded", () => {
    const usuarioActualStr = localStorage.getItem("usuarioActual");
    if (!usuarioActualStr) return;

    const usuarioActual = JSON.parse(usuarioActualStr);

    // -------------------------
    // 1️⃣ Mostrar datos de perfil (columna derecha) y hacerlos editables
    // -------------------------
    const perfilIDs = {
        username: "nombrePerfil",
        email: "correoPerfil",
        edad: "edadPerfil",
        peso: "pesoPerfil",
        altura: "alturaPerfil",
        objetivo: "objetivoPerfil"
    };

    for (const key in perfilIDs) {
        const elem = document.getElementById(perfilIDs[key]);
        if (elem) {
            elem.innerText = usuarioActual[key] ?? "--";
            elem.contentEditable = true; // permite editar
            elem.style.borderBottom = "1px dashed #ccc"; // opcional: resalta editable
            elem.style.padding = "2px"; // opcional: estética

            // Efecto visual al enfocar/desenfocar
            elem.addEventListener("focus", () => {
                elem.style.backgroundColor = "#f0f8ff";
            });
            elem.addEventListener("blur", () => {
                elem.style.backgroundColor = "";
            });
        }
    }

    // -------------------------
    // 2️⃣ Mostrar nombre en la barra superior
    // -------------------------
    const nombreUsuarioElem = document.getElementById("nombreUsuario");
    if (nombreUsuarioElem) nombreUsuarioElem.innerText = usuarioActual.username ?? "--";

    // -------------------------
    // 3️⃣ Mejor marca personal (columna central)
    // -------------------------
    let maxPasos = 0;
    let datosMax = null;

    for (const mes in usuarioActual.historial) {
        const dias = usuarioActual.historial[mes];
        for (const dia in dias) {
            const registro = dias[dia];
            if (registro.pasos > maxPasos) {
                maxPasos = registro.pasos;
                const [anio, mesNum] = mes.split("-");
                datosMax = {
                    fecha: `${String(dia).padStart(2, "0")}/${String(mesNum).padStart(2, "0")}/${anio}`,
                    pasos: registro.pasos,
                    calorias: registro.calorias,
                    tiempo: registro.tiempo
                };
            }
        }
    }

    const columnaCentral = document.querySelector(".columnaCentral");
    if (columnaCentral) {
        if (datosMax) {
            columnaCentral.innerHTML = `
                <p>Mejor Marca Personal</p>
                <p>${datosMax.fecha}</p>
                <p>${datosMax.pasos} pasos</p>
                <p>${datosMax.tiempo} minutos de actividad</p>
                <p>${datosMax.calorias} calorías</p>
            `;
        } else {
            columnaCentral.innerHTML = `
                <p>Mejor Marca Personal</p>
                <p>--/--/----</p>
                <p>0 pasos</p>
                <p>0 minutos de actividad</p>
                <p>0 calorías</p>
            `;
        }
    }

    // -------------------------
    // 4️⃣ Botón de confirmación (simulado)
    // -------------------------
    const boton = document.querySelector('.columnaBoton');
    if (boton) {
        boton.addEventListener('click', () => {
            alert("Datos guardados (simulado, no se sobreescribe JSON)");
        });
    }
});
