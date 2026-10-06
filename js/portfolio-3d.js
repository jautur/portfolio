/**
 * Portfolio 3D Experience — Jaume Tur
 * Computer Science & Web Development Edition
 * 
 * Features:
 * 1. 3D Floating Web Browser & Code Tag < / > Hero Core with window controls and orbital nodes.
 * 2. Project Mini-Scenes:
 *    - Project 1 (Dashboard): 3D Terminal / Server Rack with animated metric telemetry bars & scanline.
 *    - Project 2 (Portal / AVISA): 3D Responsive Web Layout with interactive pointer cursor.
 *    - Project 3 (Integrations): 3D Git Branching Graph (Main + Feature branch) with CI/CD packet.
 * 3. Extreme performance: Low poly, DPR 1.0, zero CPU buffer uploads, IntersectionObserver sleep.
 * 4. Day (Israel Blue #0038b8) and Night (#000000 / #e5ff00) theme synchronization.
 */

(function () {
  'use strict';

  try {
    if (typeof THREE === 'undefined') return;

  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (!isWebGLAvailable()) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Exact Color Palettes
  const COLOR_PALETTES = {
    day: {
      bg: 0xf8faff,
      corePrimary: 0xf0f5ff,
      coreAccent: 0x0055d4,
      coreDeep: 0x0038b8,
      wireframe: 0x0038b8,
      ring1: 0x005ce6,
      ring2: 0x002787,
      particles: 0x0055d4,
      grid: 0x0038b8,
      lightAmbient: 0xffffff,
      lightMain: 0x0055d4,
      lightSecondary: 0x002787
    },
    night: {
      bg: 0x000000,
      corePrimary: 0x000000,
      coreAccent: 0xe5ff00,
      coreDeep: 0xe5ff00,
      wireframe: 0xe5ff00,
      ring1: 0xe5ff00,
      ring2: 0xe5ff00,
      particles: 0xe5ff00,
      grid: 0xe5ff00,
      lightAmbient: 0x181818,
      lightMain: 0xe5ff00,
      lightSecondary: 0xe5ff00
    }
  };

  function isNightMode() {
    return document.body.classList.contains('theme-night');
  }

  function getActivePalette() {
    return isNightMode() ? COLOR_PALETTES.night : COLOR_PALETTES.day;
  }

  let isTabVisible = !document.hidden;
  document.addEventListener('visibilitychange', function () {
    isTabVisible = !document.hidden;
  });

  /* ==========================================================================
     1. MAIN BACKGROUND 3D SCENE & WEB DEV HERO SCULPTURE
     ========================================================================== */
  const mainCanvas = document.getElementById('webgl-bg');
  if (!mainCanvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas: mainCanvas,
    antialias: false,
    alpha: true,
    powerPreference: 'low-power',
    precision: 'mediump'
  });

  renderer.setPixelRatio(1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.set(0, 0, 24);

  // Lighting
  const initialPalette = getActivePalette();
  const ambientLight = new THREE.AmbientLight(initialPalette.lightAmbient, isNightMode() ? 0.8 : 1.1);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(initialPalette.lightMain, isNightMode() ? 2.0 : 1.5);
  mainLight.position.set(10, 15, 12);
  scene.add(mainLight);

  const secondaryLight = new THREE.PointLight(initialPalette.lightSecondary, isNightMode() ? 2.0 : 1.2, 50);
  secondaryLight.position.set(-12, -8, 8);
  scene.add(secondaryLight);

  // --- Hero 3D Sculpture Group ---
  const heroGroup = new THREE.Group();
  scene.add(heroGroup);
  heroGroup.position.set(3.2, 0.8, 0);

  // 1. 3D Web Browser Window Wireframe
  const browserGeo = new THREE.BoxGeometry(4.4, 3.2, 0.8);
  const browserMat = new THREE.MeshBasicMaterial({
    color: initialPalette.wireframe,
    wireframe: true,
    transparent: true,
    opacity: isNightMode() ? 0.65 : 0.28
  });
  const browserMesh = new THREE.Mesh(browserGeo, browserMat);
  heroGroup.add(browserMesh);

  // Browser Window Top-Bar Header Line
  const headerLinePts = [
    new THREE.Vector3(-2.2, 1.05, 0.41),
    new THREE.Vector3(2.2, 1.05, 0.41)
  ];
  const headerLineGeo = new THREE.BufferGeometry().setFromPoints(headerLinePts);
  const headerLineMat = new THREE.LineBasicMaterial({
    color: initialPalette.wireframe,
    transparent: true,
    opacity: 0.5
  });
  const headerLine = new THREE.Line(headerLineGeo, headerLineMat);
  browserMesh.add(headerLine);

  // 3 Browser Window Dots (Close, Min, Max)
  const dotGeo = new THREE.SphereGeometry(0.08, 8, 8);
  const dot1 = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: isNightMode() ? 0xe5ff00 : 0xff5f56 }));
  dot1.position.set(-1.85, 1.25, 0.42);
  browserMesh.add(dot1);

  const dot2 = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: isNightMode() ? 0xe5ff00 : 0xffbd2e }));
  dot2.position.set(-1.6, 1.25, 0.42);
  browserMesh.add(dot2);

  const dot3 = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({ color: isNightMode() ? 0xe5ff00 : 0x27c93f }));
  dot3.position.set(-1.35, 1.25, 0.42);
  browserMesh.add(dot3);

  // 2. Glowing 3D Code Tag < / > inside Browser
  const codeGroup = new THREE.Group();
  heroGroup.add(codeGroup);

  // Left Bracket <
  const leftPts = [
    new THREE.Vector3(-0.5, 0.8, 0),
    new THREE.Vector3(-1.3, 0, 0),
    new THREE.Vector3(-0.5, -0.8, 0)
  ];
  const leftGeo = new THREE.BufferGeometry().setFromPoints(leftPts);
  const codeMat = new THREE.LineBasicMaterial({
    color: initialPalette.coreAccent,
    linewidth: 2,
    transparent: true,
    opacity: 0.95
  });
  const leftLine = new THREE.Line(leftGeo, codeMat);
  codeGroup.add(leftLine);

  // Slash /
  const slashPts = [
    new THREE.Vector3(-0.25, -1.05, 0),
    new THREE.Vector3(0.25, 1.05, 0)
  ];
  const slashGeo = new THREE.BufferGeometry().setFromPoints(slashPts);
  const slashMat = new THREE.LineBasicMaterial({
    color: initialPalette.ring1,
    linewidth: 2,
    transparent: true,
    opacity: 0.95
  });
  const slashLine = new THREE.Line(slashGeo, slashMat);
  codeGroup.add(slashLine);

  // Right Bracket >
  const rightPts = [
    new THREE.Vector3(0.5, 0.8, 0),
    new THREE.Vector3(1.3, 0, 0),
    new THREE.Vector3(0.5, -0.8, 0)
  ];
  const rightGeo = new THREE.BufferGeometry().setFromPoints(rightPts);
  const rightLine = new THREE.Line(rightGeo, codeMat);
  codeGroup.add(rightLine);

  // Inner Server Node Core (Solid faceted octahedron)
  const coreGeo = new THREE.OctahedronGeometry(0.7, 0);
  const coreMat = new THREE.MeshStandardMaterial({
    color: initialPalette.corePrimary,
    metalness: isNightMode() ? 0.9 : 0.2,
    roughness: 0.3,
    transparent: true,
    opacity: 0.9
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.position.set(0, 0, 0);
  codeGroup.add(coreMesh);

  // 3. Orbital Data & Network Rings
  const ring1Geo = new THREE.TorusGeometry(3.6, 0.035, 8, 48);
  const ring1Mat = new THREE.MeshBasicMaterial({
    color: initialPalette.ring1,
    transparent: true,
    opacity: isNightMode() ? 0.8 : 0.5
  });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 3;
  heroGroup.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(4.1, 0.03, 8, 48);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: initialPalette.ring2,
    transparent: true,
    opacity: isNightMode() ? 0.7 : 0.4
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.y = Math.PI / 2.4;
  heroGroup.add(ring2);

  // 4. Orbiting Server & Client Nodes
  const satellites = [];
  const satGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35); // Server cubes
  for (let i = 0; i < 4; i++) {
    const satMat = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? initialPalette.coreAccent : initialPalette.coreDeep,
      metalness: 0.3,
      roughness: 0.2
    });
    const sat = new THREE.Mesh(satGeo, satMat);
    const angle = (i / 4) * Math.PI * 2;
    const radius = 5.0;
    sat.position.set(Math.cos(angle) * radius, Math.sin(angle) * 1.2, Math.sin(angle) * radius);
    sat.userData = { angle, radius, speed: 0.01 + (i * 0.003) };
    heroGroup.add(sat);
    satellites.push(sat);
  }

  // --- Lightweight Particle Data Nebula (280 points) ---
  const particleCount = 280;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 55;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 35;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  function createParticleTexture() {
    const c = document.createElement('canvas');
    c.width = 32;
    c.height = 32;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.6)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(c);
  }

  const particleMat = new THREE.PointsMaterial({
    color: initialPalette.particles,
    size: 0.65,
    map: createParticleTexture(),
    transparent: true,
    opacity: isNightMode() ? 0.75 : 0.45,
    depthWrite: false,
    blending: isNightMode() ? THREE.AdditiveBlending : THREE.NormalBlending
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // --- Static Cyber Plane Grid ---
  const gridGeo = new THREE.PlaneGeometry(60, 50, 14, 14);
  gridGeo.rotateX(-Math.PI / 2);

  const gridMat = new THREE.MeshBasicMaterial({
    color: initialPalette.grid,
    wireframe: true,
    transparent: true,
    opacity: isNightMode() ? 0.22 : 0.12
  });

  const gridMesh = new THREE.Mesh(gridGeo, gridMat);
  gridMesh.position.set(0, -12, -4);
  scene.add(gridMesh);

  /* ==========================================================================
     2. MOUSE & SCROLL STATE
     ========================================================================== */
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let scrollProgress = 0;
  let targetScrollProgress = 0;

  window.addEventListener('pointermove', function (e) {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 1.5;
    mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 1.5;
  }, { passive: true });

  function updateScroll() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    targetScrollProgress = docHeight > 0 ? window.scrollY / docHeight : 0;
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  let isDraggingHero = false;
  let prevPointerX = 0;
  let prevPointerY = 0;
  let heroVelocityX = 0.003;
  let heroVelocityY = 0.004;

  window.addEventListener('pointerdown', function (e) {
    if (e.target.closest('a, button, .theme-toggle, input')) return;
    const heroSection = document.getElementById('sobre-mi');
    if (heroSection && heroSection.contains(e.target)) {
      isDraggingHero = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    }
  });

  window.addEventListener('pointermove', function (e) {
    if (isDraggingHero) {
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      heroVelocityX = deltaY * 0.004;
      heroVelocityY = deltaX * 0.004;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    }
  });

  window.addEventListener('pointerup', function () {
    isDraggingHero = false;
  });

  window.addEventListener('pointercancel', function () {
    isDraggingHero = false;
  });

  /* ==========================================================================
     3. DYNAMIC DAY / NIGHT THEME
     ========================================================================== */
  let currentThemeIsNight = isNightMode();

  function applyThemeToScene(isNight) {
    const p = isNight ? COLOR_PALETTES.night : COLOR_PALETTES.day;

    ambientLight.color.setHex(p.lightAmbient);
    ambientLight.intensity = isNight ? 0.8 : 1.1;

    mainLight.color.setHex(p.lightMain);
    mainLight.intensity = isNight ? 2.0 : 1.5;

    secondaryLight.color.setHex(p.lightSecondary);
    secondaryLight.intensity = isNight ? 2.0 : 1.2;

    browserMat.color.setHex(p.wireframe);
    headerLineMat.color.setHex(p.wireframe);
    codeMat.color.setHex(p.coreAccent);
    slashMat.color.setHex(p.ring1);
    coreMat.color.setHex(p.corePrimary);
    coreMat.metalness = isNight ? 0.9 : 0.2;

    ring1Mat.color.setHex(p.ring1);
    ring1Mat.opacity = isNight ? 0.8 : 0.5;

    ring2Mat.color.setHex(p.ring2);
    ring2Mat.opacity = isNight ? 0.7 : 0.4;

    satellites.forEach((sat, idx) => {
      sat.material.color.setHex(idx % 2 === 0 ? p.coreAccent : p.coreDeep);
    });

    particleMat.color.setHex(p.particles);
    particleMat.opacity = isNight ? 0.75 : 0.45;
    particleMat.blending = isNight ? THREE.AdditiveBlending : THREE.NormalBlending;

    gridMat.color.setHex(p.grid);
    gridMat.opacity = isNight ? 0.22 : 0.12;

    updateProjectCanvasesTheme(isNight);
  }

  const themeObserver = new MutationObserver(function () {
    const isNight = isNightMode();
    if (isNight !== currentThemeIsNight) {
      currentThemeIsNight = isNight;
      applyThemeToScene(isNight);
    }
  });
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  /* ==========================================================================
     4. COMPUTER SCIENCE & WEB DEV PROJECT MINI-SCENES
     ========================================================================== */
  const projectScenes = [];
  let areProjectsVisible = false;

  function initProjectVisuals() {
    const projectsSection = document.getElementById('proyectos');
    if (projectsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          areProjectsVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(projectsSection);
    }

    const visualCards = [
      { selector: '.visual-one', type: 'dashboard' },
      { selector: '.visual-two', type: 'portal' },
      { selector: '.visual-three', type: 'pipeline' }
    ];

    visualCards.forEach((config) => {
      const container = document.querySelector(config.selector);
      if (!container) return;

      container.innerHTML = '';
      const c = document.createElement('canvas');
      c.className = 'project-3d-canvas';
      c.setAttribute('aria-hidden', 'true');
      container.appendChild(c);

      const pRenderer = new THREE.WebGLRenderer({
        canvas: c,
        antialias: false,
        alpha: true,
        powerPreference: 'low-power'
      });
      pRenderer.setPixelRatio(1.0);

      const rect = container.getBoundingClientRect();
      const pWidth = rect.width || 300;
      const pHeight = rect.height || 160;
      pRenderer.setSize(pWidth, pHeight);

      const pScene = new THREE.Scene();
      const pCamera = new THREE.PerspectiveCamera(45, pWidth / pHeight, 0.1, 80);
      pCamera.position.set(0, 0, 7.5);

      const pPalette = getActivePalette();
      const pAmb = new THREE.AmbientLight(pPalette.lightAmbient, 1.2);
      pScene.add(pAmb);

      const pDir = new THREE.DirectionalLight(pPalette.lightMain, 1.8);
      pDir.position.set(4, 6, 5);
      pScene.add(pDir);

      const group = new THREE.Group();
      pScene.add(group);

      let animData = {};

      if (config.type === 'dashboard') {
        // Project 1: Automated Server / Dashboard Screen with 3 Telemetry Columns
        const screenFrameGeo = new THREE.BoxGeometry(2.6, 1.8, 0.3);
        const screenMat = new THREE.MeshStandardMaterial({
          color: pPalette.corePrimary,
          roughness: 0.3,
          metalness: isNightMode() ? 0.8 : 0.2
        });
        const screen = new THREE.Mesh(screenFrameGeo, screenMat);
        group.add(screen);

        const wireFrameGeo = new THREE.BoxGeometry(2.8, 2.0, 0.35);
        const wireMat = new THREE.MeshBasicMaterial({
          color: pPalette.wireframe,
          wireframe: true,
          transparent: true,
          opacity: 0.6
        });
        const wire = new THREE.Mesh(wireFrameGeo, wireMat);
        group.add(wire);

        // 3 Animated Telemetry Data Columns
        const colGeo = new THREE.BoxGeometry(0.35, 1.0, 0.2);
        const cols = [];
        [-0.7, 0, 0.7].forEach((xPos, idx) => {
          const colMat = new THREE.MeshBasicMaterial({
            color: idx === 1 ? pPalette.coreAccent : pPalette.ring1,
            transparent: true,
            opacity: 0.85
          });
          const col = new THREE.Mesh(colGeo, colMat);
          col.position.set(xPos, 0, 0.2);
          group.add(col);
          cols.push(col);
        });

        // Scanning ring
        const ringGeo = new THREE.TorusGeometry(2.2, 0.03, 6, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: pPalette.ring1 });
        const scanRing = new THREE.Mesh(ringGeo, ringMat);
        scanRing.rotation.x = Math.PI / 2.3;
        group.add(scanRing);

        animData = { screen, wire, cols, scanRing };

      } else if (config.type === 'portal') {
        // Project 2: AVISA Web Application - Floating Responsive Browser Layout + Cursor
        const windowGeo = new THREE.BoxGeometry(2.8, 1.9, 0.15);
        const windowMat = new THREE.MeshStandardMaterial({
          color: pPalette.corePrimary,
          roughness: 0.2,
          metalness: isNightMode() ? 0.85 : 0.2
        });
        const browserWin = new THREE.Mesh(windowGeo, windowMat);
        group.add(browserWin);

        // Header bar wireframe
        const navBarGeo = new THREE.BoxGeometry(2.4, 0.3, 0.05);
        const navBarMat = new THREE.MeshBasicMaterial({
          color: pPalette.coreAccent,
          transparent: true,
          opacity: 0.75
        });
        const navBar = new THREE.Mesh(navBarGeo, navBarMat);
        navBar.position.set(0, 0.6, 0.12);
        group.add(navBar);

        // 2 Webpage UI Cards
        const card1Geo = new THREE.BoxGeometry(1.0, 0.8, 0.05);
        const cardMat = new THREE.MeshBasicMaterial({
          color: pPalette.wireframe,
          wireframe: true,
          transparent: true,
          opacity: 0.75
        });
        const card1 = new THREE.Mesh(card1Geo, cardMat);
        card1.position.set(-0.6, -0.15, 0.12);
        group.add(card1);

        const card2 = new THREE.Mesh(card1Geo, cardMat);
        card2.position.set(0.6, -0.15, 0.12);
        group.add(card2);

        // 3D Pointer Cursor Arrow hovering over the page
        const cursorGroup = new THREE.Group();
        const cursorArrowGeo = new THREE.ConeGeometry(0.18, 0.45, 3);
        const cursorMat = new THREE.MeshBasicMaterial({ color: pPalette.ring1 });
        const cursor = new THREE.Mesh(cursorArrowGeo, cursorMat);
        cursor.rotation.z = Math.PI / 4;
        cursorGroup.position.set(0.4, -0.1, 0.4);
        cursorGroup.add(cursor);
        group.add(cursorGroup);

        animData = { browserWin, navBar, card1, card2, cursorGroup };

      } else if (config.type === 'pipeline') {
        // Project 3: CI/CD Pipeline & Git Commit Branching Tree
        // Main Branch
        const mainPts = [
          new THREE.Vector3(-2.2, 0, 0),
          new THREE.Vector3(2.2, 0, 0)
        ];
        const mainLineGeo = new THREE.BufferGeometry().setFromPoints(mainPts);
        const lineMat = new THREE.LineBasicMaterial({
          color: pPalette.wireframe,
          linewidth: 2,
          transparent: true,
          opacity: 0.85
        });
        const mainLine = new THREE.Line(mainLineGeo, lineMat);
        group.add(mainLine);

        // Feature Branch arch (develop -> merge)
        const featurePts = [
          new THREE.Vector3(-1.2, 0, 0),
          new THREE.Vector3(-0.6, 0.8, 0.2),
          new THREE.Vector3(0.6, 0.8, 0.2),
          new THREE.Vector3(1.2, 0, 0)
        ];
        const featureGeo = new THREE.BufferGeometry().setFromPoints(featurePts);
        const featureLine = new THREE.Line(featureGeo, lineMat);
        group.add(featureLine);

        // Commit Nodes
        const commitGeo = new THREE.SphereGeometry(0.2, 10, 10);
        const commits = [];
        const commitPositions = [
          [-1.8, 0, 0],
          [-1.2, 0, 0],
          [0, 0.8, 0.2],
          [1.2, 0, 0],
          [1.8, 0, 0]
        ];

        commitPositions.forEach((pos, i) => {
          const cMat = new THREE.MeshStandardMaterial({
            color: i === 2 ? pPalette.coreAccent : pPalette.corePrimary,
            roughness: 0.3
          });
          const cMesh = new THREE.Mesh(commitGeo, cMat);
          cMesh.position.set(...pos);
          group.add(cMesh);
          commits.push(cMesh);
        });

        // Glowing Deployment Signal Packet moving along pipeline
        const packetGeo = new THREE.SphereGeometry(0.14, 8, 8);
        const packetMat = new THREE.MeshBasicMaterial({ color: pPalette.coreAccent });
        const packet = new THREE.Mesh(packetGeo, packetMat);
        group.add(packet);

        animData = { mainLine, featureLine, commits, packet, packetProgress: 0 };
      }

      const parentCard = container.closest('.project-card');
      let isHovered = false;
      if (parentCard) {
        parentCard.addEventListener('pointerenter', () => { isHovered = true; }, { passive: true });
        parentCard.addEventListener('pointerleave', () => { isHovered = false; }, { passive: true });
      }

      projectScenes.push({
        container,
        canvas: c,
        renderer: pRenderer,
        scene: pScene,
        camera: pCamera,
        group,
        amb: pAmb,
        dir: pDir,
        type: config.type,
        animData,
        isHovered: () => isHovered
      });
    });
  }

  function updateProjectCanvasesTheme(isNight) {
    const p = isNight ? COLOR_PALETTES.night : COLOR_PALETTES.day;

    projectScenes.forEach(item => {
      item.amb.color.setHex(p.lightAmbient);
      item.dir.color.setHex(p.lightMain);

      if (item.type === 'dashboard') {
        item.animData.screen.material.color.setHex(p.corePrimary);
        item.animData.screen.material.metalness = isNight ? 0.85 : 0.2;
        item.animData.wire.material.color.setHex(p.wireframe);
        item.animData.scanRing.material.color.setHex(p.ring1);
        item.animData.cols.forEach((col, idx) => {
          col.material.color.setHex(idx === 1 ? p.coreAccent : p.ring1);
        });
      } else if (item.type === 'portal') {
        item.animData.browserWin.material.color.setHex(p.corePrimary);
        item.animData.navBar.material.color.setHex(p.coreAccent);
        item.animData.card1.material.color.setHex(p.wireframe);
        item.animData.card2.material.color.setHex(p.wireframe);
        item.animData.cursorGroup.children[0].material.color.setHex(p.ring1);
      } else if (item.type === 'pipeline') {
        item.animData.mainLine.material.color.setHex(p.wireframe);
        item.animData.featureLine.material.color.setHex(p.wireframe);
        item.animData.commits.forEach((c, idx) => {
          c.material.color.setHex(idx === 2 ? p.coreAccent : p.corePrimary);
        });
        item.animData.packet.material.color.setHex(p.coreAccent);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectVisuals);
  } else {
    initProjectVisuals();
  }

  /* ==========================================================================
     5. RESIZE HANDLER
     ========================================================================== */
  let resizeTimeout;
  function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;

    if (width < 768) {
      heroGroup.position.set(0, 3.0, -4);
      heroGroup.scale.set(0.65, 0.65, 0.65);
    } else if (width < 1024) {
      heroGroup.position.set(2.0, 1.2, -1);
      heroGroup.scale.set(0.85, 0.85, 0.85);
    } else {
      heroGroup.position.set(3.4, 0.6, 0);
      heroGroup.scale.set(1.0, 1.0, 1.0);
    }

    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(1.0);

    projectScenes.forEach(item => {
      const rect = item.container.getBoundingClientRect();
      const w = rect.width || 300;
      const h = rect.height || 160;
      item.camera.aspect = w / h;
      item.camera.updateProjectionMatrix();
      item.renderer.setSize(w, h);
    });
  }

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 150);
  }, { passive: true });
  handleResize();

  /* ==========================================================================
     6. MAIN RENDER LOOP (Zero Waste)
     ========================================================================== */
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (!isTabVisible) return;

    const delta = Math.min(clock.getDelta(), 0.05);
    const elapsedTime = clock.getElapsedTime();

    // Lerp Mouse & Scroll
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;
    scrollProgress += (targetScrollProgress - scrollProgress) * 0.05;

    // Camera Navigation
    camera.position.x = Math.sin(scrollProgress * Math.PI) * 2.0 + (mouse.x * 1.2);
    camera.position.y = -scrollProgress * 10 + (mouse.y * 1.2);
    camera.position.z = 24 - scrollProgress * 8;
    camera.lookAt(heroGroup.position.x * 0.3, camera.position.y * 0.85, 0);

    // Hero Object Animations
    if (!prefersReducedMotion) {
      if (!isDraggingHero) {
        heroVelocityX *= 0.94;
        heroVelocityY *= 0.94;
        heroGroup.rotation.x += 0.0025 + heroVelocityX;
        heroGroup.rotation.y += 0.004 + heroVelocityY;
      } else {
        heroGroup.rotation.x += heroVelocityX;
        heroGroup.rotation.y += heroVelocityY;
      }

      // Gimbal Rings
      ring1.rotation.z -= 0.005;
      ring2.rotation.z += 0.007;

      // Gentle floating pulse for the < / > code tag inside browser
      codeGroup.rotation.y = Math.sin(elapsedTime * 1.2) * 0.25;
      coreMesh.rotation.y += 0.01;
      coreMesh.rotation.x += 0.008;

      // Orbiting Server / Client Nodes
      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i];
        sat.userData.angle += sat.userData.speed;
        sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
        sat.position.z = Math.sin(sat.userData.angle) * sat.userData.radius;
        sat.rotation.x += 0.015;
        sat.rotation.y += 0.02;
      }

      // Rotate particle nebula
      particleSystem.rotation.y += 0.0004;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.1) * 0.03;

      // Rotate grid
      gridMesh.rotation.z = Math.sin(elapsedTime * 0.2) * 0.03;
    }

    // Render Background Scene
    renderer.render(scene, camera);

    // Render Projects ONLY when visible
    if (areProjectsVisible && !prefersReducedMotion) {
      for (let i = 0; i < projectScenes.length; i++) {
        const item = projectScenes[i];
        const hovered = item.isHovered();
        const speedMult = hovered ? 2.5 : 1.0;

        if (item.type === 'dashboard') {
          item.group.rotation.y = Math.sin(elapsedTime * 0.8) * 0.25;
          item.group.rotation.x = 0.15;
          item.animData.scanRing.rotation.z += 0.015 * speedMult;

          // Animate the 3 server telemetry columns
          item.animData.cols[0].scale.y = 0.5 + Math.sin(elapsedTime * 3) * 0.35;
          item.animData.cols[1].scale.y = 0.6 + Math.sin(elapsedTime * 4 + 1) * 0.35;
          item.animData.cols[2].scale.y = 0.45 + Math.sin(elapsedTime * 2.5 + 2) * 0.35;

        } else if (item.type === 'portal') {
          item.group.rotation.y = Math.sin(elapsedTime * 0.7) * 0.2;
          item.group.rotation.x = 0.12;

          // Animate mouse cursor hovering and clicking
          const cur = item.animData.cursorGroup;
          cur.position.x = 0.3 + Math.sin(elapsedTime * 2) * 0.4;
          cur.position.y = -0.15 + Math.cos(elapsedTime * 2) * 0.2;
          cur.position.z = 0.35 + Math.sin(elapsedTime * 6) * 0.05;

        } else if (item.type === 'pipeline') {
          item.group.rotation.y = Math.sin(elapsedTime * 0.6) * 0.25;
          item.group.rotation.x = 0.1;

          // Animate data packet along pipeline
          item.animData.packetProgress = (item.animData.packetProgress + 0.015 * speedMult) % 1.0;
          const prog = item.animData.packetProgress;
          // Interpolate along main line or feature branch
          if (prog < 0.5) {
            const t = prog * 2;
            item.animData.packet.position.set(-2.2 + t * 4.4, 0, 0);
          } else {
            const t = (prog - 0.5) * 2;
            const px = -1.2 + t * 2.4;
            const py = Math.sin(t * Math.PI) * 0.8;
            item.animData.packet.position.set(px, py, 0.2);
          }
        }

        item.renderer.render(item.scene, item.camera);
      }
    }
  }

    animate();
  } catch (err) {
    console.warn('3D visual engine initialization skipped:', err);
  }
})();
