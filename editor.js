
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
  if (!file) return;
  if (!file.name.endsWith(".txt")) {
    alert("Solo se admiten archivos .txt por ahora.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
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
      if (tipo === "imagen") html = `<img src="\${ev.target.result}" style="max-width:200px;">`;
      if (tipo === "audio") html = `<audio controls src="\${ev.target.result}"></audio>`;
      if (tipo === "video") html = `<video controls src="\${ev.target.result}" style="width:200px;"></video>`;

      const contenedor = document.createElement("div");
      contenedor.className = "elemento-editable";
      contenedor.innerHTML = html;
      contenedor.contentEditable = false;
      contenedor.style.left = "50px";
      contenedor.style.top = "200px";

      contenedor.addEventListener("mousedown", function(e) {
        contenedor.classList.add("selected");
        let shiftX = e.clientX - contenedor.getBoundingClientRect().left;
        let shiftY = e.clientY - contenedor.getBoundingClientRect().top;

        function mover(e) {
          contenedor.style.left = e.pageX - shiftX + "px";
          contenedor.style.top = e.pageY - shiftY + "px";
        }

        function parar() {
          document.removeEventListener("mousemove", mover);
          document.removeEventListener("mouseup", parar);
        }

        document.addEventListener("mousemove", mover);
        document.addEventListener("mouseup", parar);
      });

      contenedor.addEventListener("click", function(e) {
        document.querySelectorAll(".elemento-editable").forEach(el => el.classList.remove("selected"));
        contenedor.classList.add("selected");
      });

      document.getElementById("zona-trabajo").appendChild(contenedor);
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

function insertarFigura() {
  const figura = document.createElement("div");
  figura.className = "elemento-editable";
  figura.innerHTML = '<div style="width:80px; height:80px; background:yellow; color:black; text-align:center; line-height:80px;">▲</div>';
  figura.style.left = "60px";
  figura.style.top = "300px";
  document.getElementById("zona-trabajo").appendChild(figura);
}
