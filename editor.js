
function formato(comando) {
    document.execCommand(comando, false, null);
}

function cambiarColor() {
    const color = document.getElementById("color").value;
    document.execCommand("foreColor", false, color);
}

function abrirArchivo(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById("zona-texto").innerText = e.target.result;
    };
    reader.readAsText(file);
}

function crearElementoEditable(html) {
    const wrapper = document.createElement("div");
    wrapper.className = "elemento-editable";
    wrapper.innerHTML = html;

    wrapper.setAttribute("draggable", "true");

    wrapper.addEventListener("dragstart", function(e) {
        e.dataTransfer.setData("text/plain", null);
        wrapper.classList.add("drag");
    });

    wrapper.addEventListener("dragend", function(e) {
        wrapper.style.left = e.pageX - 50 + "px";
        wrapper.style.top = e.pageY - 50 + "px";
        wrapper.style.position = "absolute";
        wrapper.classList.remove("drag");
    });

    return wrapper;
}

function insertarFigura() {
    const figura = crearElementoEditable('<div style="width:60px; height:60px; background:yellow; color:black; text-align:center; line-height:60px;">▲</div>');
    document.getElementById("columna-izquierda").appendChild(figura);
}

function insertarImagen() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(ev) {
            const html = `<img src="${ev.target.result}" style="max-width:100%;">`;
            const imgElem = crearElementoEditable(html);
            document.getElementById("columna-derecha").appendChild(imgElem);
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

function insertarAudio() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(ev) {
            const html = `<audio controls src="${ev.target.result}"></audio>`;
            const audioElem = crearElementoEditable(html);
            document.getElementById("columna-izquierda").appendChild(audioElem);
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

function insertarVideo() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(ev) {
            const html = `<video controls src="${ev.target.result}" style="width:100%;"></video>`;
            const videoElem = crearElementoEditable(html);
            document.getElementById("columna-derecha").appendChild(videoElem);
        };
        reader.readAsDataURL(file);
    };
    input.click();
}
