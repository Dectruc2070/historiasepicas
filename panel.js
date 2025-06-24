
function mostrarModal() {
  document.getElementById("modalPublicar").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modalPublicar").style.display = "none";
}

function confirmarPublicacion() {
  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const categoria = document.getElementById("categoria").value;

  if (!titulo || !descripcion) {
    alert("Por favor completa todos los campos.");
    return;
  }

  alert("Historia '" + titulo + "' publicada con éxito (simulado).");

  cerrarModal();

  // Aquí se podría guardar en localStorage o base de datos
}
