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

// CSS para animación de cursor
const style = document.createElement("style")
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`
document.head.appendChild(style)

export { initGlitchEffects, initScrollEffects, initTypingEffect }