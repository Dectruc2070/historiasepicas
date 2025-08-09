/* editor.js — controla inserción, movimiento, menú contextual y publicar */

// variables globales
let elementoSeleccionado = null;
const contenedor = () => document.getElementById('zona-trabajo');
const zona = () => document.getElementById('zona');

// formato simple (execCommand)
function formato(comando) {
  document.execCommand(comando, false, null);
}
function cambiarFuente() {
  const fuente = document.getElementById('fuente').value;
  document.execCommand('fontName', false, fuente);
}
function cambiarTamano() {
  const tam = document.getElementById('tamano').value;
  document.execCommand('fontSize', false, '7');
  const fonts = document.getElementsByTagName('font');
  for (let f of fonts) {
    if (f.size === '7') {
      f.removeAttribute('size');
      f.style.fontSize = tam;
    }
  }
}
function cambiarColor() {
  const color = document.getElementById('color').value;
  document.execCommand('foreColor', false, color);
}

/* abrir .txt */
function abrirArchivo(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.name.endsWith('.txt')) { alert('Solo .txt aquí.'); return; }
  const reader = new FileReader();
  reader.onload = e => { document.getElementById('zona').innerText = e.target.result; };
  reader.readAsText(file);
}

/* insertar imagen/audio/video/figura */
function insertar(tipo) {
  if (tipo === 'figura') {
    crearOvalo();
    return;
  }

  const input = document.createElement('input');
  input.type = 'file';
  if (tipo === 'imagen') input.accept = 'image/*';
  if (tipo === 'audio') input.accept = 'audio/*';
  if (tipo === 'video') input.accept = 'video/*';

  input.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      let html = '';
      if (tipo === 'imagen') html = `<img src="${ev.target.result}" style="max-width:300px; display:block;">`;
      if (tipo === 'audio') html = `<audio controls src="${ev.target.result}"></audio>`;
      if (tipo === 'video') html = `<video controls src="${ev.target.result}" style="max-width:320px;"></video>`;

      const cont = document.createElement('div');
      cont.className = 'elemento-editable';
      cont.innerHTML = html;
      cont.style.left = '40px';
      cont.style.top = '40px';
      cont.style.position = 'absolute';
      attachBehavior(cont);
      // añadir al contenedor unificado (zona-trabajo) para que pueda moverse por todo el lienzo
      document.getElementById('zona-trabajo').appendChild(cont);
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

/* crear un óvalo editable con texto */
function crearOvalo() {
  const ovalo = document.createElement('div');
  ovalo.className = 'elemento-editable';
  ovalo.contentEditable = true;
  ovalo.innerText = 'Texto en óvalo';
  ovalo.style.left = '60px';
  ovalo.style.top = '60px';
  ovalo.style.width = '180px';
  ovalo.style.height = '100px';
  ovalo.style.borderRadius = '50%';
  ovalo.style.textAlign = 'center';
  ovalo.style.lineHeight = '100px';
  ovalo.style.background = '#fff';
  ovalo.style.fontWeight = '600';
  ovalo.style.position = 'absolute';
  attachBehavior(ovalo);
  document.getElementById('zona-trabajo').appendChild(ovalo);
}

/* comportamiento: mover, seleccionar, menú contextual */
function attachBehavior(el) {
  // seleccionar al hacer click
  el.addEventListener('click', (ev) => {
    ev.stopPropagation();
    document.querySelectorAll('.elemento-editable').forEach(e=>e.classList.remove('selected'));
    el.classList.add('selected');
    elementoSeleccionado = el;
  });

  // drag (mousedown -> mousemove -> mouseup)
  el.addEventListener('mousedown', function(e){
    if (e.button === 2) return; // no con botón derecho
    e.preventDefault();
    elementoSeleccionado = el;
    const contRect = document.getElementById('zona-trabajo').getBoundingClientRect();
    const offsetX = e.clientX - el.getBoundingClientRect().left;
    const offsetY = e.clientY - el.getBoundingClientRect().top;

    function mover(ev){
      // posición relativa al contenedor
      const x = ev.clientX - contRect.left;
      const y = ev.clientY - contRect.top + document.getElementById('zona-trabajo').scrollTop;
      el.style.left = (x - offsetX) + 'px';
      el.style.top = (y - offsetY) + 'px';
    }
    function up(){
      document.removeEventListener('mousemove', mover);
      document.removeEventListener('mouseup', up);
    }
    document.addEventListener('mousemove', mover);
    document.addEventListener('mouseup', up);
  });

  // menú contextual propio
  el.addEventListener('contextmenu', function(e){
    e.preventDefault();
    elementoSeleccionado = el;
    const menu = document.getElementById('menu-contextual');
    menu.style.left = e.pageX + 'px';
    menu.style.top = e.pageY + 'px';
    menu.style.display = 'block';
  });
}

/* ocultar menú al click fuera */
document.addEventListener('click', () => {
  const m = document.getElementById('menu-contextual');
  if (m) m.style.display = 'none';
});

/* opciones menú contextual */
function eliminarElemento(){
  if (elementoSeleccionado) elementoSeleccionado.remove();
}
function copiarElemento(){
  if (!elementoSeleccionado) return;
  const copia = elementoSeleccionado.cloneNode(true);
  // posicionarla cerca
  copia.style.left = (parseInt(elementoSeleccionado.style.left||0) + 20) + 'px';
  copia.style.top = (parseInt(elementoSeleccionado.style.top||0) + 20) + 'px';
  attachBehavior(copia);
  document.getElementById('zona-trabajo').appendChild(copia);
}
function guardarComo(){
  if (!elementoSeleccionado) return;
  const img = elementoSeleccionado.querySelector('img');
  if (!img) { alert('No es una imagen.'); return; }
  const a = document.createElement('a');
  a.href = img.src;
  a.download = 'imagen.png';
  a.click();
}
function buscarEnGoogle(){
  if (!elementoSeleccionado) return;
  const img = elementoSeleccionado.querySelector('img');
  if (!img) { alert('No es una imagen.'); return; }
  const url = 'https://www.google.com/searchbyimage?image_url=' + encodeURIComponent(img.src);
  window.open(url, '_blank');
}

/* publicar: tomar portada, guardar en localStorage y redirigir a index.html */
function mostrarModal(){ document.getElementById('modalPublicar').style.display='flex'; }
function cerrarModal(){ document.getElementById('modalPublicar').style.display='none'; }

function cargarTextoArchivo(input){
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    // guarda texto temporal para editor
    localStorage.setItem('historiaTemporal', e.target.result);
    alert('Texto cargado. Si eliges "¿Quieres editar tu historia?" verás el contenido en el editor.');
  };
  if (file.name.endsWith('.txt')) reader.readAsText(file);
  else alert('Solo .txt por ahora (próximamente .docx).');
}

function confirmarPublicacion(){
  const titulo = document.getElementById('titulo').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const categoria = document.getElementById('categoria').value;
  const portadaFile = document.getElementById('portada').files[0];

  if (!titulo || !descripcion || !portadaFile) { alert('Completa título, descripción y portada.'); return; }

  const reader = new FileReader();
  reader.onload = function(e){
    const historias = JSON.parse(localStorage.getItem('historiasPublicadas') || '[]');
    historias.push({
      titulo, descripcion, categoria,
      portada: e.target.result
    });
    localStorage.setItem('historiasPublicadas', JSON.stringify(historias));
    cerrarModal();
    // redirigir para que index muestre la nueva historia inmediatamente
    window.location.href = 'index.html';
  };
  reader.readAsDataURL(portadaFile);
}

/* Ajuste: cuando se inserta contenido desde panel (historiaTemporal), también podemos
   pegarlo en la zona central (ya gestionado en crear.html) */
