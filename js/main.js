// Funcionalidad principal del sitio Mr. Robot

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar todas las funcionalidades
  initMobileMenu()
  initFormHandling()
  initGlitchEffects()
  initScrollEffects()
  initTypingEffect()

  console.log("[v0] Mr. Robot site initialized")
})

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.hacker-map')) {
    initLocationTracking()
  }
})


// Función global para toggle de episodios
window.toggleEpisodes = function(seasonNumber) {
  const episodesList = document.getElementById(`episodes-${seasonNumber}`)
  const button = episodesList.previousElementSibling

  if (episodesList.classList.contains('active')) {
    episodesList.classList.remove('active')
    button.classList.remove('active')
  } else {
    // Cerrar otros dropdowns abiertos
    document.querySelectorAll('.episodes-list.active').forEach(list => {
      list.classList.remove('active')
      list.previousElementSibling.classList.remove('active')
    })

    episodesList.classList.add('active')
    button.classList.add('active')
  }
}

// Menú móvil hamburguesa
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }
}

// Manejo del formulario de contacto
function initFormHandling() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const submitBtn = contactForm.querySelector(".submit-btn")
      const btnText = submitBtn.querySelector(".btn-text")
      const btnLoading = submitBtn.querySelector(".btn-loading")

      // Simular envío del formulario
      submitBtn.classList.add("loading")
      btnText.style.display = "none"
      btnLoading.style.display = "inline"

      // Simular proceso de encriptación
      setTimeout(() => {
        alert("Mensaje encriptado y enviado a fsociety. Te contactaremos pronto.")

        // Resetear formulario
        contactForm.reset()
        submitBtn.classList.remove("loading")
        btnText.style.display = "inline"
        btnLoading.style.display = "none"
      }, 2000)
    })

    // Efectos en los inputs
    const inputs = contactForm.querySelectorAll("input, textarea")
    inputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused")
      })

      input.addEventListener("blur", function () {
        if (!this.value) {
          this.parentElement.classList.remove("focused")
        }
      })
    })
  }
}

// Efectos de glitch adicionales
function initGlitchEffects() {
  // Efecto glitch aleatorio en elementos específicos
  const glitchElements = document.querySelectorAll(".glitch-text")

  glitchElements.forEach((element) => {
    setInterval(() => {
      if (Math.random() < 0.1) {
        // 10% de probabilidad
        element.style.animation = "none"
        setTimeout(() => {
          element.style.animation = "glitch 2s infinite"
        }, 50)
      }
    }, 3000)
  })
}

// Efectos de scroll
function initScrollEffects() {
  // Parallax desactivado
  // window.addEventListener("scroll", () => {
  //   const scrolled = window.pageYOffset
  //   const parallaxElements = document.querySelectorAll(".hero-image")

  //   parallaxElements.forEach((element) => {
  //     const speed = 0.5
  //     element.style.transform = `translateY(${scrolled * speed}px)`
  //   })
  // })

  // Animación de aparición de elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar elementos que deben animarse
  document.querySelectorAll(".season-card, .gallery-item, .contact-grid > *").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

function initLocationTracking() {
  const locationText = document.getElementById('locationText')
  const latElement = document.getElementById('lat')
  const lngElement = document.getElementById('lng')
  const ipElement = document.getElementById('ip')

  // Obtener IP del usuario
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      ipElement.textContent = data.ip
    })
    .catch(() => {
      ipElement.textContent = 'Oculto'
    })

  // Obtener geolocalización del navegador
  if (navigator.geolocation) {
    locationText.textContent = 'Triangulando coordenadas...'

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        latElement.textContent = lat.toFixed(6)
        lngElement.textContent = lng.toFixed(6)
        locationText.textContent = 'Ubicación detectada - Sistema activo'
      },
      (error) => {
        locationText.textContent = 'Acceso denegado - Ubicación protegida'
        latElement.textContent = 'BLOCKED'
        lngElement.textContent = 'BLOCKED'
      }
    )
  } else {
    locationText.textContent = 'Geolocalización no soportada'
    latElement.textContent = 'N/A'
    lngElement.textContent = 'N/A'
  }
}

// Efecto de escritura en terminal
function initTypingEffect() {
  const terminalElements = document.querySelectorAll(".terminal-prompt")

  terminalElements.forEach((element) => {
    const originalText = element.textContent
    element.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < originalText.length) {
        element.textContent += originalText.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      } else {
        // Agregar cursor parpadeante
        const cursor = document.createElement("span")
        cursor.textContent = "_"
        cursor.style.animation = "blink 1s infinite"
        element.appendChild(cursor)
      }
    }

    // Iniciar efecto cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(typeWriter, 500)
          observer.unobserve(entry.target)
        }
      })
    })

    observer.observe(element)
  })
}

// Efectos de matriz (opcional)
function createMatrixEffect() {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.pointerEvents = "none"
  canvas.style.zIndex = "-1"
  canvas.style.opacity = "0.1"

  document.body.appendChild(canvas)

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}"
  const matrixArray = matrix.split("")

  const fontSize = 10
  const columns = canvas.width / fontSize

  const drops = []
  for (let x = 0; x < columns; x++) {
    drops[x] = 1
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#00ff41"
    ctx.font = fontSize + "px monospace"

    for (let i = 0; i < drops.length; i++) {
      const text = matrixArray[Math.floor(Math.random() * matrixArray.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  setInterval(draw, 35)
}

// CSS para animación de cursor
const style = document.createElement("style")
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`
document.head.appendChild(style)

// Activar efecto matriz en páginas específicas (opcional)
if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
  // createMatrixEffect(); // Descomenta para activar el efecto matriz
}

// Manejo de errores
window.addEventListener("error", (e) => {
  console.log("[v0] Error capturado:", e.message)
})

// Preloader simple
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
  console.log("[v0] Página completamente cargada")
})
