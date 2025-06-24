
let elementoSeleccionado = null;

// Botones de formato
function formato(comando) {
  document.execCommand(comando, false, null);
}

function cambiarFuente() {
  const fuente = document.getElementById("fuente").value;
  document.execCommand("fontName", false, fuente);
}

function cambiarTamano() {
  const tam = document.getElementById("tamano").value;
  document.execCommand("fontSize", false, "7");
  const fuentes = document.getElementsByTagName("font");
  for (let f of fuentes) {
    if (f.size === "7") {
      f.removeAttribute("size");
      f.style.fontSize = tam;
    }
  }
}

function cambiarColor() {
  const color = document.getElementById("color").value;
  document.execCommand("foreColor", false, color);
}

// Abrir archivo .txt
function abrirArchivo(event) {
  const file = event.target.files[0];
  if (!file || !file.name.endsWith(".txt")) {
    alert("Solo se admiten archivos .txt por ahora.");
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById("zona").innerText = e.target.result;
  };
  reader.readAsText(file);
}

// Insertar elementos
function insertar(tipo) {
  const input = document.createElement("input");
  input.type = "file";
  if (tipo === "imagen") input.accept = "image/*";
  if (tipo === "audio") input.accept = "audio/*";
  if (tipo === "video") input.accept = "video/*";

  input.onchange = function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(ev) {
      let html = "";
      if (tipo === "imagen") html = `<img src="${ev.target.result}" style="max-width:200px;" title="Imagen insertada">`;
      if (tipo === "audio") html = `<audio controls src="${ev.target.result}"></audio>`;
      if (tipo === "video") html = `<video controls src="${ev.target.result}" style="width:200px;"></video>`;

      const contenedor = document.createElement("div");
      contenedor.className = "elemento-editable";
      contenedor.innerHTML = html;
      contenedor.contentEditable = false;
      contenedor.style.left = "100px";
      contenedor.style.top = "300px";

      hacerMovible(contenedor);
      document.getElementById("zona-trabajo").appendChild(contenedor);
    };

    if (tipo === "figura") {
      const ovalo = document.createElement("div");
      ovalo.className = "elemento-editable";
      ovalo.contentEditable = true;
      ovalo.innerText = "Texto en óvalo";
      ovalo.style.left = "100px";
      ovalo.style.top = "300px";
      ovalo.style.width = "200px";
      ovalo.style.height = "100px";
      ovalo.style.background = "white";
      ovalo.style.color = "black";
      ovalo.style.border = "2px solid #888";
      ovalo.style.borderRadius = "50%";
      ovalo.style.textAlign = "center";
      ovalo.style.lineHeight = "100px";
      ovalo.style.fontWeight = "bold";
      hacerMovible(ovalo);
      document.getElementById("zona-trabajo").appendChild(ovalo);
    } else {
      reader.readAsDataURL(file);
    }
  };

  input.click();
}

// Hacer movible
function hacerMovible(elemento) {
  elemento.classList.add("elemento-editable");
  elemento.onmousedown = function(e) {
    if (e.button === 2) return; // no mover con clic derecho
    elementoSeleccionado = elemento;
    let shiftX = e.clientX - elemento.getBoundingClientRect().left;
    let shiftY = e.clientY - elemento.getBoundingClientRect().top;

    function mover(ev) {
      elemento.style.left = ev.pageX - shiftX + "px";
      elemento.style.top = ev.pageY - shiftY + "px";
    }

    function soltar() {
      document.removeEventListener("mousemove", mover);
      document.removeEventListener("mouseup", soltar);
    }

    document.addEventListener("mousemove", mover);
    document.addEventListener("mouseup", soltar);
  };

  elemento.oncontextmenu = function(e) {
    e.preventDefault();
    elementoSeleccionado = elemento;
    const menu = document.getElementById("menu-contextual");
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
    menu.style.display = "block";
  };

  elemento.onclick = function() {
    document.querySelectorAll(".elemento-editable").forEach(el => el.classList.remove("selected"));
    elemento.classList.add("selected");
  };
}

// Ocultar menú contextual al hacer clic fuera
document.addEventListener("click", function(e) {
  const menu = document.getElementById("menu-contextual");
  if (menu) menu.style.display = "none";
});

// Funciones del menú contextual
function eliminarElemento() {
  if (elementoSeleccionado) elementoSeleccionado.remove();
}

function copiarElemento() {
  if (!elementoSeleccionado) return;
  const copia = elementoSeleccionado.cloneNode(true);
  copia.style.left = parseInt(elementoSeleccionado.style.left) + 20 + "px";
  copia.style.top = parseInt(elementoSeleccionado.style.top) + 20 + "px";
  hacerMovible(copia);
  document.getElementById("zona-trabajo").appendChild(copia);
}

function guardarComo() {
  if (!elementoSeleccionado) return;
  const img = elementoSeleccionado.querySelector("img");
  if (!img) return;
  const a = document.createElement("a");
  a.href = img.src;
  a.download = "imagen.png";
  a.click();
}

function buscarEnGoogle() {
  if (!elementoSeleccionado) return;
  const img = elementoSeleccionado.querySelector("img");
  if (!img) return;
  const url = "https://www.google.com/searchbyimage?image_url=" + encodeURIComponent(img.src);
  window.open(url, "_blank");
}

// Publicar historia (como en panel.js)
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
