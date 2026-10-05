/**
 * Portfolio 3D Experience — Jaume Tur
 * 
 * Features:
 * 1. 3D Animated Background Logo Model:
 *    - Extruded from the official `jt.LOGO.svg` vector paths using Three.js SVGLoader.
 *    - True 3D depth, metallic bevels, concentric frame, and precise monogram curves.
 *    - Dynamic Orbiting Colored Gradient Lights: Smoothly shifting light sources casting vibrant PBR specular gradients.
 *    - Gentle 3D floating animation, interactive mouse parallax tilt, and scroll reactivity.
 *    - Day / Night theme synchronization (Polished Cobalt Blue / Cyber Electric Neon Yellow).
 * 2. Project Interactive Micro-Scenes:
 *    - AVISA Web App (Responsive viewport + pointer)
 *    - Telemetry Dashboard (Server rack + animated telemetry bars + scanline)
 *    - CI/CD Pipeline (Git branching tree + commit packet)
 * 3. Extreme Performance:
 *    - Render on demand, low-power mode, tab visibility sleeping, prefers-reduced-motion check.
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

    // Theme Palettes
    const COLOR_PALETTES = {
      day: {
        bg: 0xf8f7f4,
        backdrop: 0xf8f7f4,
        logoMesh: 0xf8f7f4,
        logoAccent: 0xeeece5,
        lightAmbient: 0xe4e8f2, // Soft bone-white ambient light
        lightDirect: 0xf2f4fa,  // Crisp architectural key light
        lightFill: 0xd6ddee,
        bgLight1: 0x002bb8,     // Dark Intense Israel Blue
        bgLight2: 0x0044cc,     // Deep Royal Cobalt Blue
        bgLight3: 0x001a88,     // Dark Midnight Navy Blue
        // Project card palettes (Cobalt / Israel Blue in Day Mode)
        cardBody: 0x0038b8,
        cardAccent: 0x0055d4,
        cardRing: 0x0038b8,
        cardCommit: 0x002787
      },
      night: {
        bg: 0x06080e,
        backdrop: 0x06080e,
        logoMesh: 0x0b0f17,
        logoAccent: 0x101622,
        lightAmbient: 0x121722,
        lightDirect: 0x9fb4d8,
        lightFill: 0x050a14,
        bgLight1: 0xe5ff00,
        bgLight2: 0x0284c7,
        bgLight3: 0x10b981,
        // Project card palettes (Cyber Neon Yellow & Obsidian Black in Night Mode)
        cardBody: 0x080b11,
        cardAccent: 0xe5ff00,
        cardRing: 0xe5ff00,
        cardCommit: 0x222222
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

    // Mouse Tracking for Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener('pointermove', function (e) {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    let scrollProgress = 0;
    let targetScrollProgress = 0;
    window.addEventListener('scroll', function () {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = maxScroll > 0 ? window.pageYOffset / maxScroll : 0;
    }, { passive: true });

    /* ==========================================================================
       1. 3D BACKGROUND LOGO SCENE (Extruded Architectural Relief & Ambient Background Lights)
       ========================================================================== */
    const bgCanvas = document.getElementById('logo-3d-bg');
    let bgRenderer, bgScene, bgCamera, logoRoot, bgAmbient, bgDirect, bgFill, bgBackdrop;
    let pointLight1, pointLight2, pointLight3;
    let logoMeshes = [];

    // Official Vector Paths from jt.LOGO.svg
    const LOGO_SVG_MARKUP = `<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1419 1419">
  <path d="M1363.22,433.31c-35.74-84.49-86.89-160.36-152.03-225.5-65.14-65.14-141.01-116.29-225.5-152.03C898.18,18.77,805.25,0,709.5,0s-188.68,18.77-276.19,55.78c-84.49,35.74-160.36,86.89-225.5,152.03s-116.29,141.01-152.03,225.5C18.77,520.82,0,613.75,0,709.5s18.77,188.68,55.78,276.19c35.74,84.49,86.89,160.36,152.03,225.5,65.14,65.14,141.01,116.29,225.5,152.03,87.51,37.01,180.43,55.78,276.19,55.78s188.68-18.77,276.19-55.78c84.49-35.74,160.36-86.89,225.5-152.03,65.14-65.14,116.29-141.01,152.03-225.5,37.01-87.51,55.78-180.43,55.78-276.19s-18.77-188.68-55.78-276.19ZM1335.59,974c-34.23,80.92-83.22,153.58-145.61,215.98-62.4,62.39-135.06,111.38-215.98,145.61-83.79,35.44-172.78,53.41-264.5,53.41s-180.71-17.97-264.5-53.41c-80.92-34.23-153.58-83.22-215.98-145.61-62.39-62.4-111.38-135.06-145.61-215.98-28.63-67.69-45.86-138.77-51.42-211.95-1.33-17.4-1.99-34.93-1.99-52.55,0-15.64.52-31.2,1.57-46.67,5.07-75.25,22.44-148.33,51.84-217.83,34.23-80.92,83.22-153.58,145.61-215.98,62.4-62.39,135.06-111.38,215.98-145.61,83.79-35.44,172.78-53.41,264.5-53.41s180.71,17.97,264.5,53.41c80.92,34.23,153.58,83.22,215.98,145.61,62.39,62.4,111.38,135.06,145.61,215.98,29.48,69.7,46.87,142.99,51.89,218.46,1.01,15.26,1.52,30.61,1.52,46.04,0,18.02-.69,35.93-2.08,53.72-5.65,72.76-22.85,143.45-51.33,210.78Z"/>
  <path d="M487.43,1153.62c65.77-6.83,118.18-29,157.2-66.5l79.97-213.41c.39-8.92.59-18.06.59-27.4v-327.18l-237.76,634.49ZM806.74,301.51l-59.98,160.06v353l192.25-513.06h-132.27ZM644.63,1087.12l79.97-213.41c.39-8.92.59-18.06.59-27.4v-327.18l-237.76,634.49c65.77-6.83,118.18-29,157.2-66.5ZM1106.05,791.71l210.35-78.51-210.24-79.44.05-80.6,250.22,98.12c-29.44-331.43-307.84-591.28-646.93-591.28S92.34,319.55,62.62,650.7l251.06-98.07-.05,80.6-210.35,79.16,210.25,78.79-.06,81.25-250.28-98.15c32.51,328.3,309.46,584.72,646.31,584.72s613.16-255.83,646.2-583.58l-249.7,97.54.05-81.25ZM932.03,1141.51h-185.27v-326.94l-22.16,59.14c-3.96,89.61-27.8,157.88-71.5,204.8-2.75,2.95-5.57,5.82-8.47,8.61l-48.85,130.36-115.99-43.46,7.64-20.4c-14.69,1.54-30.04,2.3-46.06,2.3-53.33,0-102.32-10.61-146.99-31.8-44.68-21.2-81.28-51.41-109.81-90.61l101.36-129.59c42.79,61.59,91.6,92.39,146.42,92.39,74.33,0,111.49-46.39,111.49-139.21v-399.59h-277.04v-156h458.39v217.62l21.57-57.56v-1.65h-.07v-158.41h60.05l32.43-86.55,115.99,43.46-16.15,43.09h249.18v158.41h-256.16v681.59ZM725.19,519.13l-237.76,634.49c65.77-6.83,118.18-29,157.2-66.5l79.97-213.41c.39-8.92.59-18.06.59-27.4v-327.18Z"/>
  <path d="M725.19,519.13v327.18c0,9.34-.2,18.48-.59,27.4l-79.97,213.41c-39.02,37.5-91.43,59.67-157.2,66.5l237.76-634.49Z"/>
  <polygon points="939.01 301.51 746.76 814.57 746.76 461.57 806.74 301.51 939.01 301.51"/>
</svg>`;

    function init3DBackgroundLogo() {
      if (!bgCanvas) return;

      bgRenderer = new THREE.WebGLRenderer({
        canvas: bgCanvas,
        antialias: true,
        alpha: true,
        powerPreference: 'low-power'
      });
      bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      bgRenderer.setSize(window.innerWidth, window.innerHeight);

      bgScene = new THREE.Scene();
      bgCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      bgCamera.position.set(0, 0, 18);

      const pal = getActivePalette();
      const isNight = isNightMode();

      // Atmospheric Background Backdrop Plane (Receives shifting colored gradient halos)
      const bgPlaneGeo = new THREE.PlaneGeometry(120, 120);
      const bgPlaneMat = new THREE.MeshStandardMaterial({
        color: pal.backdrop,
        roughness: 0.95,
        metalness: 0.02
      });
      bgBackdrop = new THREE.Mesh(bgPlaneGeo, bgPlaneMat);
      bgBackdrop.position.set(0, 0, -8);
      bgScene.add(bgBackdrop);

      // Ambient Light for soft shadow fill (subtle cool ambient so blue neon lights dominate)
      bgAmbient = new THREE.AmbientLight(pal.lightAmbient, isNight ? 0.65 : 0.38);
      bgScene.add(bgAmbient);

      // Main Directional Key Light (Casts crisp architectural bevel shadows across the relief logo)
      bgDirect = new THREE.DirectionalLight(pal.lightDirect, isNight ? 1.6 : 1.0);
      bgDirect.position.set(7, 9, 10);
      bgScene.add(bgDirect);

      // Secondary Soft Fill Light (Subtle ambient depth)
      bgFill = new THREE.DirectionalLight(pal.lightFill, isNight ? 0.35 : 0.28);
      bgFill.position.set(-8, -6, 5);
      bgScene.add(bgFill);

      // Background Ambient Gradient Point Lights (Intense Electric Blue Neon)
      pointLight1 = new THREE.PointLight(pal.bgLight1, isNight ? 2.6 : 7.8, 55);
      pointLight1.position.set(8, 5, -1.8);
      bgScene.add(pointLight1);

      pointLight2 = new THREE.PointLight(pal.bgLight2, isNight ? 2.4 : 6.8, 50);
      pointLight2.position.set(-8, -5, -2.0);
      bgScene.add(pointLight2);

      pointLight3 = new THREE.PointLight(pal.bgLight3, isNight ? 2.0 : 5.8, 45);
      pointLight3.position.set(0, 7, -1.2);
      bgScene.add(pointLight3);

      logoRoot = new THREE.Group();
      bgScene.add(logoRoot);

      // Create Extruded 3D Shapes from SVG paths (Architectural Bas-Relief)
      const loader = new THREE.SVGLoader();
      const svgData = loader.parse(LOGO_SVG_MARKUP);

      logoMeshes = [];

      svgData.paths.forEach((path, pathIdx) => {
        const shapes = THREE.SVGLoader.createShapes(path);

        shapes.forEach((shape) => {
          const isOuterRing = pathIdx === 0;
          const isAccentSlash = pathIdx === 2 || pathIdx === 3;

          const extrudeSettings = {
            depth: isOuterRing ? 50 : (isAccentSlash ? 58 : 42),
            bevelEnabled: true,
            bevelSegments: 4,
            steps: 1,
            bevelSize: 5,
            bevelThickness: 5
          };

          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          geometry.computeVertexNormals();
          // Center shape around origin (viewBox is 1419x1419)
          geometry.translate(-709.5, -709.5, -extrudeSettings.depth / 2);

          // Tone matching the background with satin matte finish (identified purely by shadows & bevels)
          const material = new THREE.MeshStandardMaterial({
            color: isNight ? (isAccentSlash ? pal.logoAccent : pal.logoMesh) : (isAccentSlash ? pal.logoAccent : pal.logoMesh),
            metalness: isNight ? 0.08 : 0.14,
            roughness: isNight ? 0.62 : 0.42,
            emissive: 0x000000,
            emissiveIntensity: 0
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.userData = { isOuterRing, isAccentSlash };
          logoRoot.add(mesh);
          logoMeshes.push(mesh);
        });
      });

      // Responsive Scale & Positioning (Enlarged & recessed into background)
      function updateLogoScale() {
        const w = window.innerWidth;
        if (w < 768) {
          logoRoot.position.set(0, 0.4, -3.2);
          const s = 0.0065;
          logoRoot.scale.set(s, -s, s);
        } else if (w < 1024) {
          logoRoot.position.set(2.4, 0.1, -2.2);
          const s = 0.0080;
          logoRoot.scale.set(s, -s, s);
        } else {
          logoRoot.position.set(3.8, 0.0, -1.5);
          const s = 0.0098;
          logoRoot.scale.set(s, -s, s);
        }
      }
      updateLogoScale();
      window.addEventListener('resize', updateLogoScale, { passive: true });
    }

    /* ==========================================================================
       2. PROJECT MICRO-SCENES (3D Interactive Cards)
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
      } else {
        areProjectsVisible = true;
      }

      const visualCards = [
        { selector: '.visual-two', type: 'portal' },
        { selector: '.visual-one', type: 'dashboard' },
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
        const isNight = isNightMode();

        const pAmb = new THREE.AmbientLight(pPalette.lightAmbient, isNight ? 1.2 : 1.5);
        pScene.add(pAmb);

        const pDir = new THREE.DirectionalLight(pPalette.lightDirect, isNight ? 1.8 : 2.2);
        pDir.position.set(4, 6, 5);
        pScene.add(pDir);

        const group = new THREE.Group();
        pScene.add(group);

        let animData = {};

        if (config.type === 'portal') {
          // AVISA Web App - Responsive Browser Layout + Interactive Pointer Cursor
          const windowGeo = new THREE.BoxGeometry(2.8, 1.9, 0.15);
          const windowMat = new THREE.MeshStandardMaterial({
            color: pPalette.cardBody,
            roughness: isNight ? 0.2 : 0.35,
            metalness: isNight ? 0.85 : 0.4
          });
          const browserWin = new THREE.Mesh(windowGeo, windowMat);
          group.add(browserWin);

          // Header bar
          const navBarGeo = new THREE.BoxGeometry(2.4, 0.3, 0.05);
          const navBarMat = new THREE.MeshBasicMaterial({
            color: pPalette.cardAccent,
            transparent: true,
            opacity: 0.90
          });
          const navBar = new THREE.Mesh(navBarGeo, navBarMat);
          navBar.position.set(0, 0.6, 0.12);
          group.add(navBar);

          // UI Cards
          const card1Geo = new THREE.BoxGeometry(1.0, 0.8, 0.05);
          const cardMat = new THREE.MeshBasicMaterial({
            color: pPalette.cardRing,
            wireframe: true,
            transparent: true,
            opacity: 0.85
          });
          const card1 = new THREE.Mesh(card1Geo, cardMat);
          card1.position.set(-0.6, -0.15, 0.12);
          group.add(card1);

          const card2 = new THREE.Mesh(card1Geo, cardMat);
          card2.position.set(0.6, -0.15, 0.12);
          group.add(card2);

          // 3D Pointer Cursor Arrow
          const cursorGroup = new THREE.Group();
          const cursorArrowGeo = new THREE.ConeGeometry(0.18, 0.45, 3);
          const cursorMat = new THREE.MeshBasicMaterial({ color: isNight ? pPalette.cardAccent : 0xffffff });
          const cursor = new THREE.Mesh(cursorArrowGeo, cursorMat);
          cursor.rotation.z = Math.PI / 4;
          cursorGroup.position.set(0.4, -0.1, 0.4);
          cursorGroup.add(cursor);
          group.add(cursorGroup);

          animData = { browserWin, navBar, card1, card2, cursorGroup };

        } else if (config.type === 'dashboard') {
          // Automated Telemetry Dashboard
          const screenFrameGeo = new THREE.BoxGeometry(2.6, 1.8, 0.3);
          const screenMat = new THREE.MeshStandardMaterial({
            color: pPalette.cardBody,
            roughness: 0.3,
            metalness: isNight ? 0.8 : 0.4
          });
          const screen = new THREE.Mesh(screenFrameGeo, screenMat);
          group.add(screen);

          const wireFrameGeo = new THREE.BoxGeometry(2.8, 2.0, 0.35);
          const wireMat = new THREE.MeshBasicMaterial({
            color: pPalette.cardRing,
            wireframe: true,
            transparent: true,
            opacity: 0.75
          });
          const wire = new THREE.Mesh(wireFrameGeo, wireMat);
          group.add(wire);

          // 3 Animated Telemetry Data Columns
          const colGeo = new THREE.BoxGeometry(0.35, 1.0, 0.2);
          const cols = [];
          [-0.7, 0, 0.7].forEach((xPos, idx) => {
            const colMat = new THREE.MeshBasicMaterial({
              color: idx === 1 ? pPalette.cardAccent : pPalette.cardRing,
              transparent: true,
              opacity: 0.90
            });
            const col = new THREE.Mesh(colGeo, colMat);
            col.position.set(xPos, 0, 0.2);
            group.add(col);
            cols.push(col);
          });

          // Scanning ring
          const ringGeo = new THREE.TorusGeometry(2.2, 0.03, 6, 32);
          const ringMat = new THREE.MeshBasicMaterial({ color: pPalette.cardAccent });
          const scanRing = new THREE.Mesh(ringGeo, ringMat);
          scanRing.rotation.x = Math.PI / 2.3;
          group.add(scanRing);

          animData = { screen, wire, cols, scanRing };

        } else if (config.type === 'pipeline') {
          // CI/CD Pipeline & Git Commit Branching Tree
          const mainPts = [
            new THREE.Vector3(-2.2, 0, 0),
            new THREE.Vector3(2.2, 0, 0)
          ];
          const mainLineGeo = new THREE.BufferGeometry().setFromPoints(mainPts);
          const lineMat = new THREE.LineBasicMaterial({
            color: pPalette.cardRing,
            linewidth: 2,
            transparent: true,
            opacity: 0.90
          });
          const mainLine = new THREE.Line(mainLineGeo, lineMat);
          group.add(mainLine);

          // Feature Branch Arch
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
          const commitGeo = new THREE.SphereGeometry(0.2, 12, 12);
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
              color: i === 2 ? pPalette.cardAccent : pPalette.cardCommit,
              roughness: 0.3
            });
            const cMesh = new THREE.Mesh(commitGeo, cMat);
            cMesh.position.set(...pos);
            group.add(cMesh);
            commits.push(cMesh);
          });

          // Deployment Signal Packet
          const packetGeo = new THREE.SphereGeometry(0.14, 8, 8);
          const packetMat = new THREE.MeshBasicMaterial({ color: pPalette.cardAccent });
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

    /* ==========================================================================
       3. DAY / NIGHT THEME SYNCHRONIZATION
       ========================================================================== */
    function updateTheme(isNight) {
      const p = isNight ? COLOR_PALETTES.night : COLOR_PALETTES.day;

      if (bgCanvas && bgAmbient && bgDirect) {
        if (bgBackdrop) {
          bgBackdrop.material.color.setHex(p.backdrop);
        }

        bgAmbient.color.setHex(p.lightAmbient);
        bgAmbient.intensity = isNight ? 0.65 : 0.38;

        bgDirect.color.setHex(p.lightDirect);
        bgDirect.intensity = isNight ? 1.6 : 1.0;

        if (bgFill) {
          bgFill.color.setHex(p.lightFill);
          bgFill.intensity = isNight ? 0.35 : 0.28;
        }

        if (pointLight1) {
          pointLight1.color.setHex(p.bgLight1);
          pointLight1.intensity = isNight ? 2.6 : 7.8;
        }
        if (pointLight2) {
          pointLight2.color.setHex(p.bgLight2);
          pointLight2.intensity = isNight ? 2.4 : 6.8;
        }
        if (pointLight3) {
          pointLight3.color.setHex(p.bgLight3);
          pointLight3.intensity = isNight ? 2.0 : 5.8;
        }

        logoMeshes.forEach((mesh) => {
          const { isAccentSlash } = mesh.userData;
          mesh.material.color.setHex(isAccentSlash ? p.logoAccent : p.logoMesh);
          mesh.material.metalness = isNight ? 0.08 : 0.14;
          mesh.material.roughness = isNight ? 0.62 : 0.42;
          mesh.material.emissive.setHex(0x000000);
          mesh.material.emissiveIntensity = 0;
        });
      }

      projectScenes.forEach(item => {
        item.amb.color.setHex(p.lightAmbient);
        item.amb.intensity = isNight ? 1.2 : 1.5;
        item.dir.color.setHex(p.lightDirect);
        item.dir.intensity = isNight ? 1.8 : 2.2;

        if (item.type === 'dashboard') {
          item.animData.screen.material.color.setHex(p.cardBody);
          item.animData.screen.material.metalness = isNight ? 0.85 : 0.4;
          item.animData.wire.material.color.setHex(p.cardRing);
          item.animData.scanRing.material.color.setHex(p.cardAccent);
          item.animData.cols.forEach((col, idx) => {
            col.material.color.setHex(idx === 1 ? p.cardAccent : p.cardRing);
          });
        } else if (item.type === 'portal') {
          item.animData.browserWin.material.color.setHex(p.cardBody);
          item.animData.browserWin.material.metalness = isNight ? 0.85 : 0.4;
          item.animData.navBar.material.color.setHex(p.cardAccent);
          item.animData.card1.material.color.setHex(p.cardRing);
          item.animData.card2.material.color.setHex(p.cardRing);
          if (item.animData.cursorGroup && item.animData.cursorGroup.children[0]) {
            item.animData.cursorGroup.children[0].material.color.setHex(isNight ? p.cardAccent : 0xffffff);
          }
        } else if (item.type === 'pipeline') {
          item.animData.mainLine.material.color.setHex(p.cardRing);
          item.animData.featureLine.material.color.setHex(p.cardRing);
          item.animData.commits.forEach((c, idx) => {
            c.material.color.setHex(idx === 2 ? p.cardAccent : p.cardCommit);
          });
          item.animData.packet.material.color.setHex(p.cardAccent);
        }
      });
    }

    let currentThemeIsNight = isNightMode();
    const themeObserver = new MutationObserver(function () {
      const isNight = isNightMode();
      if (isNight !== currentThemeIsNight) {
        currentThemeIsNight = isNight;
        updateTheme(isNight);
      }
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        init3DBackgroundLogo();
        initProjectVisuals();
      });
    } else {
      init3DBackgroundLogo();
      initProjectVisuals();
    }

    // Resize Handler
    let resizeTimeout;
    function handleResize() {
      if (bgCanvas && bgRenderer && bgCamera) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        bgCamera.aspect = w / h;
        bgCamera.updateProjectionMatrix();
        bgRenderer.setSize(w, h);
      }

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

    /* ==========================================================================
       4. ANIMATION & RENDER LOOP (Dynamic Background Shifting Gradient Lights)
       ========================================================================== */
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      if (!isTabVisible) return;

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsedTime = clock.getElapsedTime();

      // Lerp Mouse Parallax & Scroll
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.05;

      // 1. Animate 3D Background Logo & Orbiting Background Gradient Lights
      if (bgCanvas && logoRoot && bgRenderer && bgScene && bgCamera) {
        if (!prefersReducedMotion) {
          // Floating 3D motion + mouse tilt
          logoRoot.rotation.y = Math.sin(elapsedTime * 0.35) * 0.12 + (mouse.x * 0.18) + (scrollProgress * 0.35);
          logoRoot.rotation.x = Math.cos(elapsedTime * 0.3) * 0.08 - (mouse.y * 0.12);
          logoRoot.rotation.z = Math.sin(elapsedTime * 0.25) * 0.02;

          // Parallax camera floating
          bgCamera.position.x = mouse.x * 0.35;
          bgCamera.position.y = -scrollProgress * 3.0 + (mouse.y * 0.3);
          bgCamera.lookAt(logoRoot.position.x * 0.15, bgCamera.position.y * 0.8, 0);

          // Orbit dynamic colored gradient lights behind the logo across the backdrop
          const rootX = logoRoot.position.x;
          const rootY = logoRoot.position.y;

          if (pointLight1) {
            pointLight1.position.set(
              Math.sin(elapsedTime * 0.4) * 11.0 + rootX * 0.4,
              Math.cos(elapsedTime * 0.5) * 7.5 + rootY * 0.4,
              Math.sin(elapsedTime * 0.3) * 1.8 - 1.8
            );
          }

          if (pointLight2) {
            pointLight2.position.set(
              Math.cos(elapsedTime * 0.35) * 13.0 + rootX * 0.4,
              Math.sin(elapsedTime * 0.45) * 8.5 + rootY * 0.4,
              Math.cos(elapsedTime * 0.25) * 1.8 - 2.0
            );
          }

          if (pointLight3) {
            pointLight3.position.set(
              Math.sin(elapsedTime * 0.3 + 2.0) * 9.5 + rootX * 0.4,
              Math.cos(elapsedTime * 0.4 + 1.0) * 6.5 + rootY * 0.4,
              Math.sin(elapsedTime * 0.35) * 1.5 - 1.2
            );
          }

          // Dynamic Shifting Gradient Colors across the background atmosphere
          if (isNightMode()) {
            // Atmospheric midnight spectrum: Neon Cyber Yellow -> Luminous Azure -> Deep Emerald
            const hue1 = (0.15 + Math.sin(elapsedTime * 0.25) * 0.03 + 1.0) % 1.0;
            const hue2 = (0.58 + Math.cos(elapsedTime * 0.22) * 0.04 + 1.0) % 1.0;
            const hue3 = (0.42 + Math.sin(elapsedTime * 0.3) * 0.05 + 1.0) % 1.0;
            if (pointLight1) pointLight1.color.setHSL(hue1, 0.9, 0.45);
            if (pointLight2) pointLight2.color.setHSL(hue2, 0.85, 0.38);
            if (pointLight3) pointLight3.color.setHSL(hue3, 0.8, 0.35);
          } else {
            // Atmospheric deep dark royal/Israel blue spectrum in Day mode
            const hue1 = (0.618 + Math.sin(elapsedTime * 0.25) * 0.015 + 1.0) % 1.0; // ~222° deep Israel blue
            const hue2 = (0.598 + Math.cos(elapsedTime * 0.22) * 0.015 + 1.0) % 1.0; // ~215° rich royal blue
            const hue3 = (0.638 + Math.sin(elapsedTime * 0.3) * 0.015 + 1.0) % 1.0;  // ~230° dark cobalt blue
            if (pointLight1) pointLight1.color.setHSL(hue1, 1.0, 0.36);
            if (pointLight2) pointLight2.color.setHSL(hue2, 1.0, 0.40);
            if (pointLight3) pointLight3.color.setHSL(hue3, 1.0, 0.30);
          }
        }

        bgRenderer.render(bgScene, bgCamera);
      }

      // 2. Animate Project Micro-Scenes ONLY when visible
      if (areProjectsVisible && !prefersReducedMotion) {
        for (let i = 0; i < projectScenes.length; i++) {
          const item = projectScenes[i];
          const hovered = item.isHovered();
          const speedMult = hovered ? 2.5 : 1.0;

          if (item.type === 'dashboard') {
            item.group.rotation.y = Math.sin(elapsedTime * 0.8) * 0.25;
            item.group.rotation.x = 0.15;
            item.animData.scanRing.rotation.z += 0.015 * speedMult;

            item.animData.cols[0].scale.y = 0.5 + Math.sin(elapsedTime * 3) * 0.35;
            item.animData.cols[1].scale.y = 0.6 + Math.sin(elapsedTime * 4 + 1) * 0.35;
            item.animData.cols[2].scale.y = 0.45 + Math.sin(elapsedTime * 2.5 + 2) * 0.35;

          } else if (item.type === 'portal') {
            item.group.rotation.y = Math.sin(elapsedTime * 0.7) * 0.2;
            item.group.rotation.x = 0.12;

            const cur = item.animData.cursorGroup;
            cur.position.x = 0.3 + Math.sin(elapsedTime * 2) * 0.4;
            cur.position.y = -0.15 + Math.cos(elapsedTime * 2) * 0.2;
            cur.position.z = 0.35 + Math.sin(elapsedTime * 6) * 0.05;

          } else if (item.type === 'pipeline') {
            item.group.rotation.y = Math.sin(elapsedTime * 0.6) * 0.25;
            item.group.rotation.x = 0.1;

            item.animData.packetProgress = (item.animData.packetProgress + 0.015 * speedMult) % 1.0;
            const prog = item.animData.packetProgress;
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
