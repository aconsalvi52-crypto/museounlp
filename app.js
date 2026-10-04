const screens = [...document.querySelectorAll('.screen')];
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const toast = document.getElementById('toast');
const cameraVideo = document.getElementById('cameraVideo');
const cameraStatus = document.getElementById('cameraStatus');
const snapshotCanvas = document.getElementById('snapshotCanvas');
const AR_CAMERA_URL = 'https://thomascons-boop.github.io/ar-magic-creator/?ar=true&id=fb5b2cdd-0bf0-4251-973d-c56b9fe58a3b';

const state = {
  current: 'splash',
  stream: null,
  facingMode: 'environment',
  favoriteRoute: false,
  points: 1250,
};

const categoryInfo = {
  'Arte y cultura': 'Explorá museos y espacios vinculados al arte, las imágenes y la cultura.',
  'Ciencia y tecnología': 'Descubrí instrumentos, colecciones y experiencias vinculadas a la ciencia y la tecnología.',
  'Naturaleza y vida': 'Encontrá propuestas relacionadas con la naturaleza, la vida y sus colecciones.',
  'Memoria y patrimonio': 'Recorré objetos, historias y espacios vinculados con la memoria y el patrimonio.'
};

function showScreen(name) {
  const target = screens.find(s => s.dataset.screen === name);
  if (!target) return;
  screens.forEach(s => s.classList.toggle('active', s === target));
  state.current = name;
  if (name === 'camera') startCamera();
  else stopCamera();
}

function showToast(message, ms = 1800) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove('show'), ms);
}

function openModal(html) {
  modalContent.innerHTML = html;
  if (typeof modal.showModal === 'function') modal.showModal();
  else modal.setAttribute('open', '');
}
function closeModal() {
  if (typeof modal.close === 'function' && modal.open) modal.close();
  else modal.removeAttribute('open');
}

function startCamera() {
  // Using iframe now
}
function stopCamera() {
  // Using iframe now
}

async function flipCamera() {
  // Handled by iframe
}

function takePhoto() {
  showToast('Para tomar fotos, usá la cámara web de la experiencia de Realidad Aumentada.');
}

document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-screen-target], [data-action], [data-category]');
  if (!el) return;

  if (el.dataset.screenTarget) {
    showScreen(el.dataset.screenTarget);
    return;
  }

  if (el.dataset.category) {
    const title = el.dataset.category;
    openModal(`<h2>${title}</h2><p>${categoryInfo[title]}</p><p>En la próxima versión podemos hacer que cada categoría abra su listado completo de museos.</p>`);
    return;
  }

  const action = el.dataset.action;
  if (action === 'go-home') showScreen('home');
  if (action === 'search') openModal(`<h2>Buscar</h2><p>Escribí el nombre de un museo, actividad o categoría. En esta V1 la búsqueda es de demostración.</p><input id="demoSearch" placeholder="Buscar museos, actividades..." style="width:100%;padding:12px 14px;border-radius:14px;border:1px solid rgba(255,255,255,.2);background:#0b0b0b;color:#fff;outline:none"><button data-action="run-search" style="margin-top:12px;width:100%;padding:12px;border:0;border-radius:999px;background:linear-gradient(90deg,#b9e700,#1cc8e4,#ff9d00);font-weight:600">Buscar</button>`);
  if (action === 'run-search') {
    const value = document.getElementById('demoSearch')?.value?.trim();
    closeModal();
    showToast(value ? `Buscando “${value}”…` : 'Escribí algo para buscar');
  }
  if (action === 'soon') showToast('Detalle disponible en la próxima versión');
  if (action === 'enroll') { state.points += 100; closeModal(); showToast('¡Inscripción registrada! +100 pts'); }
  if (action === 'surprise') showToast('¡Sorpresa preparada!');
  if (action === 'directions') showToast('Preparando indicaciones para llegar…');
  if (action === 'favorite') { state.favoriteRoute = !state.favoriteRoute; showToast(state.favoriteRoute ? 'Recorrido guardado en favoritos' : 'Recorrido quitado de favoritos'); }
  if (action === 'start-route') { state.points += 100; showToast('Recorrido iniciado · +100 pts'); }
  if (action === 'settings') openModal('<h2>Configuración</h2><p>Acá podemos incorporar notificaciones, accesibilidad, permisos y preferencias.</p>');
  if (action === 'edit-profile') openModal('<h2>Editar perfil</h2><p>En esta V1 el perfil es una maqueta interactiva. Luego podemos agregar nombre, foto y preferencias editables.</p>');
  if (action === 'achievements') openModal('<h2>Mis logros</h2><p>Los logros mostrados en tu diseño pueden convertirse en insignias desbloqueables con datos reales.</p>');
  if (action === 'levels') openModal('<h2>Niveles</h2><p>Nivel 1 · Visitante<br>Nivel 2 · Explorador<br>Nivel 3 · Curioso<br>Nivel 4 · Descubridor</p>');
  if (action === 'rewards') openModal('<h2>Recompensas</h2><p>Las tarjetas de recompensas de tu diseño quedan listas para vincular a un catálogo o sistema de beneficios.</p>');
  if (action === 'open-ar') window.location.assign(AR_CAMERA_URL);
  if (action === 'flip-camera') flipCamera();
  if (action === 'take-photo') takePhoto();
  if (action === 'close-modal') closeModal();
});

// Auto advance from splash after a short animation.
setTimeout(() => {
  if (state.current === 'splash') showScreen('home');
}, 2500);

// Close modal clicking backdrop.
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

// ----------------------------------------------------
// FULLSCREEN POR LONG-PRESS (3 segundos)
// ----------------------------------------------------
let fullscreenTimer;

function startFullscreenTimer() {
  clearTimeout(fullscreenTimer);
  fullscreenTimer = setTimeout(() => {
    const docEl = document.documentElement;
    const requestFs = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    
    if (requestFs) {
      requestFs.call(docEl).then(() => {
        showToast('Pantalla completa activada');
      }).catch(err => {
        console.warn('Error intentando pantalla completa:', err);
      });
    } else {
      showToast('Tu navegador no soporta pantalla completa automática');
    }
  }, 3000);
}

function cancelFullscreenTimer() {
  clearTimeout(fullscreenTimer);
}

// Eventos táctiles
document.body.addEventListener('touchstart', startFullscreenTimer, { passive: true });
document.body.addEventListener('touchend', cancelFullscreenTimer);
document.body.addEventListener('touchmove', cancelFullscreenTimer, { passive: true });

// Eventos de ratón (para pruebas en PC)
document.body.addEventListener('mousedown', startFullscreenTimer);
document.body.addEventListener('mouseup', cancelFullscreenTimer);
document.body.addEventListener('mousemove', cancelFullscreenTimer);

