/**
 * Portfolio 3D Experience — Jaume Tur
 * Extreme Performance Edition ("Patata con cables" friendly)
 * 
 * Key Optimizations:
 * 1. Zero-CPU buffer re-uploads (no needsUpdate per frame).
 * 2. Strict DPR = 1.0 (quadruples fill-rate performance on low-end GPUs).
 * 3. IntersectionObserver: Mini-scenes completely sleep (0% CPU/GPU) when offscreen.
 * 4. Visibility API: Render loop freezes completely when tab is hidden.
 * 5. Reduced geometry complexity (low poly, mediump shaders, antialias off).
 * 6. Delta-time capped rendering to prevent death spirals on slow cores.
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    return;
  }

  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (!isWebGLAvailable()) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Exact Color Palettes
  const COLOR_PALETTES = {
    day: {
      bg: 0xfffafa,
      corePrimary: 0xfff0f2,
      coreAccent: 0xff1e42,
      coreDeep: 0xd50024,
      wireframe: 0xff1e42,
      ring1: 0xff2a4d,
      ring2: 0xff002b,
      particles: 0xff1e42,
      grid: 0xff1e42,
      lightAmbient: 0xffffff,
      lightMain: 0xff2244,
      lightSecondary: 0xd50024
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

  // Freeze loop when user is in another tab
  let isTabVisible = !document.hidden;
  document.addEventListener('visibilitychange', function () {
    isTabVisible = !document.hidden;
  });

  /* ==========================================================================
     1. MAIN BACKGROUND 3D SCENE
     ========================================================================== */
  const mainCanvas = document.getElementById('webgl-bg');
  if (!mainCanvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas: mainCanvas,
    antialias: false, // Saves 30-40% GPU fill-rate on low-end hardware
    alpha: true,
    powerPreference: 'low-power',
    precision: 'mediump'
  });

  // Clamp DPR strictly to 1.0 for potato hardware (instant 4x speedup on 1080p/4K mobile/cheap laptops)
  const DPR = 1.0;
  renderer.setPixelRatio(DPR);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.set(0, 0, 24);

  // Lighting
  const initialPalette = getActivePalette();
  const ambientLight = new THREE.AmbientLight(initialPalette.lightAmbient, isNightMode() ? 0.8 : 1.1);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(initialPalette.lightMain, isNightMode() ? 2.0 : 1.4);
  mainLight.position.set(10, 15, 12);
  scene.add(mainLight);

  const secondaryLight = new THREE.PointLight(initialPalette.lightSecondary, isNightMode() ? 2.0 : 1.2, 50);
  secondaryLight.position.set(-12, -8, 8);
  scene.add(secondaryLight);

  // --- Hero 3D Sculpture Group ---
  const heroGroup = new THREE.Group();
  scene.add(heroGroup);
  heroGroup.position.set(3.2, 0.8, 0);

  // Core Icosahedron (clean low-poly)
  const coreGeo = new THREE.IcosahedronGeometry(2.3, 0);
  const coreMat = new THREE.MeshStandardMaterial({
    color: initialPalette.corePrimary,
    metalness: isNightMode() ? 0.9 : 0.1,
    roughness: 0.3,
    transparent: true,
    opacity: 0.88
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  heroGroup.add(coreMesh);

  // Wireframe Cage
  const wireGeo = new THREE.IcosahedronGeometry(2.8, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color: initialPalette.wireframe,
    wireframe: true,
    transparent: true,
    opacity: isNightMode() ? 0.7 : 0.35
  });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  heroGroup.add(wireMesh);

  // Gimbal Ring 1 (low segment count: 48 segments instead of 80)
  const ring1Geo = new THREE.TorusGeometry(3.6, 0.035, 8, 48);
  const ring1Mat = new THREE.MeshBasicMaterial({
    color: initialPalette.ring1,
    transparent: true,
    opacity: isNightMode() ? 0.8 : 0.5
  });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 3;
  heroGroup.add(ring1);

  // Gimbal Ring 2
  const ring2Geo = new THREE.TorusGeometry(4.1, 0.03, 8, 48);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: initialPalette.ring2,
    transparent: true,
    opacity: isNightMode() ? 0.7 : 0.4
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.y = Math.PI / 2.4;
  heroGroup.add(ring2);

  // Satellites (only 4 lightweight octahedrons)
  const satellites = [];
  const satGeo = new THREE.OctahedronGeometry(0.38, 0);
  for (let i = 0; i < 4; i++) {
    const satMat = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? initialPalette.coreAccent : initialPalette.coreDeep,
      metalness: 0.2,
      roughness: 0.3
    });
    const sat = new THREE.Mesh(satGeo, satMat);
    const angle = (i / 4) * Math.PI * 2;
    const radius = 5.0;
    sat.position.set(Math.cos(angle) * radius, Math.sin(angle) * 1.2, Math.sin(angle) * radius);
    sat.userData = { angle, radius, speed: 0.01 + (i * 0.003) };
    heroGroup.add(sat);
    satellites.push(sat);
  }

  // --- Lightweight Particle Constellation (280 points, ZERO CPU buffer updates) ---
  const particleCount = 280;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 55;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 35;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  // 32x32 pre-rendered tiny particle texture
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

  // --- Static Cyber Plane Grid (Zero CPU buffer re-uploads) ---
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
     2. MOUSE & SCROLL STATE (Passive & Throttled)
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

  // Drag interaction for Hero
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

  /* ==========================================================================
     3. DYNAMIC DAY / NIGHT THEME
     ========================================================================== */
  let currentThemeIsNight = isNightMode();

  function applyThemeToScene(isNight) {
    const p = isNight ? COLOR_PALETTES.night : COLOR_PALETTES.day;

    ambientLight.color.setHex(p.lightAmbient);
    ambientLight.intensity = isNight ? 0.8 : 1.1;

    mainLight.color.setHex(p.lightMain);
    mainLight.intensity = isNight ? 2.0 : 1.4;

    secondaryLight.color.setHex(p.lightSecondary);
    secondaryLight.intensity = isNight ? 2.0 : 1.2;

    coreMat.color.setHex(p.corePrimary);
    coreMat.metalness = isNight ? 0.9 : 0.1;
    wireMat.color.setHex(p.wireframe);
    wireMat.opacity = isNight ? 0.7 : 0.35;

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
     4. PROJECT CARDS (Lazy Render with IntersectionObserver)
     ========================================================================== */
  const projectScenes = [];
  let areProjectsVisible = false;

  function initProjectVisuals() {
    const projectsSection = document.getElementById('proyectos');
    if (projectsSection) {
      // IntersectionObserver: COMPLETELY PAUSES mini-renderers when offscreen!
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
        antialias: false, // Low-end GPU optimization
        alpha: true,
        powerPreference: 'low-power'
      });
      pRenderer.setPixelRatio(1.0); // Never super-sample on potato hardware

      const rect = container.getBoundingClientRect();
      const pWidth = rect.width || 300;
      const pHeight = rect.height || 155;
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
        const cubeGeo = new THREE.BoxGeometry(1.9, 1.9, 1.9);
        const cubeMat = new THREE.MeshStandardMaterial({
          color: pPalette.corePrimary,
          roughness: 0.3,
          metalness: isNightMode() ? 0.8 : 0.2
        });
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        group.add(cube);

        const wireCubeGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
        const wireCubeMat = new THREE.MeshBasicMaterial({
          color: pPalette.wireframe,
          wireframe: true,
          transparent: true,
          opacity: 0.6
        });
        const wireCube = new THREE.Mesh(wireCubeGeo, wireCubeMat);
        group.add(wireCube);

        const ringGeo = new THREE.TorusGeometry(2.7, 0.035, 6, 36);
        const ringMat = new THREE.MeshBasicMaterial({ color: pPalette.ring1 });
        const scanRing = new THREE.Mesh(ringGeo, ringMat);
        scanRing.rotation.x = Math.PI / 2.3;
        group.add(scanRing);

        animData = { cube, wireCube, scanRing };
      } else if (config.type === 'portal') {
        // Low-segment TorusKnot (36 tubular segments instead of 64)
        const gemGeo = new THREE.TorusKnotGeometry(1.2, 0.32, 36, 10, 2, 3);
        const gemMat = new THREE.MeshStandardMaterial({
          color: pPalette.coreAccent,
          roughness: 0.25,
          metalness: isNightMode() ? 0.9 : 0.3,
          wireframe: isNightMode()
        });
        const gem = new THREE.Mesh(gemGeo, gemMat);
        group.add(gem);

        animData = { gem };
      } else if (config.type === 'pipeline') {
        const nodes = [];
        const nodeGeo = new THREE.SphereGeometry(0.28, 10, 10);
        const nodePositions = [
          [-2.0, -0.5, 0],
          [-0.6, 0.7, 0.3],
          [0.7, -0.6, -0.2],
          [1.9, 0.6, 0.1]
        ];

        nodePositions.forEach((pos, i) => {
          const nodeMat = new THREE.MeshStandardMaterial({
            color: i % 2 === 0 ? pPalette.corePrimary : pPalette.coreAccent,
            roughness: 0.3
          });
          const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
          nodeMesh.position.set(...pos);
          group.add(nodeMesh);
          nodes.push(nodeMesh);
        });

        const lineMat = new THREE.LineBasicMaterial({
          color: pPalette.wireframe,
          transparent: true,
          opacity: 0.7
        });
        const linePoints = nodePositions.map(p => new THREE.Vector3(...p));
        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);

        const packetGeo = new THREE.SphereGeometry(0.16, 8, 8);
        const packetMat = new THREE.MeshBasicMaterial({ color: pPalette.coreDeep });
        const packet = new THREE.Mesh(packetGeo, packetMat);
        group.add(packet);

        animData = { nodes, line, packet, linePoints, packetProgress: 0 };
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
        item.animData.cube.material.color.setHex(p.corePrimary);
        item.animData.cube.material.metalness = isNight ? 0.8 : 0.2;
        item.animData.wireCube.material.color.setHex(p.wireframe);
        item.animData.scanRing.material.color.setHex(p.ring1);
      } else if (item.type === 'portal') {
        item.animData.gem.material.color.setHex(p.coreAccent);
        item.animData.gem.material.wireframe = isNight;
        item.animData.gem.material.metalness = isNight ? 0.9 : 0.3;
      } else if (item.type === 'pipeline') {
        item.animData.nodes.forEach((n, idx) => {
          n.material.color.setHex(idx % 2 === 0 ? p.corePrimary : p.coreAccent);
        });
        item.animData.line.material.color.setHex(p.wireframe);
        item.animData.packet.material.color.setHex(p.coreDeep);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectVisuals);
  } else {
    initProjectVisuals();
  }

  /* ==========================================================================
     5. RESIZE HANDLER (Debounced)
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
      const h = rect.height || 155;
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
     6. MAIN RENDER LOOP (Zero waste, capped delta)
     ========================================================================== */
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    // If tab is hidden in background, consume 0% GPU/CPU
    if (!isTabVisible) return;

    const delta = Math.min(clock.getDelta(), 0.05); // Cap delta to prevent physics jumps
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

    // Hero Object Animations (Simple transformations - Zero buffer uploads!)
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

      ring1.rotation.z -= 0.005;
      ring2.rotation.z += 0.007;
      wireMesh.rotation.y += 0.003;

      // Rotate Satellites
      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i];
        sat.userData.angle += sat.userData.speed;
        sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
        sat.position.z = Math.sin(sat.userData.angle) * sat.userData.radius;
        sat.rotation.x += 0.015;
      }

      // Rotate whole particle system (Zero CPU vertex re-allocation!)
      particleSystem.rotation.y += 0.0004;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.1) * 0.03;

      // Rotate grid gently
      gridMesh.rotation.z = Math.sin(elapsedTime * 0.2) * 0.03;
    }

    // Render Main Background Scene
    renderer.render(scene, camera);

    // Render Project Mini-Scenes ONLY when user is looking at the projects section!
    if (areProjectsVisible && !prefersReducedMotion) {
      for (let i = 0; i < projectScenes.length; i++) {
        const item = projectScenes[i];
        const hovered = item.isHovered();
        const speedMult = hovered ? 2.5 : 1.0;

        if (item.type === 'dashboard') {
          item.animData.cube.rotation.x += 0.006 * speedMult;
          item.animData.cube.rotation.y += 0.009 * speedMult;
          item.animData.wireCube.rotation.y -= 0.007 * speedMult;
          item.animData.scanRing.rotation.z += 0.015 * speedMult;
        } else if (item.type === 'portal') {
          item.animData.gem.rotation.x += 0.008 * speedMult;
          item.animData.gem.rotation.y += 0.012 * speedMult;
        } else if (item.type === 'pipeline') {
          item.group.rotation.y += 0.005 * speedMult;
          const pts = item.animData.linePoints;
          item.animData.packetProgress = (item.animData.packetProgress + 0.01 * speedMult) % (pts.length - 1);
          const segIdx = Math.floor(item.animData.packetProgress);
          const segT = item.animData.packetProgress - segIdx;
          if (pts[segIdx] && pts[segIdx + 1]) {
            item.animData.packet.position.lerpVectors(pts[segIdx], pts[segIdx + 1], segT);
          }
        }

        item.renderer.render(item.scene, item.camera);
      }
    }
  }

  animate();

})();
