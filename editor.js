
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

function insertarFigura() {
    const figura = document.createElement("div");
    figura.style.width = "60px";
    figura.style.height = "60px";
    figura.style.background = "yellow";
    figura.style.border = "2px solid black";
    figura.style.margin = "10px";
    figura.innerText = "▲";
    figura.style.textAlign = "center";
    figura.style.lineHeight = "60px";
    figura.style.color = "black";
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
            const img = document.createElement("img");
            img.src = ev.target.result;
            img.style.maxWidth = "100%";
            document.getElementById("columna-derecha").appendChild(img);
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
            const audio = document.createElement("audio");
            audio.controls = true;
            audio.src = ev.target.result;
            document.getElementById("columna-izquierda").appendChild(audio);
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
            const video = document.createElement("video");
            video.controls = true;
            video.src = ev.target.result;
            video.style.maxWidth = "100%";
            document.getElementById("columna-derecha").appendChild(video);
        };
        reader.readAsDataURL(file);
    };
    input.click();
}
