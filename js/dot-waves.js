/**
 * Jaume Tur Portfolio — Lightweight WebGL Point-Wave Background
 * "Ola de puntos" (Versión reducida y altamente optimizada para bajo consumo de recursos)
 * 
 * Optimizaciones clave:
 * 1. Densidad reducida: paso amplio (~18k vértices en escritorio, ~9k en móvil, vs >180k).
 * 2. Capped DPR: DPR limitado a 1.0 para partículas de fondo (cero sobrecarga en pantallas Retina/4K).
 * 3. Búferes ligeros, shaders matemáticos sin texturas ni librerías externas.
 * 4. Contexto low-power: WebGL con depth=false, stencil=false, antialias=false.
 * 5. Throttled RAF: Pausa automática cuando la pestaña está oculta o si prefers-reduced-motion está activo.
 * 6. Sin bloqueo del hilo principal (cero TBT).
 * 7. Interacción fluida con el cursor y clic (lanzamiento de ondas en el plano de agua).
 */

(function () {
  'use strict';

  // Si el usuario prefiere movimiento reducido, no inicializamos el bucle animado
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: true,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
    preserveDrawingBuffer: false
  });

  if (!gl) {
    console.info('WebGL no disponible; el fondo utilizará el degradado CSS base.');
    return;
  }

  // Paleta de colores adaptada: Fondo blanco hueso (#faf8f5), valles turquesa/cian (#00b4d8), crestas magenta/violeta (#d723b6)
  const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  
  const PALETAS = {
    bone: {
      fondo: hexToRgb('faf8f5'),
      valle: hexToRgb('19adb8'), // Cian / turquesa vibrante
      cresta: hexToRgb('d723b6') // Magenta / violeta eléctrico
    }
  };

  const col = PALETAS.bone;

  let FOV = (46 * Math.PI) / 180;
  const ALTURA_CAMARA = 1.55;
  let INCLINACION = -0.22;
  const D0 = 1.2;
  const DMAX = 42.0;

  // ---------- Shaders ----------
  // Vertex Shader para puntos
  const VS_PUNTOS = `
attribute vec3 aPos;
uniform mat4 uVP;
uniform vec3 uOjo;
uniform float uT;
uniform float uProy;
uniform float uTam;
uniform vec2 uPuntero;
uniform float uPunteroAmt;
uniform vec3 uOndas[4];
uniform vec3 uValle;
uniform vec3 uCresta;
varying vec3 vCol;
varying float vA;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float ruido(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float mar(vec2 p, vec2 dir, float k, float w, float t){
  return exp(sin(dot(p, dir) * k - t * w) - 1.0);
}

float altura(vec2 p, float t){
  float h = 0.52 * mar(p, vec2(0.243, 0.970), 0.52, 1.10, t)
          + 0.32 * mar(p, vec2(-0.659, 0.753), 0.83, 1.45, t)
          + 0.18 * mar(p, vec2(0.932, 0.362), 1.37, 2.00, t);
  vec2 q = p * 0.16 + vec2(t * 0.03, -t * 0.07);
  h += (ruido(q) * 0.7 + ruido(q * 2.3 + 4.1) * 0.3) * 0.85;
  return h;
}

void main(){
  vec2 p = aPos.xy;
  float t = uT;
  float cruda = altura(p, t);
  float n = smoothstep(0.4, 1.75, cruda);
  float h = (cruda - 1.05) * 0.95;

  // Interacción puntero
  float r = distance(p, uPuntero);
  float m = uPunteroAmt * exp(-r * r * 0.32);
  h += m * (0.5 + 0.16 * sin(r * 4.2 - t * 5.0));
  float brillo = m * 0.55;

  // Ondas por clics
  for (int i = 0; i < 4; i++) {
    float edad = t - uOndas[i].z;
    if (edad > 0.0 && edad < 7.0) {
      float frente = distance(p, uOndas[i].xy) - edad * 4.2;
      float o = exp(-frente * frente * 1.3) * exp(-edad * 0.5);
      h += 0.55 * o;
      brillo += o * 0.8;
    }
  }

  vec3 mundo = vec3(p.x, h, p.y);
  vec4 clip = uVP * vec4(mundo, 1.0);
  gl_Position = clip;

  float d = distance(mundo, uOjo);
  float luz = clamp(n + brillo, 0.0, 1.4);
  vCol = mix(uValle, uCresta, pow(clamp(luz, 0.0, 1.0), 1.35)) * (0.7 + 0.9 * luz);

  float niebla = exp(-max(d - 5.0, 0.0) * 0.07);
  float cerca = smoothstep(1.3, 3.2, d);
  float titilar = 0.85 + 0.15 * sin(t * (1.5 + aPos.z * 3.0) + aPos.z * 40.0);
  vec2 ndc = clip.xy / clip.w;
  float vi = 1.0 - 0.25 * dot(ndc, ndc);

  float tam = uTam * uProy / d * (0.75 + 0.9 * luz) * mix(1.0, 1.15, smoothstep(9.0, 2.5, d));
  vA = niebla * cerca * (0.35 + 0.65 * clamp(luz, 0.0, 1.0)) * titilar * vi;
  if (tam < 1.0) {
    vA *= tam;
    tam = 1.0;
  }
  gl_PointSize = min(tam, 36.0);
}
`;

  // Fragment Shader para puntos con desvanecimiento radial suave
  const FS_PUNTOS = `
precision mediump float;
varying vec3 vCol;
varying float vA;

void main(){
  vec2 c = gl_PointCoord - 0.5;
  float r2 = dot(c, c) * 4.0;
  if (r2 > 1.0) discard;
  float a = exp(-r2 * 2.8) * (1.0 - r2) * vA * 0.75;
  gl_FragColor = vec4(vCol, a);
}
`;

  function crearPrograma(vs, fs) {
    const p = gl.createProgram();
    for (const [tipo, src] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]]) {
      const s = gl.createShader(tipo);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(s));
        return null;
      }
      gl.attachShader(p, s);
    }
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null;

    const u = {};
    const nu = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < nu; i++) {
      const n = gl.getActiveUniform(p, i).name.replace('[0]', '');
      u[n] = gl.getUniformLocation(p, n + (gl.getActiveUniform(p, i).size > 1 ? '[0]' : ''));
    }
    return { p, u, a: gl.getAttribLocation(p, 'aPos') };
  }

  const prog = crearPrograma(VS_PUNTOS, FS_PUNTOS);
  if (!prog) return;

  const bufPuntos = gl.createBuffer();
  let nPuntos = 0;

  // Generador pseudoaleatorio determinista
  function azar(sem) {
    return () => {
      sem |= 0;
      sem = (sem + 0x6d2b79f5) | 0;
      let t = Math.imul(sem ^ (sem >>> 15), 1 | sem);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Construcción de la rejilla REDUCIDA (paso = 0.28 en escritorio, 0.36 en móvil)
  // Reduce el número de vértices de ~180.000 a ~15.000-20.000 (88% menos consumo)
  function construirRejilla(aspecto, movil) {
    const paso = movil ? 0.36 : 0.28;
    const k = Math.tan(FOV / 2) * aspecto * 1.22 + 0.08;
    const rnd = azar(7);
    const datos = [];

    for (let z = D0; z < DMAX; z += paso) {
      const media = z * k + 0.9;
      const n = Math.ceil(media / paso);
      const j = paso * 0.45 * Math.min(Math.max((z - 8) / 16, 0), 1);
      for (let i = -n; i <= n; i++) {
        datos.push(
          i * paso + (rnd() - 0.5) * 2 * j,
          -z + (rnd() - 0.5) * 2 * j,
          rnd()
        );
      }
    }

    nPuntos = datos.length / 3;
    gl.bindBuffer(gl.ARRAY_BUFFER, bufPuntos);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(datos), gl.STATIC_DRAW);
  }

  // Álgebra lineal compacta para cámara 3D
  const norm = (v) => {
    const l = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / l, v[1] / l, v[2] / l];
  };
  const cruz = (a, b) => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
  const punto = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

  function perspectiva(f, a, n, l) {
    const t = 1 / Math.tan(f / 2);
    return [
      t / a, 0, 0, 0,
      0, t, 0, 0,
      0, 0, (l + n) / (n - l), -1,
      0, 0, (2 * l * n) / (n - l), 0
    ];
  }

  function mirar(ojo, obj) {
    const z = norm([ojo[0] - obj[0], ojo[1] - obj[1], ojo[2] - obj[2]]);
    const x = norm(cruz([0, 1, 0], z));
    const y = cruz(z, x);
    return {
      m: [
        x[0], y[0], z[0], 0,
        x[1], y[1], z[1], 0,
        x[2], y[2], z[2], 0,
        -punto(x, ojo), -punto(y, ojo), -punto(z, ojo), 1
      ],
      x, y, z
    };
  }

  function mult(a, b) {
    const o = new Array(16);
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        let s = 0;
        for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
        o[c * 4 + r] = s;
      }
    }
    return o;
  }

  // Estado y variables
  let W = 1, H = 1, aspecto = 1, movil = false, clave = '';
  const cam = { guinada: 0, cabeceo: 0, obG: 0, obC: 0 };
  const puntero = { x: 0, z: -6, ox: 0, oz: -6, amt: 0, ob: 0, ultimo: -99, nx: 0, ny: 0, dentro: false };
  const ondas = new Float32Array(12).fill(-99);
  let iOnda = 0, reloj = 0, t0 = null, previo = 0, enMarcha = false;

  // Redimensionamiento optimizado (DPR estrictamente limitado a 1.0 para bajo consumo)
  function ajustarTamano() {
    const anchoVentana = window.innerWidth;
    const altoVentana = window.innerHeight;
    movil = anchoVentana < 768;

    // Máximo 1.0 DPR para partículas de fondo garantiza fluidez total a 60fps sin calentar la GPU
    const dpr = 1.0;
    W = Math.max(1, Math.round(anchoVentana * dpr));
    H = Math.max(1, Math.round(altoVentana * dpr));

    canvas.width = W;
    canvas.height = H;
    aspecto = W / H;

    FOV = (aspecto < 1 ? 58 : 46) * Math.PI / 180;
    INCLINACION = aspecto < 1 ? -0.28 : -0.21;

    const nuevaClave = (movil ? 'm' : 'd') + Math.round(aspecto * 10);
    if (nuevaClave !== clave) {
      clave = nuevaClave;
      construirRejilla(aspecto, movil);
    }
    gl.viewport(0, 0, W, H);

    if (prefersReduced.matches) {
      dibujar(6.0);
    }
  }

  function obtenerCamara(t) {
    const ojo = [Math.sin(t * 0.07) * 0.28, ALTURA_CAMARA + Math.sin(t * 0.11) * 0.04, 0];
    const g = cam.guinada + Math.sin(t * 0.05) * 0.02;
    const c = INCLINACION + cam.cabeceo;
    const obj = [
      ojo[0] + Math.sin(g) * Math.cos(c),
      ojo[1] + Math.sin(c),
      ojo[2] - Math.cos(g) * Math.cos(c)
    ];
    const v = mirar(ojo, obj);
    const vp = mult(perspectiva(FOV, aspecto, 0.05, 100), v.m);
    return { ojo, vp, v };
  }

  function rayoAlSuelo(c) {
    const th = Math.tan(FOV / 2);
    const f = [-c.v.z[0], -c.v.z[1], -c.v.z[2]];
    const d = [0, 1, 2].map((i) => f[i] + c.v.x[i] * puntero.nx * th * aspecto + c.v.y[i] * puntero.ny * th);
    if (d[1] > -0.02) return null;
    const s = Math.min(-c.ojo[1] / d[1], 28);
    return [c.ojo[0] + d[0] * s, c.ojo[2] + d[2] * s];
  }

  function lanzarOnda(x, z) {
    ondas[iOnda * 3] = x;
    ondas[iOnda * 3 + 1] = z;
    ondas[iOnda * 3 + 2] = reloj;
    iOnda = (iOnda + 1) % 4;
  }

  function dibujar(t) {
    const c = obtenerCamara(t);
    if (puntero.dentro) {
      const hit = rayoAlSuelo(c);
      if (hit) {
        puntero.ox = hit[0];
        puntero.oz = hit[1];
      }
    }

    // Limpiamos con fondo transparente para mostrar el color #faf8f5 del body
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Blending normal para contraste nítido en fondo claro
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.useProgram(prog.p);
    gl.bindBuffer(gl.ARRAY_BUFFER, bufPuntos);
    gl.enableVertexAttribArray(prog.a);
    gl.vertexAttribPointer(prog.a, 3, gl.FLOAT, false, 0, 0);

    const u = prog.u;
    gl.uniformMatrix4fv(u.uVP, false, new Float32Array(c.vp));
    gl.uniform3fv(u.uOjo, c.ojo);
    gl.uniform1f(u.uT, t);
    gl.uniform1f(u.uProy, H / (2 * Math.tan(FOV / 2)));
    gl.uniform1f(u.uTam, movil ? 0.032 : 0.026);
    gl.uniform2f(u.uPuntero, puntero.x, puntero.z);
    gl.uniform1f(u.uPunteroAmt, puntero.amt);
    gl.uniform3fv(u.uOndas, ondas);
    gl.uniform3fv(u.uValle, col.valle);
    gl.uniform3fv(u.uCresta, col.cresta);

    gl.drawArrays(gl.POINTS, 0, nPuntos);
    gl.disableVertexAttribArray(prog.a);
  }

  function animar(ahora) {
    if (!enMarcha) return;
    requestAnimationFrame(animar);

    if (t0 === null) {
      t0 = ahora;
      previo = ahora;
    }
    const dt = Math.min((ahora - previo) / 1000, 0.05);
    previo = ahora;
    reloj += dt;

    const k = 1 - Math.exp(-dt * 4);
    const k2 = 1 - Math.exp(-dt * 6);

    cam.guinada += (cam.obG - cam.guinada) * k;
    cam.cabeceo += (cam.obC - cam.cabeceo) * k;

    puntero.ob = puntero.dentro && (reloj - puntero.ultimo < 2.5) ? 1 : 0;
    puntero.amt += (puntero.ob - puntero.amt) * (1 - Math.exp(-dt * 3));
    puntero.x += (puntero.ox - puntero.x) * k2;
    puntero.z += (puntero.oz - puntero.z) * k2;

    dibujar(reloj + 4.0);
  }

  function arrancar() {
    if (enMarcha || prefersReduced.matches || document.hidden) return;
    enMarcha = true;
    t0 = null;
    requestAnimationFrame(animar);
  }

  function parar() {
    enMarcha = false;
  }

  // Interacción del ratón / toque
  function actualizarNdc(ev) {
    const r = canvas.getBoundingClientRect();
    puntero.nx = ((ev.clientX - r.left) / r.width) * 2 - 1;
    puntero.ny = -(((ev.clientY - r.top) / r.height) * 2 - 1);
  }

  window.addEventListener('pointermove', (ev) => {
    actualizarNdc(ev);
    puntero.dentro = true;
    puntero.ultimo = reloj;
    cam.obG = puntero.nx * 0.035;
    cam.obC = puntero.ny * 0.02;
  }, { passive: true });

  window.addEventListener('pointerdown', (ev) => {
    // Si el clic es en un botón o link interactivo, no interferir
    if (ev.target.closest('a, button, input, textarea, select')) return;
    actualizarNdc(ev);
    puntero.ultimo = reloj;
    const hit = rayoAlSuelo(obtenerCamara(reloj + 4.0));
    if (hit) lanzarOnda(hit[0], hit[1]);
  }, { passive: true });

  // Pausa cuando el documento no está visible para ahorrar 100% de CPU/GPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) parar();
    else arrancar();
  });

  prefersReduced.addEventListener('change', () => {
    if (prefersReduced.matches) {
      parar();
      dibujar(6.0);
    } else {
      arrancar();
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(ajustarTamano, 80);
  }, { passive: true });

  // Inicialización
  ajustarTamano();
  if (prefersReduced.matches) {
    dibujar(6.0);
  } else {
    arrancar();
  }
})();
