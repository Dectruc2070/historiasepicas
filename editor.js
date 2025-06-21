
function formato(comando) {
    document.execCommand(comando, false, null);
}

function cambiarFuente() {
    const fuente = document.getElementById("fuente").value;
    document.execCommand("fontName", false, fuente);
}

function cambiarTamano() {
    const tam = document.getElementById("tamano").value;
    document.execCommand("fontSize", false, "7"); // fontSize usa valores 1-7
    const allFont = document.getElementsByTagName("font");
    for (let i = 0; i < allFont.length; i++) {
        if (allFont[i].size === "7") {
            allFont[i].removeAttribute("size");
            allFont[i].style.fontSize = tam;
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
        alert("Este tipo de archivo no es compatible aún. Usa .txt o copia y pega desde Word.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("lienzo").innerText = e.target.result;
    };
    reader.readAsText(file);
}

function insertar(tipo) {
    const contenedor = document.createElement("div");
    contenedor.className = "editable";
    contenedor.setAttribute("contenteditable", "false");

    if (tipo === "figura") {
        contenedor.innerHTML = '<div style="width:80px; height:80px; background:yellow; color:black; text-align:center; line-height:80px;">▲</div>';
    } else {
        const input = document.createElement("input");
        if (tipo === "imagen") input.accept = "image/*";
        if (tipo === "audio") input.accept = "audio/*";
        if (tipo === "video") input.accept = "video/*";
        input.type = "file";
        input.onchange = function(e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function(ev) {
                let html = "";
                if (tipo === "imagen") html = `<img src="${ev.target.result}" style="max-width:100%;">`;
                if (tipo === "audio") html = `<audio controls src="${ev.target.result}"></audio>`;
                if (tipo === "video") html = `<video controls src="${ev.target.result}" style="width:100%;"></video>`;
                contenedor.innerHTML = html;
            };
            reader.readAsDataURL(file);
        };
        input.click();
        return;
    }

    document.getElementById("lienzo").appendChild(contenedor);
    aplicarSeleccion(contenedor);
}

document.addEventListener("click", function(e) {
    const elementos = document.querySelectorAll(".editable");
    elementos.forEach(el => el.classList.remove("selected"));
    if (e.target.closest(".editable")) {
        e.target.closest(".editable").classList.add("selected");
    }
});
