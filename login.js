
function mostrarLogin() {
    document.getElementById("login-panel").classList.toggle("login-hidden");
}

function verificarAcceso() {
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const pokemon = document.getElementById("pokemon").value.trim().toLowerCase();

    const errorMsg = document.getElementById("error-msg");
    const frases = [
        "¿Eres tú o eres un desconocido?",
        "No me andes con rodeos.",
        "No te reconozco, intenta otra vez.",
        "Esto no es para cualquiera.",
        "Si no sabes quién es Mewtwo, lárgate."
    ];

    if (email === "francisromerovaldez@gmail.com" && password === "xp95" && pokemon === "mewtwo") {
        window.location.href = "panel.html";
    } else {
        errorMsg.textContent = frases[Math.floor(Math.random() * frases.length)];
    }
}
