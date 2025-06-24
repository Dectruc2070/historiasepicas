
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

function insertarURL() {
  const url = prompt("Pega aquí la URL de la imagen, audio o video:");
  if (!url) return;

  let tipo = "";
  if (url.match(/\.(jpeg|jpg|png|gif)$/)) tipo = "imagen";
  else if (url.match(/\.(mp3|wav)$/)) tipo = "audio";
  else if (url.match(/\.(mp4|webm)$/)) tipo = "video";
  else {
    alert("URL no reconocida. Usa una imagen, audio o video válido.");
    return;
  }

  let html = "";
  if (tipo === "imagen") html = `<img src="${url}" style="max-width:200px;">`;
  if (tipo === "audio") html = `<audio controls src="${url}"></audio>`;
  if (tipo === "video") html = `<video controls src="${url}" style="width:200px;"></video>`;

  const contenedor = document.createElement("div");
  contenedor.className = "elemento-editable";
  contenedor.innerHTML = html;
  contenedor.contentEditable = false;
  contenedor.style.left = "80px";
  contenedor.style.top = "300px";

  contenedor.onmousedown = function(e) {
    contenedor.classList.add("selected");
    let shiftX = e.clientX - contenedor.getBoundingClientRect().left;
    let shiftY = e.clientY - contenedor.getBoundingClientRect().top;

    function mover(ev) {
      contenedor.style.left = ev.pageX - shiftX + "px";
      contenedor.style.top = ev.pageY - shiftY + "px";
    }

    function soltar() {
      document.removeEventListener("mousemove", mover);
      document.removeEventListener("mouseup", soltar);
    }

    document.addEventListener("mousemove", mover);
    document.addEventListener("mouseup", soltar);
  };

  document.querySelectorAll(".elemento-editable").forEach(el => el.classList.remove("selected"));
  document.getElementById("zona-trabajo").appendChild(contenedor);
}
