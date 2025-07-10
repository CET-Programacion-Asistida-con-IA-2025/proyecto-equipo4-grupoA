// ======================
// INICIALIZACIÓN GENERAL
// ======================
document.addEventListener('DOMContentLoaded', () => {
  smoothScroll();
  setupContactForm();
});
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('close-menu');
  const sideNav = document.getElementById('side-nav');

  menuBtn.addEventListener('click', () => {
    sideNav.classList.add('show');
  });

  closeBtn.addEventListener('click', () => {
    sideNav.classList.remove('show');
  });

  // Para cerrar el menú al hacer clic en un enlace
  document.querySelectorAll('.side-nav a').forEach(link => {
    link.addEventListener('click', () => {
      sideNav.classList.remove('show');
    });
  });
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
// TEST EMOCIONAL NUEVO COMPLETO
// =======================

const preguntas = [
  { pregunta: "¿cómo describirías tu nivel de energía?", opciones: ["A. Alta y estable", "B. Baja y sin motivación", "C. Agitada o nerviosa", "D. Cambiante, como una montaña rusa", "E. Cargada, con ganas de explotar"] },
  { pregunta: "¿Cómo te sientes físicamente?", opciones: ["A. Ligero/a, relajado/a", "B. Cansado/a, sin fuerzas", "C. Tensión en el pecho o estómago", "D. Mareado/a o con presión en la cabeza", "E. Calor en la cara, puños apretados"] },
  { pregunta: "¿Qué tan fácil es concentrarte hoy?", opciones: ["A. Bastante fácil", "B. Difícil, no tengo energía mental", "C. Estoy distraído/a por preocupaciones", "D. No logro enfocarme por altibajos emocionales", "E. Me distraigo pensando en lo que me molesta"] },
  { pregunta: "¿Cómo está tu diálogo interno (pensamientos)?", opciones: ["A. Positivo o neutro", "B. Me siento útil o triste", "C. Me preocupo por lo que puede pasar", "D. Me siento confundido/a o inestable", "E. Me critico o pienso en lo que me irrita"] },
  { pregunta: "¿Tienes ganas de socializar o estar con alguien?", opciones: ["A. Sí, con gusto", "B. No, quiero estar solo/a", "C. No estoy seguro/a, me pone ansioso/a", "D. A ratos quiero, a ratos no", "E. No, porque todo me molesta"] },
  { pregunta: "¿Qué te provocaría llorar ahora mismo?", opciones: ["A. Nada", "B. El vacío o soledad", "C. El miedo o sensación de no tener control", "D. Mi confusión interna", "E. La frustración o impotencia"] },
  { pregunta: "¿Tienes ganas de hacer cosas?", opciones: ["A. Sí, me siento motivado/a", "B. No, me cuesta mucho levantarme", "C. No sé por dónde empezar", "D. A ratos sí, a ratos no", "E. Sí, pero estoy irritable y todo me molesta"] },
  { pregunta: "¿Cómo reaccionas ante los demás hoy?", opciones: ["A. Con calma", "B. Me cuesta conectar", "C. Estoy muy a la defensiva", "D. Cambia según la persona", "E. Me irrita todo el mundo"] },
  { pregunta: "¿Qué palabra te describe mejor ahora mismo?", opciones: ["A. Tranquilo/a", "B. Triste", "C. Ansioso/a", "D. Confundido/a", "E. Enojado/a"] },
  { pregunta: "¿Cómo duermes últimamente?", opciones: ["A. Bien", "B. Duermo mucho o me cuesta levantarme", "C. Me cuesta dormir por pensar demasiado", "D. Me despierto seguido", "E. Me acuesto enojado/a o con tensión"] },
  { pregunta: "¿Qué te preocupa más ahora mismo?", opciones: ["A. Nada en especial", "B. Sentirme solo/a o sin sentido", "C. Que algo salga mal", "D. No entenderme emocionalmente", "E. Que alguien me falte el respeto"] },
  { pregunta: "¿Cómo manejas el estrés hoy?", opciones: ["A. Bien, con técnicas o calma", "B. Me encierro y me siento mal", "C. Me sobrecarga rápido", "D. Cambio de humor constantemente", "E. Reacciono con rabia o gritos"] },
  { pregunta: "¿Qué te haría sentir mejor ahora mismo?", opciones: ["A. Nada, ya me siento bien", "B. Un abrazo o alguien que me escuche", "C. Saber que todo estará bajo control", "D. Poder aclarar mis pensamientos", "E. Sacar la rabia o gritar"] },
  { pregunta: "¿Tu cuerpo te manda señales?", opciones: ["A. Me siento equilibrado/a", "B. Sí, estoy agotado/a", "C. Sí, tengo palpitaciones o tensión", "D. Sí, tengo náuseas o cambios físicos", "E. Sí, me arde el pecho o tengo dolor de cabeza"] },
  { pregunta: "¿Qué haces cuando algo sale mal?", opciones: ["A. Me adapto y busco soluciones", "B. Me encierro emocionalmente", "C. Me estreso y quiero evitarlo", "D. Me confundo o me bloqueo", "E. Me enojo rápidamente"] }
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
      `<button onclick="seleccionarRespuesta('${op[0]}')">${op}</button>`
    ).join('<br><br>')}
  `;
}

function seleccionarRespuesta(letra) {
  respuestas.push(letra);
  preguntaActual++;
  mostrarPregunta();
}

function mostrarResultado() {
  const div = document.getElementById('test-emocional');
  const conteo = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  respuestas.forEach(r => conteo[r]++);
  const maxLetra = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);

  const resultados = {
    A: "🟢 Tranquilidad / Bienestar\nEstás en un momento de estabilidad emocional. Puede que haya pequeños altibajos, pero tenés recursos internos para gestionarlos.",
    B: "🔵 Tristeza / Desánimo\nEstás atravesando una etapa de bajo estado de ánimo. Buscá apoyo emocional y permitite sentir sin juzgarte. El descanso, hablar con alguien o escribir lo que sentís puede ayudarte.",
    C: "🟠 Ansiedad / Miedo\nEstás sintiendo incertidumbre o sobrecarga mental. Tu cuerpo está en alerta. Intentá técnicas de respiración o meditación y enfocate en el presente.",
    D: "🟣 Confusión / Inestabilidad\nEstás experimentando muchas emociones al mismo tiempo. No es raro sentirse así. Un diario emocional o hablar con un profesional puede ayudarte a ordenar tus pensamientos.",
    E: "🔴 Ira / Frustración\nEstás acumulando molestia o enojo, tal vez sin haberlo notado. Buscá formas sanas de liberar tensión: ejercicio físico, escribir, poner límites o expresar lo que sentís con respeto."
  };

  div.innerHTML = `
    <h3>Resultado del Test Emocional</h3>
    <p style="white-space: pre-line">${resultados[maxLetra]}</p>
    <button onclick="reiniciarTest()">Repetir test</button>
  `;
}

function reiniciarTest() {
  respuestas = [];
  preguntaActual = 0;
  mostrarPregunta();
}

// Iniciar test
mostrarPregunta();


// =======================
    // CALENDARIO EMOCIONAL MEJORADO
    // =======================
    const calendario = document.getElementById('calendario-emocional');
    const hoy = new Date().toISOString().slice(0, 10);
    let emocionSeleccionada = '';
    let esDiaMenstrual = false;

    if (calendario) {
      calendario.innerHTML = `
        <h3>Registrar emoción del día</h3>
        <p>Fecha: ${hoy}</p>
        
        <!-- Sección de menstruación -->
        <div class="menstrual-section">
          <div class="menstrual-toggle">
            <span>🌸 ¿Es día de menstruación?</span>
            <label class="toggle-switch">
              <input type="checkbox" id="menstrual-toggle" onchange="toggleMenstrualDay(this)">
              <span class="slider"></span>
            </label>
          </div>
          <div class="menstrual-info" id="menstrual-info">
            <div class="cycle-input">
              <label for="cycle-day">Día del ciclo:</label>
              <input type="number" id="cycle-day" min="1" max="35" placeholder="Ej: 3">
            </div>
            <div class="cycle-input">
              <label for="symptoms">Síntomas (opcional):</label>
              <input type="text" id="symptoms" placeholder="Ej: cólicos, dolor de cabeza">
            </div>
          </div>
        </div>

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

    function toggleMenstrualDay(checkbox) {
      esDiaMenstrual = checkbox.checked;
      const menstrualInfo = document.getElementById('menstrual-info');
      if (esDiaMenstrual) {
        menstrualInfo.classList.add('active');
      } else {
        menstrualInfo.classList.remove('active');
      }
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
      const cycleDay = document.getElementById('cycle-day').value;
      const symptoms = document.getElementById('symptoms').value;
      
      const registro = {
        emocion: emocionSeleccionada,
        nota: nota,
        fecha: hoy,
        menstruacion: esDiaMenstrual,
        diaCiclo: esDiaMenstrual ? cycleDay : null,
        sintomas: esDiaMenstrual ? symptoms : null
      };
      
      // Aquí normalmente guardarías en una base de datos
      console.log('Registro guardado:', registro);
      
      // Mostrar confirmación
      const confirmacion = document.getElementById('confirmacion-registro');
      let mensajeConfirmacion = `
        <div class="success-message">
          <span>✅</span>
          <p>¡Registro guardado exitosamente!</p>
          <small>Emoción: ${emocionSeleccionada}</small>
      `;
      
      if (esDiaMenstrual) {
        mensajeConfirmacion += `<small><br>🌸 Día de menstruación registrado</small>`;
      }
      
      mensajeConfirmacion += `</div>`;
      confirmacion.innerHTML = mensajeConfirmacion;
      
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

// // =======================
// YOGA Y SONIDOS MEJORADOS
// =======================
const yoga = document.getElementById('yoga-sonidos');
let sonidoActual = null;
let audioElements = {};

if (yoga) {
    yoga.innerHTML = `
        <h3>🎵 Sonidos relajantes</h3>
        <p>Selecciona un sonido para relajarte y concentrarte</p>
        <div class="sound-controls">
            <button class="sound-btn" onclick="toggleSonido('lluvia')">
                <span class="sound-icon">🌧️</span>
                <span class="sound-name">Lluvia</span>
            </button>
            <button class="sound-btn" onclick="toggleSonido('mar')">
                <span class="sound-icon">🌊</span>
                <span class="sound-name">Mar</span>
            </button>
            <button class="sound-btn" onclick="toggleSonido('bosque')">
                <span class="sound-icon">🌲</span>
                <span class="sound-name">Bosque</span>
            </button>
            <button class="sound-btn" onclick="toggleSonido('instrumental')">
                <span class="sound-icon">🎼</span>
                <span class="sound-name">Instrumental</span>
            </button>
        </div>
        <div class="sound-status" id="sound-status">
            <span>🔇</span> Selecciona un sonido para comenzar
        </div>
    `;
    
    // Inicializar elementos de audio
    inicializarAudios();
}

function inicializarAudios() {
    const sonidos = {
        'lluvia': {
            nombre: '🌧️ Lluvia',
            // Simulamos con un tono generado
            frecuencia: 200,
            tipo: 'rain'
        },
        'mar': {
            nombre: '🌊 Mar',
            frecuencia: 150,
            tipo: 'ocean'
        },
        'bosque': {
            nombre: '🌲 Bosque',
            frecuencia: 300,
            tipo: 'forest'
        },
        'instrumental': {
            nombre: '🎼 Instrumental',
            frecuencia: 440,
            tipo: 'music'
        }
    };
    
    // Crear contexto de audio para sonidos simples
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const AudioContextClass = AudioContext || webkitAudioContext;
        const audioContext = new AudioContextClass();
        
        Object.keys(sonidos).forEach(key => {
            audioElements[key] = {
                context: audioContext,
                oscillator: null,
                gainNode: null,
                info: sonidos[key]
            };
        });
    }
}

function toggleSonido(tipo) {
    const statusDiv = document.getElementById('sound-status');
    const botones = document.querySelectorAll('.sound-btn');
    const botonActual = document.querySelector(`[onclick="toggleSonido('${tipo}')"]`);
    
    // Detener sonido actual si existe
    if (sonidoActual && sonidoActual !== tipo) {
        detenerSonido(sonidoActual);
    }
    
    if (sonidoActual === tipo) {
        // Detener sonido actual
        detenerSonido(tipo);
        sonidoActual = null;
        statusDiv.innerHTML = '<span>🔇</span> Selecciona un sonido para comenzar';
        
        // Remover clase playing de todos los botones
        botones.forEach(btn => btn.classList.remove('playing'));
    } else {
        // Reproducir nuevo sonido
        reproducirSonido(tipo);
        sonidoActual = tipo;
        statusDiv.innerHTML = `<span>🔊</span> Reproduciendo: ${audioElements[tipo].info.nombre}`;
        
        // Remover clase playing de todos los botones y agregar al actual
        botones.forEach(btn => btn.classList.remove('playing'));
        botonActual.classList.add('playing');
    }
}

function reproducirSonido(tipo) {
    if (!audioElements[tipo] || !audioElements[tipo].context) {
        // Fallback: mostrar mensaje simulado
        showNotification(`🎵 Reproduciendo ${tipo} (simulado)`);
        return;
    }
    
    const audio = audioElements[tipo];
    const ctx = audio.context;
    
    // Crear oscillador y gain
    audio.oscillator = ctx.createOscillator();
    audio.gainNode = ctx.createGain();
    
    // Configurar según el tipo de sonido
    switch (tipo) {
        case 'lluvia':
            audio.oscillator.type = 'white';
            audio.oscillator.frequency.setValueAtTime(200, ctx.currentTime);
            audio.gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            break;
        case 'mar':
            audio.oscillator.type = 'sine';
            audio.oscillator.frequency.setValueAtTime(150, ctx.currentTime);
            audio.gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
            break;
        case 'bosque':
            audio.oscillator.type = 'triangle';
            audio.oscillator.frequency.setValueAtTime(300, ctx.currentTime);
            audio.gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
            break;
        case 'instrumental':
            audio.oscillator.type = 'sine';
            audio.oscillator.frequency.setValueAtTime(440, ctx.currentTime);
            audio.gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
            break;
    }
    
    // Conectar nodos
    audio.oscillator.connect(audio.gainNode);
    audio.gainNode.connect(ctx.destination);
    
    // Iniciar sonido
    audio.oscillator.start();
}

function detenerSonido(tipo) {
    if (audioElements[tipo] && audioElements[tipo].oscillator) {
        audioElements[tipo].oscillator.stop();
        audioElements[tipo].oscillator = null;
        audioElements[tipo].gainNode = null;
    }
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
<<<<<<< HEAD
}// =======================
// CHECKLIST DE HÁBITOS DIARIOS
// =======================
const checklist = document.getElementById('checklist-habitos');
let habitosData = {
    horasSueno: 8,
    litrosAgua: 2,
    horasRedes: 2,
    cosasNuevas: [],
    cosasNoHice: [],
    completado: false
};

if (checklist) {
    checklist.innerHTML = `
        <h3>📝 Checklist de hábitos diarios</h3>
        <p>Registra tus hábitos para mantener un estilo de vida saludable</p>
        
        <div class="habit-item" id="habit-sueno">
            <div class="habit-header">
                <div class="habit-checkbox" onclick="toggleHabit('sueno')"></div>
                <div class="habit-title">💤 Horas de sueño</div>
            </div>
            <div class="habit-controls">
                <span class="habit-label">Dormí:</span>
                <input type="number" class="habit-input" id="input-sueno" value="8" min="0" max="24" onchange="updateHabit('sueno', this.value)">
                <span class="habit-label">horas</span>
            </div>
        </div>
        
        <div class="habit-item" id="habit-agua">
            <div class="habit-header">
                <div class="habit-checkbox" onclick="toggleHabit('agua')"></div>
                <div class="habit-title">💧 Hidratación</div>
            </div>
            <div class="habit-controls">
                <span class="habit-label">Tomé:</span>
                <div class="habit-slider">
                    <input type="range" id="slider-agua" min="0" max="5" step="0.5" value="2" onchange="updateHabit('agua', this.value)">
                </div>
                <div class="habit-value" id="value-agua">2L</div>
            </div>
        </div>
        
        <div class="habit-item" id="habit-redes">
            <div class="habit-header">
                <div class="habit-checkbox" onclick="toggleHabit('redes')"></div>
                <div class="habit-title">📱 Tiempo en redes sociales</div>
            </div>
            <div class="habit-controls">
                <span class="habit-label">Estuve:</span>
                <div class="habit-slider">
                    <input type="range" id="slider-redes" min="0" max="12" step="0.5" value="2" onchange="updateHabit('redes', this.value)">
                </div>
                <div class="habit-value" id="value-redes">2h</div>
            </div>
        </div>
        
        <div class="habit-item" id="habit-nuevas">
            <div class="habit-header">
                <div class="habit-checkbox" onclick="toggleHabit('nuevas')"></div>
                <div class="habit-title">✨ Cosas nuevas que hice</div>
            </div>
            <div class="habit-controls">
                <input type="text" class="habit-input" id="input-nuevas" placeholder="Ej: Leí un libro nuevo" style="width: 100%; margin-top: 1rem;">
                <button onclick="addNewThing()" style="margin-top: 0.5rem;">Agregar</button>
            </div>
            <div id="list-nuevas" class="habit-list"></div>
        </div>
        
        <div class="habit-item" id="habit-no-hice">
            <div class="habit-header">
                <div class="habit-checkbox" onclick="toggleHabit('no-hice')"></div>
                <div class="habit-title">❌ Cosas que no pude hacer</div>
            </div>
            <div class="habit-controls">
                <input type="text" class="habit-input" id="input-no-hice" placeholder="Ej: Hacer ejercicio" style="width: 100%; margin-top: 1rem;">
                <button onclick="addNotDoneThing()" style="margin-top: 0.5rem;">Agregar</button>
            </div>
            <div id="list-no-hice" class="habit-list"></div>
        </div>
        
        <div class="habits-summary" id="habits-summary">
            <div class="summary-title">📊 Resumen del día</div>
            <div class="summary-stats">
                <div class="stat-item">
                    <span class="stat-number" id="stat-sueno">8</span>
                    <span class="stat-label">horas dormidas</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="stat-agua">2</span>
                    <span class="stat-label">litros de agua</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="stat-redes">2</span>
                    <span class="stat-label">horas en redes</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="stat-nuevas">0</span>
                    <span class="stat-label">cosas nuevas</span>
                </div>
            </div>
        </div>
    `;
}

function toggleHabit(tipo) {
    const habitItem = document.getElementById(`habit-${tipo}`);
    const checkbox = habitItem.querySelector('.habit-checkbox');
    
    if (checkbox.classList.contains('checked')) {
        checkbox.classList.remove('checked');
        checkbox.textContent = '';
        habitItem.classList.remove('completed');
    } else {
        checkbox.classList.add('checked');
        checkbox.textContent = '✓';
        habitItem.classList.add('completed');
    }
    
    updateSummary();
}

function updateHabit(tipo, valor) {
    habitosData[tipo === 'sueno' ? 'horasSueno' : tipo === 'agua' ? 'litrosAgua' : 'horasRedes'] = parseFloat(valor);
    
    if (tipo === 'agua') {
        document.getElementById('value-agua').textContent = valor + 'L';
        document.getElementById('stat-agua').textContent = valor;
    } else if (tipo === 'redes') {
        document.getElementById('value-redes').textContent = valor + 'h';
        document.getElementById('stat-redes').textContent = valor;
    } else if (tipo === 'sueno') {
        document.getElementById('stat-sueno').textContent = valor;
    }
    
    updateSummary();
}

function addNewThing() {
    const input = document.getElementById('input-nuevas');
    const list = document.getElementById('list-nuevas');
    
    if (input.value.trim()) {
        habitosData.cosasNuevas.push(input.value.trim());
        
        const item = document.createElement('div');
        item.className = 'habit-list-item';
        item.innerHTML = `
            <span>✨ ${input.value.trim()}</span>
            <button onclick="removeItem(this, 'nuevas')" style="margin-left: 1rem; padding: 0.2rem 0.5rem; font-size: 0.8rem;">❌</button>
        `;
        list.appendChild(item);
        
        input.value = '';
        document.getElementById('stat-nuevas').textContent = habitosData.cosasNuevas.length;
        updateSummary();
    }
}

function addNotDoneThing() {
    const input = document.getElementById('input-no-hice');
    const list = document.getElementById('list-no-hice');
    
    if (input.value.trim()) {
        habitosData.cosasNoHice.push(input.value.trim());
        
        const item = document.createElement('div');
        item.className = 'habit-list-item';
        item.innerHTML = `
            <span>❌ ${input.value.trim()}</span>
            <button onclick="removeItem(this, 'no-hice')" style="margin-left: 1rem; padding: 0.2rem 0.5rem; font-size: 0.8rem;">🗑️</button>
        `;
        list.appendChild(item);
        
        input.value = '';
        updateSummary();
    }
}

function removeItem(button, tipo) {
    const item = button.parentElement;
    const texto = item.querySelector('span').textContent.replace('✨ ', '').replace('❌ ', '');
    
    if (tipo === 'nuevas') {
        habitosData.cosasNuevas = habitosData.cosasNuevas.filter(cosa => cosa !== texto);
        document.getElementById('stat-nuevas').textContent = habitosData.cosasNuevas.length;
    } else {
        habitosData.cosasNoHice = habitosData.cosasNoHice.filter(cosa => cosa !== texto);
    }
    
    item.remove();
    updateSummary();
}

function updateSummary() {
    const completedHabits = document.querySelectorAll('.habit-checkbox.checked').length;
    const totalHabits = document.querySelectorAll('.habit-checkbox').length;
    
    if (completedHabits === totalHabits) {
        showNotification('¡Felicitaciones! Completaste todos los hábitos del día 🎉');
    }
}
=======
}
function iniciarCarrusel() {
  const imagenes = document.querySelectorAll('.carousel-image');
  let index = 0;

  setInterval(() => {
    imagenes[index].classList.remove('active');
    index = (index + 1) % imagenes.length;
    imagenes[index].classList.add('active');
  }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
  iniciarCarrusel();
});
>>>>>>> 5842b27b9023a4e3952da7df4a894d38f6a9c7a5
