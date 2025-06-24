
function mostrarLogin() {
  document.getElementById("loginForm").style.display = "block";
}

function verificar() {
  const correo = document.getElementById("correo").value.trim();
  const clave = document.getElementById("clave").value.trim();
  const extra = document.getElementById("extra").value.trim().toLowerCase();
  const msg = document.getElementById("mensaje");

  if (correo === "francisromerovaldez@gmail.com" && clave === "xp95" && extra === "mewtwo") {
    window.location.href = "panel.html";
  } else {
    msg.innerText = "¿Eres tú o eres un desconocido? No me andes con rodeos.";
  }
}
