
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
      contenedor.style.left = "80px";
      contenedor.style.top = "300px";

      hacerMovible(contenedor);
      document.getElementById("zona-trabajo").appendChild(contenedor);
    };

    if (tipo === "figura") {
      // Crear óvalo con texto editable
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

function hacerMovible(elemento) {
  elemento.onmousedown = function(e) {
    elemento.classList.add("selected");
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

  elemento.onclick = function() {
    document.querySelectorAll(".elemento-editable").forEach(el => el.classList.remove("selected"));
    elemento.classList.add("selected");
  };
}
