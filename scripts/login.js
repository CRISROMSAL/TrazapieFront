document.addEventListener("DOMContentLoaded", () => {
    const inputEmail = document.querySelector('input[type="email"]');
    const inputPassword = document.querySelector('input[type="password"]');
    const btnConfirmar = document.getElementById("confirmar");
    const loginError = document.getElementById("loginError");

    btnConfirmar.addEventListener("click", async (e) => {
        e.preventDefault(); // evita recarga
        loginError.textContent = ""; // limpia mensaje anterior

        const email = inputEmail.value.trim();
        const password = inputPassword.value.trim();

        // 1️⃣ Validar campos vacíos
        if (!email || !password) {
            loginError.textContent = "Por favor ingresa tu correo y contraseña.";
            return;
        }

        try {
            // 2️⃣ Cargar JSON de usuarios
            const response = await fetch("/TrazapieFront/back/usuarios.json"); // ruta relativa
            if (!response.ok) {
                loginError.textContent = "No se pudo cargar la lista de usuarios.";
                return;
            }

            let data;
            try {
                data = await response.json();
            } catch {
                loginError.textContent = "El archivo de usuarios no es JSON válido.";
                return;
            }

            // 3️⃣ Buscar usuario
            const usuario = data.usuarios.find(u => u.email === email && u.password === password);

            if (!usuario) {
                loginError.textContent = "Correo o contraseña incorrectos. Intenta de nuevo.";
                return; // ❌ Detiene aquí, no hay redirección
            }

            // 4️⃣ Usuario válido
            localStorage.setItem("usuarioActual", JSON.stringify(usuario));
            window.location.href = "/TrazapieFront/dashboard.html"; // solo aquí redirige si es correcto

        } catch (err) {
            console.error("Error cargando usuarios:", err);
            loginError.textContent = "No se pudo validar el login. Intenta más tarde.";
        }
    });
});
