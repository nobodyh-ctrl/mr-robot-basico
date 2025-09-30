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