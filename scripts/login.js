document.addEventListener("DOMContentLoaded", () => {
    const inputEmail = document.getElementById("emailLogin");
    const inputPassword = document.getElementById("passLogin");
    const btnConfirmar = document.getElementById("confirmar");
    const loginError = document.getElementById("loginError");

    // --- FUNCIÓN PARA LA MICROINTERACCIÓN ---
    const activarError = () => {
        // Añadimos la clase de CSS que creamos en main.scss
        inputEmail.classList.add("input-error");
        inputPassword.classList.add("input-error");

        // La quitamos tras 300ms para que se pueda volver a usar si fallan de nuevo
        setTimeout(() => {
            inputEmail.classList.remove("input-error");
            inputPassword.classList.remove("input-error");
        }, 300);
    };

    if(btnConfirmar) {
        btnConfirmar.addEventListener("click", async (e) => {
            e.preventDefault();
            loginError.textContent = "Verificando...";

            const email = inputEmail.value.trim();
            const password = inputPassword.value.trim();

            if (!email || !password) {
                loginError.textContent = "Por favor ingresa correo y contraseña.";
                activarError(); // <--- LLAMADA AQUÍ (Campos vacíos)
                return;
            }

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (data.success) {
                    localStorage.setItem("usuarioId", data.userId);
                    localStorage.setItem("usuarioNombre", data.nombre);
                    window.location.href = "dashboard.html";
                } else {
                    loginError.textContent = "❌ " + (data.message || "Error de acceso");
                    activarError(); // <--- LLAMADA AQUÍ (Credenciales incorrectas)
                }
            } catch (err) {
                console.error("Error de conexión:", err);
                loginError.textContent = "No se pudo conectar con el servidor.";
                activarError(); // <--- LLAMADA AQUÍ (Error de servidor)
            }
        });
    }
});