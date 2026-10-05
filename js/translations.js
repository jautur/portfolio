/**
 * Dictionary of translations for Jaume Tur's Portfolio
 * Languages: Spanish (es) and English (en)
 */
const translations = {
  es: {
    // Document metadata
    meta: {
      title: "Jaume Tur — Desarrollador Web · Arquitectura Frontend · CI/CD",
      description: "Portfolio profesional de Jaume Tur. Desarrollo web moderno, arquitecturas reactivas, optimización de rendimiento y automatización de despliegues."
    },

    // Navigation
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
      skills: "Habilidades",
      process: "Metodología",
      contact: "Contacto",
      cv: "CV ↗",
      themeLight: "Modo Día",
      themeDark: "Modo Noche",
      menuOpen: "Abrir menú de navegación",
      menuClose: "Cerrar menú",
      availableStatus: "Disponible para proyectos"
    },

    // Hero Section
    hero: {
      greeting: "Hola, soy Jaume Tur",
      role: "Desarrollador Web (DAW) · Técnico Microinformático y Redes (SMX)",
      headlinePrefix: "Desarrollo aplicaciones web ",
      headlineHighlight: "completas y robustas",
      headlineSuffix: ", desde los sistemas hasta el código.",
      description: "Titulado en Sistemas Microinformáticos y Redes (SMX) y estudiante/desarrollador de Desarrollo de Aplicaciones Web (DAW). Especializado en frontend (HTML5, CSS3, JS/TS, Angular), backend (PHP, Java, Node.js, SQL), administración de sistemas y redes.",
      ctaProjects: "Ver proyectos",
      ctaCv: "Ver / Descargar Currículum Vitae",
      ctaCvText: "Ver / Descargar CV",
      ctaContact: "Contactar",
      ctaLinkedIn: "LinkedIn",
      metrics: {
        yearsLabel: "Formación & Práctica (SMX + DAW)",
        automationLabel: "Despliegues y Proyectos",
        perfLabel: "Rendimiento Lighthouse",
        uptimeLabel: "Disponibilidad de servicios"
      }
    },

    // About Section
    about: {
      tag: "Sobre mí",
      title: "Integrando la administración de sistemas y redes con el desarrollo de aplicaciones web.",
      lead: "Perfil técnico multidisciplinar formado en el Grado Medio de SMX y el Grado Superior de DAW.",
      p1: "Cuento con una base sólida de infraestructura: montaje y mantenimiento de equipos, sistemas operativos en red (Linux/Windows Server), servicios de red (DNS, DHCP, web, FTP) y seguridad informática. Sobre estos cimientos construyo aplicaciones web completas.",
      p2: "En el área de desarrollo domino tanto el entorno cliente (HTML5 semántico, CSS3, JavaScript/TypeScript y frameworks como Angular) como el entorno servidor (PHP, Java, Node.js, bases de datos relacionales y despliegue de aplicaciones).",
      architectureTitle: "Arquitectura de Despliegue: Disparador & Ejecutor",
      architectureDesc: "Implemento flujos de trabajo basados en eventos reactivos donde disparadores (webhooks, git push, cron) envían payloads a servicios ejecutores que procesan la lógica y garantizan entregas continuas y fiables.",
      pillars: {
        cleanCodeTitle: "Desarrollo Frontend & Accesibilidad",
        cleanCodeDesc: "Estructuras HTML5 nativas, CSS responsive, JavaScript interactivo y aplicaciones web accesibles.",
        perfTitle: "Desarrollo Backend & Datos",
        perfDesc: "Lógica de servidor en PHP/Java/Node.js, diseño de bases de datos relacionales (MySQL/MariaDB) y APIs REST.",
        automationTitle: "Sistemas & Servicios en Red",
        automationDesc: "Configuración de servidores Linux/Windows, redes locales, protocolos TCP/IP y servicios de red.",
        uxTitle: "Seguridad & Calidad Web",
        uxDesc: "Buenas prácticas de seguridad informática, validación de estándares W3C y optimización web."
      }
    },

    // Projects Section
    projects: {
      tag: "Proyectos",
      title: "Soluciones reales en producción",
      subtitle: "Una selección de proyectos destacados donde diseño, código y automatización trabajan juntos.",
      filters: {
        all: "Todos",
        webapps: "Web Apps",
        automation: "Sistemas & CI/CD",
        graphics: "3D & Interfaces"
      },
      viewLive: "Ver demo en vivo",
      viewCode: "Ver código en GitHub",
      roleLabel: "Rol:",
      impactLabel: "Resultado:",
      items: [
        {
          id: "avisa",
          category: "webapps",
          badge: "Web App en Vivo",
          year: "2025",
          title: "AVISA — Gestión de Incidencias",
          description: "Plataforma web integral para la comunicación, seguimiento y resolución ágil de avisos e incidencias. Diseñada con arquitectura modular, retroalimentación en tiempo real y accesibilidad.",
          role: "Desarrollo Frontend, UX/UI y Despliegue",
          impact: "Interfaz ágil, accesible y completamente funcional desplegada en producción.",
          tags: ["Angular", "TypeScript", "UX/UI", "REST API", "Responsive"],
          liveUrl: "https://jautur.github.io/AVISA-objectiu/",
          githubUrl: "https://github.com/jautur/AVISA"
        },
        {
          id: "telemetry",
          category: "graphics",
          badge: "Data Visualization",
          year: "2024",
          title: "Panel de Métricas & Telemetría 3D",
          description: "Sistema visual de monitoreo en tiempo real con renderizado acelerado por hardware mediante WebGL/Three.js. Diseñado específicamente para ejecutarse de manera fluida incluso en dispositivos de recursos limitados.",
          role: "Ingeniería Gráfica y Frontend",
          impact: "60 FPS estables con bajo consumo de memoria y pausado dinámico de renderizado.",
          tags: ["Three.js", "WebGL", "JavaScript ES6+", "Performance", "CSS Grid"],
          liveUrl: "#",
          githubUrl: "https://github.com/jautur/portfolio"
        },
        {
          id: "pipeline",
          category: "automation",
          badge: "DevOps & CI/CD",
          year: "2026",
          title: "Pipeline CI/CD: Disparador & Ejecutor",
          description: "Arquitectura orientada a eventos para integración y despliegue continuo. Un sistema de disparo por webhooks que procesa payloads JSON y ejecuta compilaciones, pruebas automatizadas y despliegues idempotentes.",
          role: "Arquitectura de Automatización y CI/CD",
          impact: "Validación automática de calidad (HTML/CSS/JS) y entrega continua sin interrupciones.",
          tags: ["GitHub Actions", "CI/CD", "Webhooks", "JSON Payloads", "Linux"],
          liveUrl: "#proceso",
          githubUrl: "https://github.com/jautur/portfolio"
        }
      ]
    },

    // Skills Section
    skills: {
      tag: "Habilidades",
      title: "Stack técnico y competencias (SMX & DAW)",
      subtitle: "Competencias adquiridas en Sistemas Microinformáticos y Redes y Desarrollo de Aplicaciones Web.",
      categories: [
        {
          name: "Desarrollo Web Cliente (Frontend)",
          desc: "Interfaces web interactivas, accesibles y adaptadas a cualquier dispositivo.",
          skills: ["HTML5 semántico & Accesibilidad", "CSS3 / Flexbox / Grid", "JavaScript (ES6+) & TypeScript", "Frameworks Web (Angular)", "Three.js & Gráficos WebGL", "Diseño Web Adaptativo (Responsive)"]
        },
        {
          name: "Desarrollo Web Servidor & Bases de Datos",
          desc: "Lógica de negocio, integración con APIs y persistencia de datos.",
          skills: ["PHP & Programación Servidor", "Java & POO", "Bases de Datos Relacionales (MySQL/MariaDB)", "Consultas SQL & Modelado de Datos", "APIs RESTful & Formato JSON", "Node.js básico"]
        },
        {
          name: "Sistemas Operativos, Redes & Servicios (SMX)",
          desc: "Instalación, configuración y administración de infraestructuras TIC.",
          skills: ["Linux (Ubuntu/Debian) & Windows Server", "Redes Locales & Protocolo TCP/IP", "Servicios de Red (DNS, DHCP, Web, FTP)", "Montaje y Mantenimiento de Equipos", "Seguridad Informática & Copias de Seguridad", "Terminal Bash & Automatización de scripts"]
        },
        {
          name: "Despliegue, Git & Calidad Web",
          desc: "Gestión de versiones, despliegue de aplicaciones y optimización.",
          skills: ["Control de versiones Git & GitHub", "GitHub Actions & Integración Continua (CI)", "Despliegue de Aplicaciones Web (DAW)", "Web Performance & Core Web Vitals", "html-validate & Validación W3C", "Servidores Web (Apache / Nginx)"]
        }
      ],
      techStackTitle: "Lenguajes y Tecnologías Principales",
      techStackDesc: "Acceso directo a la documentación oficial y ecosistema de cada tecnología que domino.",
      tech: {
        html5: "Marcado & Semántica",
        css3: "Estilos & Grid",
        js: "JavaScript ES6+",
        php: "Backend & Servidor",
        java: "POO & Backend",
        spring: "Framework Empresarial"
      }
    },

    // Process Section
    process: {
      tag: "Metodología",
      title: "Un proceso estructurado orientado a resultados",
      subtitle: "Cada etapa está diseñada para garantizar calidad, estabilidad del sistema y código limpio.",
      steps: [
        {
          number: "01",
          title: "Análisis & Requisitos",
          desc: "Estudio de necesidades, definición técnica del proyecto y planificación del entorno de sistemas y desarrollo."
        },
        {
          number: "02",
          title: "Diseño & Arquitectura",
          desc: "Modelado de base de datos relacional, esquemas de red/servidor y diseño de la interfaz de usuario."
        },
        {
          number: "03",
          title: "Desarrollo & Pruebas",
          desc: "Programación en cliente y servidor, pruebas funcionales, validación de código y comprobación de seguridad."
        },
        {
          number: "04",
          title: "Despliegue & Mantenimiento",
          desc: "Puesta en producción en servidor web, automatización de tareas, monitorización y copias de seguridad."
        }
      ]
    },

    // Metrics / Insights
    insights: {
      title: "Rendimiento y fiabilidad medibles",
      stat1Number: "98%",
      stat1Label: "Índice de calidad y satisfacción",
      stat2Number: "100%",
      stat2Label: "Validación de código en CI",
      stat3Number: "< 1s",
      stat3Label: "Tiempo de carga inicial",
      stat4Number: "24/7",
      stat4Label: "Disponibilidad en GitHub Pages"
    },

    // Contact Section
    contact: {
      tag: "Contacto",
      title: "¿Tienes un proyecto en mente?",
      subtitle: "Estoy disponible para colaborar en proyectos desafiantes, arquitecturas web y desarrollo frontend.",
      emailLabel: "Correo electrónico:",
      emailCopy: "Copiar email",
      emailCopied: "¡Copiado al portapapeles!",
      githubLabel: "Perfil de GitHub:",
      githubView: "Visitar github.com/jautur",
      linkedinLabel: "Perfil de LinkedIn:",
      linkedinView: "Visitar linkedin.com/in/jautur",
      cvLabel: "Currículum Vitae:",
      cvDownload: "Descargar CV (PDF)",
      formTitle: "Envíame un mensaje",
      nameLabel: "Tu nombre",
      namePlaceholder: "Ej: Ana García",
      emailInputLabel: "Tu correo electrónico",
      emailPlaceholder: "nombre@ejemplo.com",
      messageLabel: "Mensaje",
      messagePlaceholder: "Cuéntame los detalles de tu proyecto o idea...",
      submitBtn: "Enviar mensaje",
      submittingBtn: "Enviando...",
      successMsg: "¡Gracias! Tu cliente de correo se abrirá para completar el envío.",
      validationError: "Por favor, completa todos los campos requeridos con datos válidos."
    },

    // Footer
    footer: {
      copyright: "© 2026 Jaume Tur. Todos los derechos reservados.",
      builtWith: "Construido con HTML5 semántico, CSS3 moderno, Vanilla JS & Three.js",
      backToTop: "Volver arriba"
    }
  },

  en: {
    // Document metadata
    meta: {
      title: "Jaume Tur — Web Developer · Frontend Architecture · CI/CD",
      description: "Professional portfolio of Jaume Tur. Modern web development, reactive architectures, performance optimization, and CI/CD automation."
    },

    // Navigation
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      process: "Process",
      contact: "Contact",
      cv: "CV ↗",
      themeLight: "Light Mode",
      themeDark: "Dark Mode",
      menuOpen: "Open navigation menu",
      menuClose: "Close menu",
      availableStatus: "Available for projects"
    },

    // Hero Section
    hero: {
      greeting: "Hello, I am Jaume Tur",
      role: "Web Developer (DAW) · Microcomputer Systems & Networks Technician (SMX)",
      headlinePrefix: "I build complete and robust ",
      headlineHighlight: "web applications",
      headlineSuffix: ", from systems infrastructure to client code.",
      description: "Qualified technician in Microcomputer Systems & Networks (SMX) and web developer specialized in Web Application Development (DAW). Skilled in frontend (HTML5, CSS3, JS/TS, Angular), backend (PHP, Java, Node.js, SQL), system administration, and computer networks.",
      ctaProjects: "View Projects",
      ctaCv: "View / Download Résumé",
      ctaCvText: "View / Download CV",
      ctaContact: "Get in Touch",
      ctaLinkedIn: "LinkedIn",
      metrics: {
        yearsLabel: "Training & Practice (SMX + DAW)",
        automationLabel: "Deployments & Projects",
        perfLabel: "Lighthouse Performance",
        uptimeLabel: "Service Availability"
      }
    },

    // About Section
    about: {
      tag: "About Me",
      title: "Bridging systems administration and networks with web application development.",
      lead: "Multidisciplinary technical profile trained across vocational qualifications in SMX and DAW.",
      p1: "I have a solid grounding in IT infrastructure: hardware assembly, operating systems (Linux/Windows Server), network services (DNS, DHCP, Web, FTP), and IT security. On top of these foundations, I build complete web applications.",
      p2: "In web development, I master both client-side technologies (semantic HTML5, modern CSS3, JavaScript/TypeScript, and Angular) and server-side engineering (PHP, Java, Node.js, relational databases, and application deployment).",
      architectureTitle: "Deployment Architecture: Trigger & Executor",
      architectureDesc: "I build event-driven workflows where triggers (webhooks, git push, cron) deliver structured JSON payloads to executors that process business logic and ensure continuous, resilient delivery.",
      pillars: {
        cleanCodeTitle: "Frontend Development & Accessibility",
        cleanCodeDesc: "Native HTML5 structures, responsive modern CSS, interactive JavaScript, and accessible web standards.",
        perfTitle: "Backend Development & Data",
        perfDesc: "Server logic in PHP/Java/Node.js, relational database design (MySQL/MariaDB), and RESTful APIs.",
        automationTitle: "Systems & Network Services",
        automationDesc: "Configuration of Linux/Windows servers, local area networks, TCP/IP protocols, and network services.",
        uxTitle: "Security & Web Quality",
        uxDesc: "IT security best practices, W3C standards validation, and web performance optimization."
      }
    },

    // Projects Section
    projects: {
      tag: "Projects",
      title: "Real solutions running in production",
      subtitle: "A curated selection of featured projects where design, clean code, and automation unite.",
      filters: {
        all: "All",
        webapps: "Web Apps",
        automation: "Systems & CI/CD",
        graphics: "3D & Interfaces"
      },
      viewLive: "Live Demo",
      viewCode: "GitHub Code",
      roleLabel: "Role:",
      impactLabel: "Result:",
      items: [
        {
          id: "avisa",
          category: "webapps",
          badge: "Live Web App",
          year: "2025",
          title: "AVISA — Issue & Notice Management",
          description: "Comprehensive web platform for real-time reporting, tracking, and resolution of issues and notices. Engineered with a modular architecture, instant user feedback, and accessibility.",
          role: "Frontend Development, UX/UI & Deployment",
          impact: "Fast, accessible, and production-ready application deployed on the web.",
          tags: ["Angular", "TypeScript", "UX/UI", "REST API", "Responsive"],
          liveUrl: "https://jautur.github.io/AVISA-objectiu/",
          githubUrl: "https://github.com/jautur/AVISA"
        },
        {
          id: "telemetry",
          category: "graphics",
          badge: "Data Visualization",
          year: "2024",
          title: "3D Telemetry & Metrics Dashboard",
          description: "Real-time hardware-accelerated monitoring dashboard built with WebGL and Three.js. Specially crafted to run silky smooth even on resource-constrained devices.",
          role: "Graphics & Frontend Engineering",
          impact: "Rock-solid 60 FPS with low memory footprint and automatic viewport sleep cycles.",
          tags: ["Three.js", "WebGL", "JavaScript ES6+", "Performance", "CSS Grid"],
          liveUrl: "#",
          githubUrl: "https://github.com/jautur/portfolio"
        },
        {
          id: "pipeline",
          category: "automation",
          badge: "DevOps & CI/CD",
          year: "2026",
          title: "CI/CD Pipeline: Trigger & Executor",
          description: "Event-driven architecture for continuous integration and delivery. A webhook-based trigger system processing JSON payloads to run automated builds, lint tests, and idempotent deployments.",
          role: "Automation Architecture & CI/CD",
          impact: "Automated quality validation (HTML/CSS/JS) and uninterrupted delivery pipelines.",
          tags: ["GitHub Actions", "CI/CD", "Webhooks", "JSON Payloads", "Linux"],
          liveUrl: "#process",
          githubUrl: "https://github.com/jautur/portfolio"
        }
      ]
    },

    // Skills Section
    skills: {
      tag: "Skills",
      title: "Technical Stack & Core Competencies (SMX & DAW)",
      subtitle: "Competencies acquired across Microcomputer Systems & Networks and Web Application Development.",
      categories: [
        {
          name: "Client-side Web Development (Frontend)",
          desc: "Interactive, accessible, and responsive user interfaces.",
          skills: ["Semantic HTML5 & Accessibility", "CSS3 / Flexbox / Grid", "JavaScript (ES6+) & TypeScript", "Web Frameworks (Angular)", "Three.js & WebGL Graphics", "Responsive Web Design"]
        },
        {
          name: "Server-side Web Development & Databases",
          desc: "Business logic, API integrations, and persistent data storage.",
          skills: ["PHP & Server Programming", "Java & OOP", "Relational Databases (MySQL/MariaDB)", "SQL Queries & Data Modeling", "RESTful APIs & JSON Format", "Node.js Basics"]
        },
        {
          name: "Operating Systems, Networks & Services (SMX)",
          desc: "Installation, configuration, and administration of IT infrastructures.",
          skills: ["Linux (Ubuntu/Debian) & Windows Server", "Local Networks & TCP/IP Protocol", "Network Services (DNS, DHCP, Web, FTP)", "Computer Hardware Assembly & Repair", "IT Security & Backup Strategies", "Bash Shell & Script Automation"]
        },
        {
          name: "Deployment, Git & Web Quality",
          desc: "Version control, application deployment, and continuous optimization.",
          skills: ["Git & GitHub Version Control", "GitHub Actions & Continuous Integration (CI)", "Web Application Deployment (DAW)", "Web Performance & Core Web Vitals", "html-validate & W3C Standards", "Web Servers (Apache / Nginx)"]
        }
      ],
      techStackTitle: "Core Languages & Technologies",
      techStackDesc: "Direct access to the official documentation and ecosystem of each core technology.",
      tech: {
        html5: "Markup & Semantics",
        css3: "Styling & Layout Grid",
        js: "JavaScript ES6+",
        php: "Backend & Server",
        java: "OOP & Backend",
        spring: "Enterprise Framework"
      }
    },

    // Process Section
    process: {
      tag: "Methodology",
      title: "A structured process designed for impact",
      subtitle: "Every phase is carefully calibrated to ensure system reliability, quality, and clean code.",
      steps: [
        {
          number: "01",
          title: "Analysis & Requirements",
          desc: "Assessing user needs, technical scope definition, and planning the deployment and development environment."
        },
        {
          number: "02",
          title: "Design & Architecture",
          desc: "Relational database schema modeling, network/server topology, and component UX/UI design."
        },
        {
          number: "03",
          title: "Development & Testing",
          desc: "Client-side and server-side coding, functional testing, code validation, and security verification."
        },
        {
          number: "04",
          title: "Deployment & Maintenance",
          desc: "Production release on web servers, task automation, monitoring, and regular backups."
        }
      ]
    },

    // Metrics / Insights
    insights: {
      title: "Measurable performance and reliability",
      stat1Number: "98%",
      stat1Label: "Quality & Satisfaction Index",
      stat2Number: "100%",
      stat2Label: "CI Pipeline Validation Pass",
      stat3Number: "< 1s",
      stat3Label: "Initial Page Load Speed",
      stat4Number: "24/7",
      stat4Label: "High Availability on GitHub Pages"
    },

    // Contact Section
    contact: {
      tag: "Contact",
      title: "Have a project in mind?",
      subtitle: "I am open to discuss new opportunities, challenging web architectures, and frontend development.",
      emailLabel: "Email address:",
      emailCopy: "Copy email",
      emailCopied: "Copied to clipboard!",
      githubLabel: "GitHub profile:",
      githubView: "Visit github.com/jautur",
      linkedinLabel: "LinkedIn Profile:",
      linkedinView: "Visit linkedin.com/in/jautur",
      cvLabel: "Curriculum Vitae:",
      cvDownload: "Download CV (PDF)",
      formTitle: "Send me a message",
      nameLabel: "Your Name",
      namePlaceholder: "e.g. John Doe",
      emailInputLabel: "Your Email Address",
      emailPlaceholder: "name@example.com",
      messageLabel: "Message",
      messagePlaceholder: "Share the details of your project or ideas...",
      submitBtn: "Send Message",
      submittingBtn: "Sending...",
      successMsg: "Thank you! Your default mail client will open to finalize sending.",
      validationError: "Please fill in all required fields with valid information."
    },

    // Footer
    footer: {
      copyright: "© 2026 Jaume Tur. All rights reserved.",
      builtWith: "Built with semantic HTML5, modern CSS3, Vanilla JS & Three.js",
      backToTop: "Back to top"
    }
  },

  va: {
    // Document metadata
    meta: {
      title: "Jaume Tur — Desenvolupador Web · Arquitectura Frontend · CI/CD",
      description: "Portfolio professional de Jaume Tur. Desenvolupament web modern, arquitectures reactives, optimització de rendiment i automatització de desplegaments."
    },

    // Navigation
    nav: {
      home: "Inici",
      about: "Sobre mi",
      projects: "Projectes",
      skills: "Habilitats",
      process: "Metodologia",
      contact: "Contacte",
      cv: "CV ↗",
      themeLight: "Mode Dia",
      themeDark: "Mode Nit",
      menuOpen: "Obrir menú de navegació",
      menuClose: "Tancar menú",
      availableStatus: "Disponible per a projectes"
    },

    // Hero Section
    hero: {
      greeting: "Hola, sóc Jaume Tur",
      role: "Desenvolupador Web (DAW) · Tècnic Microinformàtic i Xarxes (SMX)",
      headlinePrefix: "Desenvolupe aplicacions web ",
      headlineHighlight: "completes i robustes",
      headlineSuffix: ", des dels sistemes fins al codi.",
      description: "Titulat en Sistemes Microinformàtics i Xarxes (SMX) i estudiant/desenvolupador de Desenvolupament d'Aplicacions Web (DAW). Especialitzat en frontend (HTML5, CSS3, JS/TS, Angular), backend (PHP, Java, Node.js, SQL), administració de sistemes i xarxes.",
      ctaProjects: "Veure projectes",
      ctaCv: "Veure / Descarregar Currículum Vitae",
      ctaCvText: "Veure / Descarregar CV",
      ctaContact: "Contactar",
      ctaLinkedIn: "LinkedIn",
      metrics: {
        yearsLabel: "Formació & Pràctica (SMX + DAW)",
        automationLabel: "Desplegaments i Projectes",
        perfLabel: "Rendiment Lighthouse",
        uptimeLabel: "Disponibilitat de servicis"
      }
    },

    // About Section
    about: {
      tag: "Sobre mi",
      title: "Integrant l'administració de sistemes i xarxes amb el desenvolupament d'aplicacions web.",
      lead: "Perfil tècnic multidisciplinari format en el Grau Mitjà d'SMX i el Grau Superior de DAW.",
      p1: "Comte amb una base sòlida d'infraestructura: muntatge i manteniment d'equips, sistemes operatius en xarxa (Linux/Windows Server), servicis de xarxa (DNS, DHCP, web, FTP) i seguretat informàtica. Sobre estos fonaments construïsc aplicacions web completes.",
      p2: "En l'àrea de desenvolupament domine tant l'entorn client (HTML5 semàntic, CSS3, JavaScript/TypeScript i frameworks com Angular) com l'entorn servidor (PHP, Java, Node.js, bases de dades relacionals i desplegament d'aplicacions).",
      architectureTitle: "Arquitectura de Desplegament: Disparador & Executor",
      architectureDesc: "Implemente fluxos de treball basats en esdeveniments reactius on disparadors (webhooks, git push, cron) envien payloads a servicis executors que processen la lògica i garantixen entregues contínues i fiables.",
      pillars: {
        cleanCodeTitle: "Desenvolupament Frontend & Accessibilitat",
        cleanCodeDesc: "Estructures HTML5 natives, CSS responsive, JavaScript interactiu i aplicacions web accessibles.",
        perfTitle: "Desenvolupament Backend & Dades",
        perfDesc: "Lògica de servidor en PHP/Java/Node.js, disseny de bases de dades relacionals (MySQL/MariaDB) i APIs REST.",
        automationTitle: "Sistemes & Servicis en Xarxa",
        automationDesc: "Configuració de servidors Linux/Windows, xarxes locals, protocols TCP/IP i servicis de xarxa.",
        uxTitle: "Seguretat & Qualitat Web",
        uxDesc: "Bones pràctiques de seguretat informàtica, validació d'estàndards W3C i optimització web."
      }
    },

    // Projects Section
    projects: {
      tag: "Projectes",
      title: "Solucions reals en producció",
      subtitle: "Una selecció de projectes destacats on disseny, codi i automatització treballen junts.",
      filters: {
        all: "Tots",
        webapps: "Web Apps",
        automation: "Sistemes & CI/CD",
        graphics: "3D & Interfícies"
      },
      viewLive: "Veure demo en viu",
      viewCode: "Veure codi en GitHub",
      roleLabel: "Rol:",
      impactLabel: "Resultat:",
      items: [
        {
          id: "avisa",
          category: "webapps",
          badge: "Web App en Viu",
          year: "2025",
          title: "AVISA — Gestió d'Incidències",
          description: "Plataforma web integral per a la comunicació, seguiment i resolució àgil d'avisos i incidències. Dissenyada amb arquitectura modular, retroalimentació en temps real i accessibilitat.",
          role: "Desenvolupament Frontend, UX/UI i Desplegament",
          impact: "Interfície àgil, accessible i completament funcional desplegada en producció.",
          tags: ["Angular", "TypeScript", "UX/UI", "REST API", "Responsive"],
          liveUrl: "https://jautur.github.io/AVISA-objectiu/",
          githubUrl: "https://github.com/jautur/AVISA"
        },
        {
          id: "telemetry",
          category: "graphics",
          badge: "Data Visualization",
          year: "2024",
          title: "Panell de Mètriques & Telemetria 3D",
          description: "Sistema visual de monitorització en temps real amb renderitzat accelerat per maquinari mitjançant WebGL/Three.js. Dissenyat específicament per a executar-se de manera fluida fins i tot en dispositius de recursos limitats.",
          role: "Enginyeria Gràfica i Frontend",
          impact: "60 FPS estables amb baix consum de memòria i pausat dinàmic de renderitzat.",
          tags: ["Three.js", "WebGL", "JavaScript ES6+", "Performance", "CSS Grid"],
          liveUrl: "#",
          githubUrl: "https://github.com/jautur/portfolio"
        },
        {
          id: "pipeline",
          category: "automation",
          badge: "DevOps & CI/CD",
          year: "2026",
          title: "Pipeline CI/CD: Disparador & Executor",
          description: "Arquitectura orientada a esdeveniments per a integració i desplegament continu. Un sistema de tret per webhooks que processa payloads JSON i executa compilacions, proves automatitzades i desplegaments idempotents.",
          role: "Arquitectura d'Automatització i CI/CD",
          impact: "Validació automàtica de qualitat (HTML/CSS/JS) i entrega contínua sense interrupcions.",
          tags: ["GitHub Actions", "CI/CD", "Webhooks", "JSON Payloads", "Linux"],
          liveUrl: "#proceso",
          githubUrl: "https://github.com/jautur/portfolio"
        }
      ]
    },

    // Skills Section
    skills: {
      tag: "Habilitats",
      title: "Stack tècnic i competències (SMX & DAW)",
      subtitle: "Competències adquirides en Sistemes Microinformàtics i Xarxes i Desenvolupament d'Aplicacions Web.",
      categories: [
        {
          name: "Desenvolupament Web Client (Frontend)",
          desc: "Interfícies web interactives, accessibles i adaptades a qualsevol dispositiu.",
          skills: ["HTML5 semàntic & Accessibilitat", "CSS3 / Flexbox / Grid", "JavaScript (ES6+) & TypeScript", "Frameworks Web (Angular)", "Three.js & Gràfics WebGL", "Disseny Web Adaptatiu (Responsive)"]
        },
        {
          name: "Desenvolupament Web Servidor & Bases de Dades",
          desc: "Lògica de negoci, integració amb APIs i persistència de dades.",
          skills: ["PHP & Programació Servidor", "Java & POO", "Bases de Dades Relacionals (MySQL/MariaDB)", "Consultes SQL & Modelatge de Dades", "APIs RESTful & Format JSON", "Node.js bàsic"]
        },
        {
          name: "Sistemes Operatius, Xarxes & Servicis (SMX)",
          desc: "Instal·lació, configuració i administració d'infraestructures TIC.",
          skills: ["Linux (Ubuntu/Debian) & Windows Server", "Xarxes Locals & Protocol TCP/IP", "Servicis de Xarxa (DNS, DHCP, Web, FTP)", "Muntatge i Manteniment d'Equips", "Seguretat Informàtica & Còpies de Seguretat", "Terminal Bash & Automatització d'scripts"]
        },
        {
          name: "Desplegament, Git & Qualitat Web",
          desc: "Gestió de versions, desplegament d'aplicacions i optimització.",
          skills: ["Control de versions Git & GitHub", "GitHub Actions & Integració Contínua (CI)", "Desplegament d'Aplicacions Web (DAW)", "Web Performance & Core Web Vitals", "html-validate & Validació W3C", "Servidors Web (Apache / Nginx)"]
        }
      ],
      techStackTitle: "Llenguatges i Tecnologies Principals",
      techStackDesc: "Accés directe a la documentació oficial i ecosistema de cada tecnologia que domine.",
      tech: {
        html5: "Marcat & Semàntica",
        css3: "Estils & Grid",
        js: "JavaScript ES6+",
        php: "Backend & Servidor",
        java: "POO & Backend",
        spring: "Framework Empresarial"
      }
    },

    // Process Section
    process: {
      tag: "Metodologia",
      title: "Un procés estructurat orientat a resultats",
      subtitle: "Cada etapa està dissenyada per a garantir qualitat, estabilitat del sistema i codi net.",
      steps: [
        {
          number: "01",
          title: "Anàlisi & Requisits",
          desc: "Estudi de necessitats, definició tècnica del projecte i planificació de l'entorn de sistemes i desenvolupament."
        },
        {
          number: "02",
          title: "Disseny & Arquitectura",
          desc: "Modelatge de base de dades relacional, esquemes de xarxa/servidor i disseny de la interfície d'usuari."
        },
        {
          number: "03",
          title: "Desenvolupament & Proves",
          desc: "Programació en client i servidor, proves funcionals, validació de codi i comprovació de seguretat."
        },
        {
          number: "04",
          title: "Desplegament & Manteniment",
          desc: "Posada en producció en servidor web, automatització de tasques, monitorització i còpies de seguretat."
        }
      ]
    },

    // Metrics / Insights
    insights: {
      title: "Rendiment i fiabilitat mesurables",
      stat1Number: "98%",
      stat1Label: "Índex de qualitat i satisfacció",
      stat2Number: "100%",
      stat2Label: "Validació de codi en CI",
      stat3Number: "< 1s",
      stat3Label: "Temps de càrrega inicial",
      stat4Number: "24/7",
      stat4Label: "Disponibilitat en GitHub Pages"
    },

    // Contact Section
    contact: {
      tag: "Contacte",
      title: "Tens un projecte en ment?",
      subtitle: "Estic disponible per a col·laborar en projectes desafiadors, arquitectures web i desenvolupament frontend.",
      emailLabel: "Correu electrònic:",
      emailCopy: "Copiar correu",
      emailCopied: "Copiat al porta-retalls!",
      githubLabel: "Perfil de GitHub:",
      githubView: "Visitar github.com/jautur",
      linkedinLabel: "Perfil de LinkedIn:",
      linkedinView: "Visitar linkedin.com/in/jautur",
      cvLabel: "Currículum Vitae:",
      cvDownload: "Descarregar CV (PDF)",
      formTitle: "Envia'm un missatge",
      nameLabel: "El teu nom",
      namePlaceholder: "Ex: Marc Pérez",
      emailInputLabel: "El teu correu electrònic",
      emailPlaceholder: "nom@exemple.com",
      messageLabel: "Missatge",
      messagePlaceholder: "Conta'm els detalls del teu projecte o idea...",
      submitBtn: "Enviar missatge",
      submittingBtn: "Enviant...",
      successMsg: "Gràcies! S'obrirà el teu client de correu per a completar l'enviament.",
      validationError: "Per favor, completa tots els camps requerits amb dades vàlides."
    },

    // Footer
    footer: {
      copyright: "© 2026 Jaume Tur. Tots els drets reservats.",
      builtWith: "Construït amb HTML5 semàntic, CSS3 modern, Vanilla JS & Three.js",
      backToTop: "Tornar a dalt"
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = translations;
}

