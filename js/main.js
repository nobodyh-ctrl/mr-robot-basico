// Funcionalidad principal del sitio Mr. Robot
import { initMobileMenu } from './navigation.js'
import { initFormHandling } from './form.js'
import { initGlitchEffects, initScrollEffects, initTypingEffect } from './effects.js'
import { initLocationTracking } from './location.js'
import './seasons.js'

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

// Manejo de errores
window.addEventListener("error", (e) => {
  console.log("[v0] Error capturado:", e.message)
})

// Preloader simple
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
  console.log("[v0] Página completamente cargada")
})