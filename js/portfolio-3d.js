/**
 * Portfolio 3D Experience — Jaume Tur
 * Performance Edition: Zero Fullscreen Background Load
 * 
 * Key Features:
 * 1. Background 3D Canvas completely removed for maximum speed, 0% idle GPU usage.
 * 2. On-demand micro-scenes in Projects section only (Dashboard, Portal, Pipeline).
 * 3. IntersectionObserver: micro-scenes sleep completely (0 FPS, 0% CPU) when offscreen.
 * 4. Visibility API: render loop pauses when tab is hidden.
 * 5. Full support for Day (Israel Blue #0038b8) and Night (#000000 / #e5ff00) theme switching.
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

    // Color Palettes for Day & Night
    const COLOR_PALETTES = {
      day: {
        bg: 0xf8faff,
        corePrimary: 0xf0f5ff,
        coreAccent: 0x0055d4,
        coreDeep: 0x0038b8,
        wireframe: 0x0038b8,
        ring1: 0x005ce6,
        ring2: 0x002787,
        lightAmbient: 0xffffff,
        lightMain: 0x0055d4
      },
      night: {
        bg: 0x000000,
        corePrimary: 0x000000,
        coreAccent: 0xe5ff00,
        coreDeep: 0xe5ff00,
        wireframe: 0xe5ff00,
        ring1: 0xe5ff00,
        ring2: 0xe5ff00,
        lightAmbient: 0x181818,
        lightMain: 0xe5ff00
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
      if (isTabVisible && areProjectsVisible) {
        startRenderLoop();
      }
    });

    /* ==========================================================================
       PROJECT MICRO-SCENES (Lazy & Resource-friendly)
       ========================================================================== */
    const projectScenes = [];
    let areProjectsVisible = false;
    let animFrameId = null;

    function initProjectVisuals() {
      const projectsSection = document.getElementById('proyectos');
      if (projectsSection) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            areProjectsVisible = entry.isIntersecting;
            if (areProjectsVisible && isTabVisible) {
              startRenderLoop();
            }
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

        // Read dimensions before DOM modifications to prevent forced reflow
        const pWidth = container.clientWidth || 300;
        const pHeight = container.clientHeight || 160;

        container.innerHTML = '';
        const c = document.createElement('canvas');
        c.className = 'project-3d-canvas';
        c.setAttribute('aria-hidden', 'true');
        container.appendChild(c);

        const pRenderer = new THREE.WebGLRenderer({
          canvas: c,
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
          precision: 'mediump'
        });
        pRenderer.setPixelRatio(1.0);
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
          // Project 1: Server Screen with 3 Telemetry Columns
          const screenFrameGeo = new THREE.BoxGeometry(2.6, 1.8, 0.3);
          const screenMat = new THREE.MeshLambertMaterial({
            color: pPalette.corePrimary
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
          // Project 2: AVISA Web App - Responsive Browser Layout + Cursor
          const windowGeo = new THREE.BoxGeometry(2.8, 1.9, 0.15);
          const windowMat = new THREE.MeshLambertMaterial({
            color: pPalette.corePrimary
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

          // 3D Pointer Cursor Arrow
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

          // Feature Branch arch
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
            const cMat = new THREE.MeshLambertMaterial({
              color: i === 2 ? pPalette.coreAccent : pPalette.corePrimary
            });
            const cMesh = new THREE.Mesh(commitGeo, cMat);
            cMesh.position.set(...pos);
            group.add(cMesh);
            commits.push(cMesh);
          });

          // Deployment Packet
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

    // Expose setTheme for external theme switchers
    window.portfolio3D = {
      setTheme: function (theme) {
        updateProjectCanvasesTheme(theme === 'dark');
      }
    };

    const themeObserver = new MutationObserver(function () {
      updateProjectCanvasesTheme(isNightMode());
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    /* ==========================================================================
       RESIZE HANDLER
       ========================================================================== */
    let resizeTimeout;
    function handleResize() {
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
       ON-DEMAND RENDER LOOP
       Runs ONLY when Projects section is visible, 0% CPU otherwise.
       ========================================================================== */
    const clock = new THREE.Clock();

    function startRenderLoop() {
      if (animFrameId) return;
      animFrameId = requestAnimationFrame(animate);
    }

    function animate() {
      if (!isTabVisible || !areProjectsVisible) {
        animFrameId = null;
        return;
      }

      animFrameId = requestAnimationFrame(animate);

      if (prefersReducedMotion) return;

      const elapsedTime = clock.getElapsedTime();

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

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initProjectVisuals);
    } else {
      initProjectVisuals();
    }

  } catch (err) {
    console.warn('3D project visuals initialization skipped:', err);
  }
})();
