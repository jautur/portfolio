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
      themeLight: "Modo Día",
      themeDark: "Modo Noche",
      menuOpen: "Abrir menú de navegación",
      menuClose: "Cerrar menú",
      availableStatus: "Disponible para proyectos"
    },

    // Hero Section
    hero: {
      greeting: "Hola, soy Jaume Tur",
      role: "Desarrollador Web · Automatización · CI/CD",
      headlinePrefix: "Construyo experiencias web ",
      headlineHighlight: "rápidas, robustas",
      headlineSuffix: " y orientadas al rendimiento.",
      description: "Especializado en ingeniería frontend, interfaces reactivas y sistemas de integración continua. Combino código limpio con arquitecturas escalables que resuelven problemas reales.",
      ctaProjects: "Ver proyectos",
      ctaContact: "Contactar",
      ctaLinkedIn: "LinkedIn",
      metrics: {
        yearsLabel: "Años de experiencia",
        automationLabel: "Automatizaciones activas",
        perfLabel: "Rendimiento Lighthouse",
        uptimeLabel: "Disponibilidad de servicios"
      }
    },

    // About Section
    about: {
      tag: "Sobre mí",
      title: "Transformando ideas complejas en interfaces limpias y arquitecturas predecibles.",
      lead: "Soy desarrollador web enfocado en la intersección entre diseño de interacción, arquitectura frontend y automatización de procesos.",
      p1: "Mi enfoque de trabajo se basa en principios de ingeniería de software sólidos: código modular, tipado estricto, accesibilidad (WCAG) y optimización de carga sin dependencias superfluas.",
      p2: "Me apasiona crear productos digitales donde cada interacción sea fluida y cada flujo de despliegue esté protegido por pruebas continuas y validaciones rigurosas.",
      architectureTitle: "Arquitectura de Despliegue: Disparador & Ejecutor",
      architectureDesc: "Implemento flujos de trabajo basados en eventos reactivos donde disparadores (webhooks, git push, cron) envían payloads a servicios ejecutores idempotentes que garantizan entregas seguras y sin fallos.",
      pillars: {
        cleanCodeTitle: "Código Limpio & Semántico",
        cleanCodeDesc: "Estructuras HTML5 nativas, CSS moderno sin bloat y JavaScript/TypeScript estructurado.",
        perfTitle: "Alto Rendimiento",
        perfDesc: "Cargas instantáneas, minimización de layouts forzados y gráficos WebGL ligeros.",
        automationTitle: "Integración Continua (CI/CD)",
        automationDesc: "Pipelines automatizados de pruebas, linters y despliegues automáticos.",
        uxTitle: "Enfoque en Accesibilidad (a11y)",
        uxDesc: "Navegación por teclado completa, contrastes verificados y semántica inclusiva."
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
      title: "Stack técnico y competencias",
      subtitle: "Herramientas y tecnologías que utilizo para construir soluciones duraderas y de alta calidad.",
      categories: [
        {
          name: "Frontend & UI Engineering",
          desc: "Desarrollo de interfaces reactivas, modernas y de alto rendimiento.",
          skills: ["HTML5 Semántico", "CSS3 / Flexbox / Grid", "JavaScript (ES6+)", "TypeScript", "Angular", "Three.js / WebGL", "Responsive Web Design"]
        },
        {
          name: "Arquitectura & Backend",
          desc: "Estructuración de datos, lógica de negocio y comunicación de servicios.",
          skills: ["Node.js", "RESTful APIs", "JSON Payloads", "Arquitectura Trigger/Executor", "Microservicios", "Clean Architecture"]
        },
        {
          name: "Herramientas, Git & CI/CD",
          desc: "Automatización de despliegues, control de versiones y entornos de desarrollo.",
          skills: ["Git & GitHub", "GitHub Actions", "Pipelines CI/CD", "Webhooks de automatización", "Linux Shell / Bash", "npm / Node tooling"]
        },
        {
          name: "Calidad, SEO & Rendimiento",
          desc: "Garantía de estándares, accesibilidad y máxima velocidad de carga.",
          skills: ["Web Performance (Core Web Vitals)", "Accesibilidad WCAG AA", "SEO Técnico & Metadatos", "html-validate / Linters", "Cross-browser Testing"]
        }
      ]
    },

    // Process Section
    process: {
      tag: "Metodología",
      title: "Un proceso estructurado orientado a resultados",
      subtitle: "Cada etapa está diseñada para minimizar la fricción técnica y maximizar el valor del producto.",
      steps: [
        {
          number: "01",
          title: "Diagnóstico & Requisitos",
          desc: "Análisis del problema, definición del alcance técnico, selección del stack óptimo y establecimiento de objetivos de rendimiento y accesibilidad."
        },
        {
          number: "02",
          title: "Diseño & Arquitectura",
          desc: "Creación de la estructura visual, flujos de usuario, diseño de contratos de datos (JSON) y definición de la arquitectura de componentes."
        },
        {
          number: "03",
          title: "Desarrollo & Pruebas",
          desc: "Implementación con código limpio y tipado, pruebas unitarias y de validación automática en cada confirmación de código."
        },
        {
          number: "04",
          title: "CI/CD & Optimización",
          desc: "Despliegue automático mediante pipelines continuos, auditorías de Lighthouse, verificación de accesibilidad y monitorización activa."
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
      themeLight: "Light Mode",
      themeDark: "Dark Mode",
      menuOpen: "Open navigation menu",
      menuClose: "Close menu",
      availableStatus: "Available for projects"
    },

    // Hero Section
    hero: {
      greeting: "Hello, I am Jaume Tur",
      role: "Web Developer · Automation · CI/CD",
      headlinePrefix: "I build web experiences that are ",
      headlineHighlight: "fast, resilient",
      headlineSuffix: " and performance-driven.",
      description: "Specialized in frontend engineering, reactive interfaces, and continuous integration systems. Combining clean code with scalable architectures to solve real problems.",
      ctaProjects: "View Projects",
      ctaContact: "Get in Touch",
      ctaLinkedIn: "LinkedIn",
      metrics: {
        yearsLabel: "Years of Experience",
        automationLabel: "Active Automations",
        perfLabel: "Lighthouse Performance",
        uptimeLabel: "Service Availability"
      }
    },

    // About Section
    about: {
      tag: "About Me",
      title: "Turning complex ideas into clear interfaces and predictable architectures.",
      lead: "I am a web developer focused on the intersection of interaction design, frontend architecture, and process automation.",
      p1: "My approach is grounded in sound software engineering principles: modular code, strict typing, WCAG accessibility, and instant loading times without unnecessary bloat.",
      p2: "I enjoy building digital products where every interaction is effortless and every deployment workflow is safeguarded by automated testing and rigorous validation.",
      architectureTitle: "Deployment Architecture: Trigger & Executor",
      architectureDesc: "I build event-driven workflows where triggers (webhooks, git push, cron) deliver structured JSON payloads to idempotent executors, guaranteeing safe and resilient deployments.",
      pillars: {
        cleanCodeTitle: "Clean & Semantic Code",
        cleanCodeDesc: "Native HTML5 structures, lean modern CSS, and structured JavaScript/TypeScript.",
        perfTitle: "High Performance",
        perfDesc: "Instant loading, zero forced reflows, and lightweight WebGL rendering.",
        automationTitle: "Continuous Integration (CI/CD)",
        automationDesc: "Automated test suites, linters, and headless zero-downtime deployment pipelines.",
        uxTitle: "Accessibility First (a11y)",
        uxDesc: "Full keyboard navigation, verified color contrast, and inclusive semantics."
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
      title: "Technical stack and core competencies",
      subtitle: "The tools, languages, and methodologies I leverage to engineer enduring solutions.",
      categories: [
        {
          name: "Frontend & UI Engineering",
          desc: "Crafting modern, reactive, high-performance interfaces.",
          skills: ["Semantic HTML5", "CSS3 / Flexbox / Grid", "JavaScript (ES6+)", "TypeScript", "Angular", "Three.js / WebGL", "Responsive Web Design"]
        },
        {
          name: "Architecture & Backend",
          desc: "Structuring data models, business logic, and resilient services.",
          skills: ["Node.js", "RESTful APIs", "JSON Payloads", "Trigger/Executor Architecture", "Microservices", "Clean Architecture"]
        },
        {
          name: "Tools, Git & CI/CD",
          desc: "Automating deployments, version control, and development toolchains.",
          skills: ["Git & GitHub", "GitHub Actions", "CI/CD Pipelines", "Webhook Automation", "Linux Shell / Bash", "npm / Node tooling"]
        },
        {
          name: "Quality, SEO & Performance",
          desc: "Guaranteeing high standards, accessibility, and fast load speeds.",
          skills: ["Web Performance (Core Web Vitals)", "WCAG AA Accessibility", "Technical SEO & Metadata", "html-validate / Linters", "Cross-browser Testing"]
        }
      ]
    },

    // Process Section
    process: {
      tag: "Methodology",
      title: "A structured process designed for impact",
      subtitle: "Every phase is carefully calibrated to reduce technical friction and maximize software value.",
      steps: [
        {
          number: "01",
          title: "Discovery & Requirements",
          desc: "Analyzing the problem domain, establishing technical scope, selecting optimal toolchains, and locking performance benchmarks."
        },
        {
          number: "02",
          title: "Design & Architecture",
          desc: "Wireframing user flows, defining clean JSON data contracts, and mapping modular component boundaries."
        },
        {
          number: "03",
          title: "Development & Testing",
          desc: "Writing typed, maintainable code with strict linting, automated unit testing, and immediate feedback loops."
        },
        {
          number: "04",
          title: "CI/CD & Optimization",
          desc: "Automated deployments via headless pipelines, continuous Lighthouse benchmarking, and zero-downtime releases."
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
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = translations;
}

