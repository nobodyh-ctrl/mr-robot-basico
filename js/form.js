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

export { initFormHandling }