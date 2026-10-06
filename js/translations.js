/**
 * Dictionary of translations for Jaume Tur's Portfolio & CV
 * Languages: Spanish (es), Valencian (va), and English (en)
 */
const translations = {
  es: {
    meta: {
      title: "Jaume Tur — Desarrollador Web · CV & Portfolio",
      description: "Portfolio y currículum de Jaume Tur. Desarrollo web frontend con Angular, TypeScript, código limpio y CI/CD."
    },
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
    hero: {
      greeting: "Hola, soy Jaume Tur",
      role: "Desarrollador Web · Frontend",
      headlinePrefix: "Desarrollo ",
      headlineHighlight: "Frontend",
      headlineSuffix: " & Aplicaciones Web",
      description: "Enfocado en crear interfaces limpias, accesibles y componentes modulares con Angular, TypeScript y buenas prácticas.",
      ctaProjects: "Ver proyectos",
      ctaContact: "Contactar",
      ctaLinkedIn: "LinkedIn",
      cvCard: {
        title: "// curriculum.profile",
        status: "DISPONIBLE",
        roleLabel: "ROL",
        roleVal: "Desarrollador Web / Frontend",
        stackLabel: "STACK",
        stackVal: "Angular · TypeScript · Node.js",
        focusLabel: "ENFOQUE",
        focusVal: "Interfaces accesibles y código limpio",
        educationLabel: "ESTUDIOS",
        educationVal: "CFGS Desarrollo de Aplicaciones Web",
        locationLabel: "UBICACIÓN",
        locationVal: "Valencia (Híbrido / Remoto)"
      }
    },
    about: {
      tag: "Sobre mí",
      title: "Perfil Profesional",
      lead: "Desarrollador web con base sólida en desarrollo frontend moderno y buenas prácticas de ingeniería de software.",
      p1: "Me centro en escribir código limpio, maquetación semántica accesible y flujos automatizados de prueba y despliegue continuo.",
      architectureTitle: "Arquitectura: Disparador & Ejecutor",
      architectureDesc: "Flujos basados en eventos donde disparadores (webhooks, git push) envían datos JSON a tareas de validación y despliegue automático.",
      pillars: {
        cleanCodeTitle: "Frontend Moderno",
        cleanCodeDesc: "HTML5 semántico, CSS3 avanzado y aplicaciones modulares con Angular.",
        perfTitle: "Calidad & Tipado",
        perfDesc: "Tipado estricto con TypeScript, accesibilidad WCAG y rendimiento.",
        automationTitle: "Integración Continua (CI/CD)",
        automationDesc: "Pipelines en GitHub Actions para pruebas y publicación continua."
      }
    },
    projects: {
      tag: "Proyectos",
      title: "Proyectos destacados",
      subtitle: "Trabajos prácticos desarrollados con foco en usabilidad, rendimiento y código estructurado.",
      filters: {
        all: "Todos",
        webapps: "Web Apps",
        automation: "CI/CD & DevOps",
        graphics: "3D & WebGL"
      },
      viewLive: "Ver demo",
      viewCode: "Ver código",
      roleLabel: "Rol:",
      impactLabel: "Estado:",
      items: [
        {
          id: "avisa",
          category: "webapps",
          badge: "Web App",
          year: "2025",
          title: "AVISA — Gestión de Incidencias",
          description: "Plataforma web para registro, comunicación y seguimiento de incidencias en tiempo real con diseño accesible y modular.",
          role: "Frontend y Despliegue",
          impact: "En producción (GitHub Pages)",
          tags: ["Angular", "TypeScript", "REST API", "UX/UI"],
          liveUrl: "https://jautur.github.io/AVISA-objectiu/",
          githubUrl: "https://github.com/jautur/AVISA"
        },
        {
          id: "telemetry",
          category: "graphics",
          badge: "WebGL / 3D",
          year: "2024",
          title: "Panel Interactivo Three.js",
          description: "Visualizador interactivo con aceleración por hardware en WebGL y optimización para bajo consumo de recursos.",
          role: "Desarrollo Gráfico y Frontend",
          impact: "60 FPS estables y render dinámico",
          tags: ["Three.js", "WebGL", "JavaScript ES6+", "Performance"],
          liveUrl: "#hero",
          githubUrl: "https://github.com/jautur/portfolio"
        },
        {
          id: "pipeline",
          category: "automation",
          badge: "CI/CD",
          year: "2026",
          title: "Pipeline CI/CD Automatizado",
          description: "Flujo automatizado con GitHub Actions que valida sintaxis, estándares de código y publica despliegues continuos.",
          role: "Arquitectura CI/CD",
          impact: "Despliegues automáticos sin interrupción",
          tags: ["GitHub Actions", "CI/CD", "Linters", "Linux"],
          liveUrl: "#proceso",
          githubUrl: "https://github.com/jautur/portfolio"
        }
      ]
    },
    skills: {
      tag: "Habilidades",
      title: "Stack técnico",
      subtitle: "Lenguajes, frameworks y herramientas que utilizo habitualmente en desarrollo.",
      categories: [
        {
          name: "Frontend & UI",
          desc: "Desarrollo de interfaces reactivas, modernas y accesibles.",
          skills: ["HTML5 Semántico", "CSS3 / Flexbox / Grid", "JavaScript (ES6+)", "TypeScript", "Angular", "Three.js / WebGL", "Responsive Web Design"]
        },
        {
          name: "Backend & APIs",
          desc: "Consumo de servicios, intercambio de datos y arquitecturas modulares.",
          skills: ["Node.js", "RESTful APIs", "JSON Payloads", "Arquitectura Trigger/Executor", "Clean Architecture"]
        },
        {
          name: "Herramientas & CI/CD",
          desc: "Control de versiones, pipelines automatizados y entornos Linux.",
          skills: ["Git & GitHub", "GitHub Actions", "Pipelines CI/CD", "Linux Shell / Bash", "npm / Tooling"]
        },
        {
          name: "Calidad & Rendimiento",
          desc: "Estándares web, accesibilidad y optimización.",
          skills: ["Accesibilidad WCAG AA", "Web Performance", "html-validate / Linters", "SEO Técnico"]
        }
      ]
    },
    process: {
      tag: "Metodología",
      title: "Flujo de desarrollo",
      subtitle: "Un método de trabajo ordenado para entregar software fiable y mantenible.",
      steps: [
        {
          number: "01",
          title: "Requisitos & Arquitectura",
          desc: "Definición del alcance técnico, estructura modular y selección del stack idóneo."
        },
        {
          number: "02",
          title: "Diseño & Maquetación",
          desc: "Estructura semántica, accesibilidad y diseño adaptado a todos los dispositivos."
        },
        {
          number: "03",
          title: "Desarrollo Frontend",
          desc: "Implementación con TypeScript, componentes reutilizables y código limpio."
        },
        {
          number: "04",
          title: "Validación & Despliegue",
          desc: "Pruebas automáticas en GitHub Actions y publicación continua a producción."
        }
      ]
    },
    contact: {
      tag: "Contacto",
      title: "Contacto directo",
      subtitle: "Disponible para ofertas de empleo, proyectos o colaboraciones técnicas.",
      emailLabel: "Correo electrónico:",
      emailCopy: "Copiar email",
      emailCopied: "¡Copiado!",
      githubLabel: "Perfil de GitHub:",
      githubView: "github.com/jautur",
      linkedinLabel: "Perfil de LinkedIn:",
      linkedinView: "linkedin.com/in/jautur",
      formTitle: "Enviar mensaje",
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      emailInputLabel: "Correo electrónico",
      emailPlaceholder: "nombre@ejemplo.com",
      messageLabel: "Mensaje",
      messagePlaceholder: "Escribe brevemente tu propuesta o consulta...",
      submitBtn: "Enviar mensaje",
      submittingBtn: "Enviando...",
      successMsg: "¡Gracias! Se abrirá tu cliente de correo para completar el envío.",
      validationError: "Por favor, completa los campos requeridos."
    },
    footer: {
      copyright: "© 2026 Jaume Tur. Portfolio & CV.",
      builtWith: "Construido con HTML5, CSS3, Vanilla JS & Three.js",
      backToTop: "Volver arriba"
    }
  },

  en: {
    meta: {
      title: "Jaume Tur — Web Developer · CV & Portfolio",
      description: "Portfolio and CV of Jaume Tur. Frontend web development with Angular, TypeScript, clean code, and CI/CD."
    },
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      process: "Workflow",
      contact: "Contact",
      themeLight: "Light Mode",
      themeDark: "Dark Mode",
      menuOpen: "Open navigation menu",
      menuClose: "Close menu",
      availableStatus: "Available for projects"
    },
    hero: {
      greeting: "Hello, I am Jaume Tur",
      role: "Web Developer · Frontend",
      headlinePrefix: "Frontend ",
      headlineHighlight: "Developer",
      headlineSuffix: " & Web Applications",
      description: "Focused on building clean, accessible interfaces and modular components with Angular, TypeScript, and engineering best practices.",
      ctaProjects: "View projects",
      ctaContact: "Get in touch",
      ctaLinkedIn: "LinkedIn",
      cvCard: {
        title: "// curriculum.profile",
        status: "AVAILABLE",
        roleLabel: "ROLE",
        roleVal: "Web / Frontend Developer",
        stackLabel: "STACK",
        stackVal: "Angular · TypeScript · Node.js",
        focusLabel: "FOCUS",
        focusVal: "Accessible UI & clean architecture",
        educationLabel: "STUDIES",
        educationVal: "Higher VET in Web App Development",
        locationLabel: "LOCATION",
        locationVal: "Valencia (Hybrid / Remote)"
      }
    },
    about: {
      tag: "About",
      title: "Professional Profile",
      lead: "Web developer with solid technical foundations in modern frontend engineering and software best practices.",
      p1: "I focus on writing clean, semantic, accessible code and automated continuous integration workflows.",
      architectureTitle: "Architecture: Trigger & Executor",
      architectureDesc: "Event-driven workflows where triggers (webhooks, git push) send JSON payloads to automated validation and delivery tasks.",
      pillars: {
        cleanCodeTitle: "Modern Frontend",
        cleanCodeDesc: "Semantic HTML5, advanced modern CSS, and modular Angular apps.",
        perfTitle: "Quality & Typing",
        perfDesc: "Strict typing with TypeScript, WCAG accessibility, and high performance.",
        automationTitle: "Continuous Integration (CI/CD)",
        automationDesc: "GitHub Actions pipelines for automated testing and deployments."
      }
    },
    projects: {
      tag: "Projects",
      title: "Featured Projects",
      subtitle: "Hands-on projects built with a strong focus on usability, performance, and clean code.",
      filters: {
        all: "All",
        webapps: "Web Apps",
        automation: "CI/CD & DevOps",
        graphics: "3D & WebGL"
      },
      viewLive: "Live Demo",
      viewCode: "View Code",
      roleLabel: "Role:",
      impactLabel: "Status:",
      items: [
        {
          id: "avisa",
          category: "webapps",
          badge: "Web App",
          year: "2025",
          title: "AVISA — Issue Management",
          description: "Web application for real-time reporting, tracking, and resolution of civic issues with accessible modular UI.",
          role: "Frontend & Deployment",
          impact: "Live in production (GitHub Pages)",
          tags: ["Angular", "TypeScript", "REST API", "UX/UI"],
          liveUrl: "https://jautur.github.io/AVISA-objectiu/",
          githubUrl: "https://github.com/jautur/AVISA"
        },
        {
          id: "telemetry",
          category: "graphics",
          badge: "WebGL / 3D",
          year: "2024",
          title: "Interactive Three.js Dashboard",
          description: "Hardware-accelerated WebGL interactive visualization optimized for low memory usage and smooth 60 FPS.",
          role: "Graphics & Frontend Development",
          impact: "Rock-solid 60 FPS & dynamic pauses",
          tags: ["Three.js", "WebGL", "JavaScript ES6+", "Performance"],
          liveUrl: "#hero",
          githubUrl: "https://github.com/jautur/portfolio"
        },
        {
          id: "pipeline",
          category: "automation",
          badge: "CI/CD",
          year: "2026",
          title: "Automated CI/CD Pipeline",
          description: "Event-driven GitHub Actions pipeline running linting, syntax verification, and automated static page delivery.",
          role: "CI/CD Architecture",
          impact: "Zero-downtime automated deployment",
          tags: ["GitHub Actions", "CI/CD", "Linters", "Linux"],
          liveUrl: "#process",
          githubUrl: "https://github.com/jautur/portfolio"
        }
      ]
    },
    skills: {
      tag: "Skills",
      title: "Technical Stack",
      subtitle: "Languages, frameworks, and tools I use on a regular basis.",
      categories: [
        {
          name: "Frontend & UI",
          desc: "Developing modern, reactive, accessible user interfaces.",
          skills: ["Semantic HTML5", "CSS3 / Flexbox / Grid", "JavaScript (ES6+)", "TypeScript", "Angular", "Three.js / WebGL", "Responsive Web Design"]
        },
        {
          name: "Backend & APIs",
          desc: "Service consumption, data contracts, and modular structures.",
          skills: ["Node.js", "RESTful APIs", "JSON Payloads", "Trigger/Executor Architecture", "Clean Architecture"]
        },
        {
          name: "Tools & CI/CD",
          desc: "Version control, automated pipelines, and Linux toolchains.",
          skills: ["Git & GitHub", "GitHub Actions", "CI/CD Pipelines", "Linux Shell / Bash", "npm / Tooling"]
        },
        {
          name: "Quality & Performance",
          desc: "Web standards, accessibility, and optimization.",
          skills: ["WCAG AA Accessibility", "Web Performance", "html-validate / Linters", "Technical SEO"]
        }
      ]
    },
    process: {
      tag: "Workflow",
      title: "Development Workflow",
      subtitle: "A structured, clean methodology to deliver reliable and maintainable software.",
      steps: [
        {
          number: "01",
          title: "Requirements & Scope",
          desc: "Technical requirements analysis, component architecture, and optimal stack selection."
        },
        {
          number: "02",
          title: "Design & Layout",
          desc: "Semantic structure, responsive layout, and full device accessibility."
        },
        {
          number: "03",
          title: "Frontend Engineering",
          desc: "Implementation using TypeScript, reusable components, and clean code principles."
        },
        {
          number: "04",
          title: "Testing & Deployment",
          desc: "Automated GitHub Actions checks and continuous release to production."
        }
      ]
    },
    contact: {
      tag: "Contact",
      title: "Get in Touch",
      subtitle: "Available for job opportunities, projects, or technical collaboration.",
      emailLabel: "Email address:",
      emailCopy: "Copy email",
      emailCopied: "Copied!",
      githubLabel: "GitHub profile:",
      githubView: "github.com/jautur",
      linkedinLabel: "LinkedIn profile:",
      linkedinView: "linkedin.com/in/jautur",
      formTitle: "Send a message",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailInputLabel: "Email address",
      emailPlaceholder: "name@example.com",
      messageLabel: "Message",
      messagePlaceholder: "Briefly outline your project or query...",
      submitBtn: "Send message",
      submittingBtn: "Sending...",
      successMsg: "Thank you! Your mail client will open to finalize sending.",
      validationError: "Please fill in all required fields."
    },
    footer: {
      copyright: "© 2026 Jaume Tur. Portfolio & CV.",
      builtWith: "Built with HTML5, CSS3, Vanilla JS & Three.js",
      backToTop: "Back to top"
    }
  },

  va: {
    meta: {
      title: "Jaume Tur — Desenvolupador Web · CV & Portfolio",
      description: "Portfolio i currículum de Jaume Tur. Desenvolupament web frontend amb Angular, TypeScript, codi net i CI/CD."
    },
    nav: {
      home: "Inici",
      about: "Sobre mi",
      projects: "Projectes",
      skills: "Habilitats",
      process: "Metodologia",
      contact: "Contacte",
      themeLight: "Mode Dia",
      themeDark: "Mode Nit",
      menuOpen: "Obrir menú de navegació",
      menuClose: "Tancar menú",
      availableStatus: "Disponible per a projectes"
    },
    hero: {
      greeting: "Hola, sóc Jaume Tur",
      role: "Desenvolupador Web · Frontend",
      headlinePrefix: "Desenvolupament ",
      headlineHighlight: "Frontend",
      headlineSuffix: " & Aplicacions Web",
      description: "Enfocat a crear interfícies netes, accessibles i components modulars amb Angular, TypeScript i bones pràctiques.",
      ctaProjects: "Veure projectes",
      ctaContact: "Contactar",
      ctaLinkedIn: "LinkedIn",
      cvCard: {
        title: "// curriculum.profile",
        status: "DISPONIBLE",
        roleLabel: "ROL",
        roleVal: "Desenvolupador Web / Frontend",
        stackLabel: "STACK",
        stackVal: "Angular · TypeScript · Node.js",
        focusLabel: "ENFOCAMENT",
        focusVal: "Interfícies accessibles i codi net",
        educationLabel: "ESTUDIS",
        educationVal: "CFGS Desenvolupament d'Aplicacions Web",
        locationLabel: "UBICACIÓ",
        locationVal: "València (Híbrid / Remot)"
      }
    },
    about: {
      tag: "Sobre mi",
      title: "Perfil Professional",
      lead: "Desenvolupador web amb base sòlida en desenvolupament frontend modern i bones pràctiques d'enginyeria de programari.",
      p1: "Em centre a escriure codi net, maquetació semàntica accessible i fluxos automatitzats de prova i desplegament continu.",
      architectureTitle: "Arquitectura: Disparador & Executor",
      architectureDesc: "Fluxos basats en esdeveniments on disparadors (webhooks, git push) envien dades JSON a tasques de validació i desplegament automàtic.",
      pillars: {
        cleanCodeTitle: "Frontend Modern",
        cleanCodeDesc: "HTML5 semàntic, CSS3 avançat i aplicacions modulars amb Angular.",
        perfTitle: "Qualitat & Tipat",
        perfDesc: "Tipat estricte amb TypeScript, accessibilitat WCAG i rendiment.",
        automationTitle: "Integració Contínua (CI/CD)",
        automationDesc: "Pipelines en GitHub Actions per a proves i publicació contínua."
      }
    },
    projects: {
      tag: "Projectes",
      title: "Projectes destacats",
      subtitle: "Treballs pràctics desenvolupats amb focus en usabilitat, rendiment i codi estructurat.",
      filters: {
        all: "Tots",
        webapps: "Web Apps",
        automation: "CI/CD & DevOps",
        graphics: "3D & WebGL"
      },
      viewLive: "Veure demo",
      viewCode: "Veure codi",
      roleLabel: "Rol:",
      impactLabel: "Estat:",
      items: [
        {
          id: "avisa",
          category: "webapps",
          badge: "Web App",
          year: "2025",
          title: "AVISA — Gestió d'Incidències",
          description: "Plataforma web per a registre, comunicació i seguiment d'incidències en temps real amb disseny accessible i modular.",
          role: "Frontend i Desplegament",
          impact: "En producció (GitHub Pages)",
          tags: ["Angular", "TypeScript", "REST API", "UX/UI"],
          liveUrl: "https://jautur.github.io/AVISA-objectiu/",
          githubUrl: "https://github.com/jautur/AVISA"
        },
        {
          id: "telemetry",
          category: "graphics",
          badge: "WebGL / 3D",
          year: "2024",
          title: "Panell Interactiu Three.js",
          description: "Visualitzador interactiu amb acceleració per maquinari en WebGL i optimització per a baix consum de recursos.",
          role: "Desenvolupament Gràfic i Frontend",
          impact: "60 FPS estables i render dinàmic",
          tags: ["Three.js", "WebGL", "JavaScript ES6+", "Performance"],
          liveUrl: "#hero",
          githubUrl: "https://github.com/jautur/portfolio"
        },
        {
          id: "pipeline",
          category: "automation",
          badge: "CI/CD",
          year: "2026",
          title: "Pipeline CI/CD Automatitzat",
          description: "Flux automatitzat amb GitHub Actions que valida sintaxi, estàndards de codi i publica desplegaments continus.",
          role: "Arquitectura CI/CD",
          impact: "Desplegaments automàtics sense interrupció",
          tags: ["GitHub Actions", "CI/CD", "Linters", "Linux"],
          liveUrl: "#proceso",
          githubUrl: "https://github.com/jautur/portfolio"
        }
      ]
    },
    skills: {
      tag: "Habilitats",
      title: "Stack tècnic",
      subtitle: "Llenguatges, frameworks i eines que utilitze habitualment en desenvolupament.",
      categories: [
        {
          name: "Frontend & UI",
          desc: "Desenvolupament d'interfícies reactives, modernes i accessibles.",
          skills: ["HTML5 Semàntic", "CSS3 / Flexbox / Grid", "JavaScript (ES6+)", "TypeScript", "Angular", "Three.js / WebGL", "Responsive Web Design"]
        },
        {
          name: "Backend & APIs",
          desc: "Consum de servicis, intercanvi de dades i arquitectures modulars.",
          skills: ["Node.js", "RESTful APIs", "JSON Payloads", "Arquitectura Trigger/Executor", "Clean Architecture"]
        },
        {
          name: "Eines & CI/CD",
          desc: "Control de versions, pipelines automatitzats i entorns Linux.",
          skills: ["Git & GitHub", "GitHub Actions", "Pipelines CI/CD", "Linux Shell / Bash", "npm / Tooling"]
        },
        {
          name: "Qualitat & Rendiment",
          desc: "Estàndards web, accessibilitat i optimització.",
          skills: ["Accessibilitat WCAG AA", "Web Performance", "html-validate / Linters", "SEO Tècnic"]
        }
      ]
    },
    process: {
      tag: "Metodologia",
      title: "Flux de desenvolupament",
      subtitle: "Un mètode de treball ordenat per a entregar programari fiable i mantenible.",
      steps: [
        {
          number: "01",
          title: "Requisits & Arquitectura",
          desc: "Definició de l'abast tècnic, estructura modular i selecció de l'stack idoni."
        },
        {
          number: "02",
          title: "Disseny & Maquetació",
          desc: "Estructura semàntica, accessibilitat i disseny adaptat a tots els dispositius."
        },
        {
          number: "03",
          title: "Desenvolupament Frontend",
          desc: "Implementació amb TypeScript, components reutilitzables i codi net."
        },
        {
          number: "04",
          title: "Validació & Desplegament",
          desc: "Proves automàtiques en GitHub Actions i publicació contínua a producció."
        }
      ]
    },
    contact: {
      tag: "Contacte",
      title: "Contacte directe",
      subtitle: "Disponible per a ofertes de treball, projectes o col·laboracions tècniques.",
      emailLabel: "Correu electrònic:",
      emailCopy: "Copiar correu",
      emailCopied: "Copiat!",
      githubLabel: "Perfil de GitHub:",
      githubView: "github.com/jautur",
      linkedinLabel: "Perfil de LinkedIn:",
      linkedinView: "linkedin.com/in/jautur",
      formTitle: "Enviar missatge",
      nameLabel: "Nom",
      namePlaceholder: "El teu nom",
      emailInputLabel: "Correu electrònic",
      emailPlaceholder: "nom@exemple.com",
      messageLabel: "Missatge",
      messagePlaceholder: "Escriu breument la teua proposta o consulta...",
      submitBtn: "Enviar missatge",
      submittingBtn: "Enviant...",
      successMsg: "Gràcies! S'obrirà el teu client de correu per a completar l'enviament.",
      validationError: "Per favor, completa els camps requerits."
    },
    footer: {
      copyright: "© 2026 Jaume Tur. Portfolio & CV.",
      builtWith: "Construït amb HTML5, CSS3, Vanilla JS & Three.js",
      backToTop: "Tornar a dalt"
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = translations;
}
