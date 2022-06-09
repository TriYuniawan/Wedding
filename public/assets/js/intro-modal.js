const introModal = document.querySelector('.intro-modal')
const openButton = document.querySelector('.intro-open-button')
const body = document.querySelector('body')
const homePage = document.querySelector('.container')
const audioPlayer = document.querySelector('.audio-player')

openButton.addEventListener('click', () => {
  introModal.dataset.modal = "hide"
  body.style.overflow = 'auto'

  homePage.dataset.mainDisplay = 'visible'

  audioPlayer.play()
})