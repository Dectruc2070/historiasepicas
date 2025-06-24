
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
  const portadaFile = document.getElementById("portada").files[0];

  if (!titulo || !descripcion || !portadaFile) {
    alert("Por favor completa todos los campos, incluyendo la portada.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const historias = JSON.parse(localStorage.getItem("historiasPublicadas")) || [];
    historias.push({
      titulo,
      descripcion,
      categoria,
      portada: e.target.result
    });
    localStorage.setItem("historiasPublicadas", JSON.stringify(historias));
    alert("Historia publicada con éxito.");
    cerrarModal();
  };
  reader.readAsDataURL(portadaFile);
}
