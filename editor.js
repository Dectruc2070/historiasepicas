
function crearElementoLibre(tipo, contenido = '') {
    const elem = document.createElement('div');
    elem.className = 'libre';
    if (tipo === 'texto') {
        elem.contentEditable = true;
        elem.innerText = 'Texto libre';
    } else if (tipo === 'imagen') {
        const url = prompt("Pega la URL de la imagen:");
        elem.innerHTML = `<img src="${url}" style="max-width:150px;">`;
    } else if (tipo === 'audio') {
        const url = prompt("Pega la URL del audio (.mp3):");
        elem.innerHTML = `<audio controls src="${url}"></audio>`;
    } else if (tipo === 'video') {
        const url = prompt("Pega la URL del video (YouTube o mp4):");
        if (url.includes("youtube")) {
            const id = url.split("v=")[1].split("&")[0];
            elem.innerHTML = `<iframe width="200" height="120" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            elem.innerHTML = `<video controls width="200" src="${url}"></video>`;
        }
    } else if (tipo === 'figura') {
        elem.innerHTML = '<div style="width:60px; height:60px; background:green; color:white; text-align:center; line-height:60px;">🛡️</div>';
    }
    elem.style.position = 'absolute';
    elem.style.left = '10px';
    elem.style.top = '10px';
    elem.draggable = true;
    elem.ondragstart = (e) => {
        e.dataTransfer.setData("text/plain", null);
        elem.classList.add("drag");
    };
    elem.ondragend = (e) => {
        elem.style.left = e.pageX - 30 + "px";
        elem.style.top = e.pageY - 30 + "px";
        elem.classList.remove("drag");
    };
    document.getElementById("zona-negra").appendChild(elem);
}

function agregarTexto() { crearElementoLibre("texto"); }
function agregarImagen() { crearElementoLibre("imagen"); }
function agregarAudio() { crearElementoLibre("audio"); }
function agregarVideo() { crearElementoLibre("video"); }
function agregarFigura() { crearElementoLibre("figura"); }

function abrirHistoria() {
    const texto = prompt("Pega el texto de la historia aquí:");
    document.getElementById("cuadro-gris").innerText = texto;
}
