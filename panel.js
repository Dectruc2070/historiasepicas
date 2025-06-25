
function mostrarModal() {
  document.getElementById("modalPublicar").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modalPublicar").style.display = "none";
}

let textoHistoria = "";

function cargarTextoArchivo(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    textoHistoria = e.target.result;
    localStorage.setItem("historiaTemporal", textoHistoria);
  };

  if (file.name.endsWith(".txt")) {
    reader.readAsText(file);
  } else {
    alert("Actualmente solo se admite texto plano (.txt). Muy pronto se incluirá soporte para Word.");
  }
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
    cerrarModal();
    window.location.href = "index.html";
  };
  reader.readAsDataURL(portadaFile);
}
