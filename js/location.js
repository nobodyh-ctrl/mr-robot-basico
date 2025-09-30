// Funcionalidad de rastreo de ubicación
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

export { initLocationTracking }