// ======================
// INICIALIZACIÓN GENERAL
// ======================
document.addEventListener('DOMContentLoaded', () => {
  smoothScroll();
  setupContactForm();
});

// ----------------------
// Scroll suave navegación
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ----------------------
// Formulario de contacto
function setupContactForm() {
  const form = document.getElementById('contacto-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      showNotification('Gracias por tu mensaje 💛');
      form.reset();
    });
  }
}

// =======================
// NOTIFICACIÓN GENERAL
// =======================
function showNotification(msg) {
  const notif = document.getElementById('notification');
  if (!notif) return;
  notif.textContent = msg;
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 3000);
}

// =======================
// BOTÓN DE EMERGENCIA
// =======================
function showEmergencyContacts() {
  alert('Si estás en crisis, llama al 135 o al 911 en Argentina.\nEn otros países, busca líneas locales de ayuda inmediata.');
}

// =======================
// TEST EMOCIONAL BÁSICO
// =======================
const preguntas = [
  {
    pregunta: "¿Cómo te sentís ahora?",
    opciones: ["😊 Bien", "😢 Triste", "😰 Ansioso", "😠 Enojado", "😨 Asustado"]
  },
  {
    pregunta: "¿Cómo fue tu día?",
    opciones: ["👍 Positivo", "😐 Normal", "👎 Difícil"]
  }
];

let respuestas = [];
let preguntaActual = 0;

function mostrarPregunta() {
  const div = document.getElementById('test-emocional');
  const progreso = ((preguntaActual + 1) / preguntas.length) * 100;

  if (preguntaActual >= preguntas.length) return mostrarResultado();

  const p = preguntas[preguntaActual];
  div.innerHTML = `
    <div class="progress-bar"><div class="progress-fill" style="width:${progreso}%"></div></div>
    <h3>${p.pregunta}</h3>
    ${p.opciones.map((op, i) =>
      `<button onclick="seleccionarRespuesta(${i})">${op}</button>`
    ).join('<br><br>')}
  `;
}

function seleccionarRespuesta(opcion) {
  respuestas.push(preguntas[preguntaActual].opciones[opcion]);
  preguntaActual++;
  mostrarPregunta();
}

function mostrarResultado() {
  const div = document.getElementById('test-emocional');
  const emocion = respuestas.find(r => r.includes("😢") || r.includes("😰") || r.includes("😠") || r.includes("😨")) || "😊 Bien";
  div.innerHTML = `
    <h3>Tu emoción actual parece ser:</h3>
    <p style="font-size: 2rem;">${emocion}</p>
    <p>Gracias por completar el test. Podés hacer una respiración guiada o registrar cómo te sentís en el calendario.</p>
    <button onclick="reiniciarTest()">Repetir test</button>
  `;
}

function reiniciarTest() {
  respuestas = [];
  preguntaActual = 0;
  mostrarPregunta();
}

mostrarPregunta(); // Lanzamos al inicio

// =======================
// CALENDARIO EMOCIONAL MEJORADO
// =======================
const calendario = document.getElementById('calendario-emocional');
const hoy = new Date().toISOString().slice(0, 10);
let emocionSeleccionada = '';

if (calendario) {
  calendario.innerHTML = `
    <h3>Registrar emoción del día</h3>
    <p>Fecha: ${hoy}</p>
    <div class="emotion-selector">
      <p>¿Cómo te sentiste hoy?</p>
      <div class="emotion-buttons">
        <button class="emotion-btn" data-emotion="😊 Alegría" onclick="seleccionarEmocion('😊 Alegría', this)">
          <span class="emotion-icon">😊</span>
          <span class="emotion-label">Alegría</span>
        </button>
        <button class="emotion-btn" data-emotion="😢 Tristeza" onclick="seleccionarEmocion('😢 Tristeza', this)">
          <span class="emotion-icon">😢</span>
          <span class="emotion-label">Tristeza</span>
        </button>
        <button class="emotion-btn" data-emotion="😰 Ansiedad" onclick="seleccionarEmocion('😰 Ansiedad', this)">
          <span class="emotion-icon">😰</span>
          <span class="emotion-label">Ansiedad</span>
        </button>
        <button class="emotion-btn" data-emotion="😠 Enojo" onclick="seleccionarEmocion('😠 Enojo', this)">
          <span class="emotion-icon">😠</span>
          <span class="emotion-label">Enojo</span>
        </button>
        <button class="emotion-btn" data-emotion="😨 Miedo" onclick="seleccionarEmocion('😨 Miedo', this)">
          <span class="emotion-icon">😨</span>
          <span class="emotion-label">Miedo</span>
        </button>
        <button class="emotion-btn" data-emotion="😌 Calma" onclick="seleccionarEmocion('😌 Calma', this)">
          <span class="emotion-icon">😌</span>
          <span class="emotion-label">Calma</span>
        </button>
      </div>
    </div>
    <div class="notes-section">
      <label for="nota-dia">Notas personales</label>
      <textarea id="nota-dia" rows="3" placeholder="¿Qué pasó hoy? ¿Cómo te sentiste?"></textarea>
    </div>
    <div class="save-section">
      <button class="save-btn" onclick="guardarRegistro()" disabled>
        <span>💾</span> Guardar registro
      </button>
      <div id="confirmacion-registro"></div>
    </div>
  `;
}

function seleccionarEmocion(emocion, boton) {
  // Quitar selección anterior
  document.querySelectorAll('.emotion-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  
  // Marcar nueva selección
  boton.classList.add('selected');
  emocionSeleccionada = emocion;
  
  // Habilitar botón guardar
  document.querySelector('.save-btn').disabled = false;
  
  // Pequeña animación de confirmación
  boton.style.transform = 'scale(0.95)';
  setTimeout(() => {
    boton.style.transform = '';
  }, 150);
}

function guardarRegistro() {
  if (!emocionSeleccionada) {
    showNotification("Por favor selecciona una emoción");
    return;
  }
  
  const nota = document.getElementById('nota-dia').value;
  const registro = {
    emocion: emocionSeleccionada,
    nota: nota,
    fecha: hoy
  };
  
  // Aquí normalmente guardarías en una base de datos
  // Por ahora simularemos el guardado
  console.log('Registro guardado:', registro);
  
  // Mostrar confirmación
  const confirmacion = document.getElementById('confirmacion-registro');
  confirmacion.innerHTML = `
    <div class="success-message">
      <span>✅</span>
      <p>¡Registro guardado exitosamente!</p>
      <small>Emoción: ${emocionSeleccionada}</small>
    </div>
  `;
  
  // Deshabilitar botón después de guardar
  document.querySelector('.save-btn').disabled = true;
  document.querySelector('.save-btn').textContent = '✅ Guardado';
  
  showNotification("Registro emocional guardado 💛");
  
  // Reset após 3 segundos
  setTimeout(() => {
    document.querySelector('.save-btn').disabled = false;
    document.querySelector('.save-btn').innerHTML = '<span>💾</span> Guardar registro';
    confirmacion.innerHTML = '';
  }, 3000);
}

// =======================
    // RESPIRACIÓN GUIADA ANIMADA
    // =======================
    const divResp = document.getElementById('respiracion');
    if (divResp) {
      divResp.innerHTML = `
        <h3>Ejercicio de respiración guiada</h3>
        <p>Duración: 2 minutos • Patrón: 4-4-4-4 (Inhalá-Sostené-Exhalá-Pausa)</p>
        <div class="breathing-container">
          <div class="breathing-circle" id="breathing-circle"></div>
          <div class="breathing-text" id="breathing-text">🌸</div>
        </div>
        <button id="breathing-btn" onclick="iniciarRespiracion()">Iniciar respiración</button>
        <p id="guia-respiracion"></p>
        <div id="breathing-progress" style="display: none;">
          <div class="progress-bar">
            <div class="progress-fill" id="breathing-progress-fill"></div>
          </div>
          <p id="breathing-counter"></p>
        </div>
      `;
    }

    let respiracionActiva = false;
    let respiracionInterval;
    let respiracionTimeout;

    function iniciarRespiracion() {
      if (respiracionActiva) {
        detenerRespiracion();
        return;
      }

      respiracionActiva = true;
      const btn = document.getElementById('breathing-btn');
      const circle = document.getElementById('breathing-circle');
      const text = document.getElementById('breathing-text');
      const guia = document.getElementById('guia-respiracion');
      const progress = document.getElementById('breathing-progress');
      const progressFill = document.getElementById('breathing-progress-fill');
      const counter = document.getElementById('breathing-counter');

      btn.textContent = 'Detener';
      btn.style.background = '#ff4c4c';
      progress.style.display = 'block';

      let ciclo = 0;
      const totalCiclos = 8; // 2 minutos aproximadamente
      let fase = 0; // 0: inhalar, 1: sostener, 2: exhalar, 3: pausa
      const fases = [
        { nombre: 'Inhalá profundamente...', clase: 'inhale', emoji: '🌬️' },
        { nombre: 'Sostené el aire...', clase: 'hold', emoji: '⏸️' },
        { nombre: 'Exhalá lentamente...', clase: 'exhale', emoji: '💨' },
        { nombre: 'Pausa y relájate...', clase: 'pause', emoji: '🌸' }
      ];

      function ejecutarFase() {
        if (!respiracionActiva) return;

        const faseActual = fases[fase];
        guia.textContent = faseActual.nombre;
        text.textContent = faseActual.emoji;

        // Remover clases anteriores
        circle.classList.remove('inhale', 'exhale', 'hold', 'pause');
        
        // Aplicar animación según la fase
        if (fase === 0) { // Inhalar
          circle.classList.add('inhale');
        } else if (fase === 2) { // Exhalar
          circle.classList.add('exhale');
        }

        // Actualizar progreso
        const progresoTotal = ((ciclo * 4 + fase + 1) / (totalCiclos * 4)) * 100;
        progressFill.style.width = progresoTotal + '%';
        counter.textContent = `Ciclo ${ciclo + 1} de ${totalCiclos}`;

        fase++;
        if (fase >= 4) {
          fase = 0;
          ciclo++;
        }

        if (ciclo >= totalCiclos) {
          finalizarRespiracion();
        } else {
          respiracionTimeout = setTimeout(ejecutarFase, 4000);
        }
      }

      // Iniciar el ejercicio
      ejecutarFase();
    }

    function detenerRespiracion() {
      respiracionActiva = false;
      clearTimeout(respiracionTimeout);
      
      const btn = document.getElementById('breathing-btn');
      const circle = document.getElementById('breathing-circle');
      const text = document.getElementById('breathing-text');
      const guia = document.getElementById('guia-respiracion');
      const progress = document.getElementById('breathing-progress');

      btn.textContent = 'Iniciar respiración';
      btn.style.background = '';
      circle.classList.remove('inhale', 'exhale', 'hold', 'pause');
      text.textContent = '🌸';
      guia.textContent = '';
      progress.style.display = 'none';
    }

    function finalizarRespiracion() {
      respiracionActiva = false;
      const btn = document.getElementById('breathing-btn');
      const circle = document.getElementById('breathing-circle');
      const text = document.getElementById('breathing-text');
      const guia = document.getElementById('guia-respiracion');

      btn.textContent = 'Iniciar respiración';
      btn.style.background = '';
      circle.classList.remove('inhale', 'exhale', 'hold', 'pause');
      text.textContent = '✨';
      guia.innerHTML = '<strong>¡Ejercicio completado! ¿Te sientes más relajado/a?</strong>';
      
      showNotification("Ejercicio de respiración completado 💨✨");
      
      // Reset después de 5 segundos
      setTimeout(() => {
        text.textContent = '🌸';
        guia.textContent = '';
        document.getElementById('breathing-progress').style.display = 'none';
      }, 5000);
    }

// =======================
// YOGA Y SONIDOS
// =======================
const yoga = document.getElementById('yoga-sonidos');
if (yoga) {
  yoga.innerHTML = `
    <h3>Sonidos relajantes</h3>
    <button onclick="reproducirSonido('🌧️ Lluvia')">Lluvia</button>
    <button onclick="reproducirSonido('🌊 Mar')">Mar</button>
    <button onclick="reproducirSonido('🌲 Bosque')">Bosque</button>
    <button onclick="reproducirSonido('🎵 Instrumental')">Instrumental</button>
    <p id="sonido-actual"></p>
  `;
}

function reproducirSonido(nombre) {
  document.getElementById('sonido-actual').textContent = `🔊 Reproduciendo: ${nombre} (simulado)`;
  showNotification(`Reproduciendo ${nombre}`);
}

// =======================
// AYUDA PARA TERCEROS
// =======================
const ayuda = document.getElementById('ayuda-terceros');
if (ayuda) {
  ayuda.innerHTML = `
    <h3>Cómo ayudar a otra persona</h3>
    <ul>
      <li>Escuchá sin interrumpir</li>
      <li>Validá sus emociones</li>
      <li>Ofrecé tu apoyo sin forzar</li>
      <li>Sugerí ayuda profesional si es necesario</li>
    </ul>
  `;
}

// =======================
// MAPA DE AYUDA (simulado)
// =======================
const mapa = document.getElementById('mapa-ayuda');
if (mapa) {
  mapa.innerHTML = `
    <h3>Mapa de ayuda profesional</h3>
    <p>🔍 Ingresá tu ciudad (simulado)</p>
    <input id="ciudad" placeholder="Ej: Buenos Aires" />
    <button onclick="buscarProfesionales()">Buscar</button>
    <div id="resultados-mapa"></div>
  `;
}

function buscarProfesionales() {
  const ciudad = document.getElementById('ciudad').value;
  document.getElementById('resultados-mapa').innerHTML = `
    <p>📍 Resultados en <strong>${ciudad}</strong>:</p>
    <ul>
      <li>Dra. Ana Ruiz - Psicóloga (Zona Centro)</li>
      <li>Lic. Marcos Pérez - Psiquiatra (Zona Norte)</li>
    </ul>
  `;
  showNotification("Resultados simulados cargados");
}