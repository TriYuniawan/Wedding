// 
//  Open menu
// 
const menuButton = document.querySelector('.menu-button')
const menu = document.querySelector('.menu')
const menuStyle = window.getComputedStyle(menu)

menuButton.addEventListener('click', () => {
  if (menuStyle.height === '0px') {
    menu.classList.add('menu-open')
  } else {
    menu.classList.remove('menu-open')
  }
})


// 
//  Change prev and next button opacity
//  when mouse enter or leave the carousel section
// 
const mainSection = document.querySelector('.main-section')
const buttonOverflow = document.querySelectorAll('.button-overflow')

mainSection.addEventListener('mouseenter', () => {
  buttonOverflow.forEach(button => button.style.opacity = '1')
})
mainSection.addEventListener('mouseleave', () => {
  buttonOverflow.forEach(button => button.style.opacity = '0')
})


// 
//  Carousel and dots indicator handler
// 
const prevButton = document.querySelector('.prev')
const nextButton = document.querySelector('.next')
const carouselItem = document.querySelectorAll('.content-image')
const carouselIndicator = document.querySelector('.carousel-indicators')

prevButton.addEventListener('click', () => handleSlideClick(-1))
nextButton.addEventListener('click', () => handleSlideClick(1))


let activeItem = 0

const handleSlideClick = (direction) => {
  activeItem += direction

  if (activeItem >= carouselItem.length) activeItem = 0
  if (activeItem < 0) activeItem = carouselItem.length - 1

  handleElementChange()
}

//  Craeting dots indicator based on the number of carousel items
carouselItem.forEach((_, index) => {
  const dotElement = document.createElement('div')
  dotElement.classList.add('dot')
  dotElement.addEventListener('click', () => {
    activeItem = index
    handleElementChange()
  })

  carouselIndicator.appendChild(dotElement)
})

const handleElementChange = () => {
  const inactiveElementHandler = (opacity) => (carouselItem, index) => {
    if (index !== activeItem) {
      carouselItem.style.opacity = opacity
      carouselItem.style.zIndex = '0'
    }
  }

  carouselItem[activeItem].style.opacity = '1'
  carouselItem[activeItem].style.zIndex = '1'
  carouselItem.forEach(inactiveElementHandler('0'))

  const activeContentItem = carouselItem[activeItem].querySelectorAll('.carousel-item-content')
  const activeContentScroll = carouselItem[activeItem].querySelector('.scroll-indicator')

  const defaultMatrixPosition = 'matrix3d(1, 0, 0.00, 0, 0.00, 1, 0.00, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
  const rotateMatrixPosition = 'matrix3d(1, 0, 0, 0, 0, 0, 1, -0.004, 0, -1, 0, 0, 0, 0, 0, 1)'
  let delay = 0

  //  Set show rotate animation for carousel content item
  activeContentItem.forEach(carouselContent => {
    carouselContent.style.transform = defaultMatrixPosition
    carouselContent.style.transitionDelay = delay + 's'

    delay += 0.5
  })
  activeContentScroll.style.transform = defaultMatrixPosition
  activeContentScroll.style.transitionDelay = delay + 's'

  //  Set hide rotate animation for carousel content item
  carouselItem.forEach((inactiveCarousel, index) => {
    if (index !== activeItem) {
      const inactiveContentItem = inactiveCarousel.querySelectorAll('.carousel-item-content')
      inactiveContentItem.forEach(carouselContent => {
        carouselContent.style.transform = rotateMatrixPosition
        carouselContent.style.transitionDelay = '0s'
      })

      const ictiveContentScroll = carouselItem[index].querySelector('.scroll-indicator')
      ictiveContentScroll.style.transform = rotateMatrixPosition
      ictiveContentScroll.style.transitionDelay = '0s'
    }
  })

  const carouselDots = document.querySelectorAll('.dot')
  carouselDots[activeItem].style.opacity = '1'
  carouselDots.forEach(inactiveElementHandler('0.5'))
}

// 
//  Initial carousel state
// 
handleElementChange()


// 
// Toggle to play and pause background music
//  
const musicButton = document.querySelector('.bg-music')
const musicPlayer = document.querySelector('.audio-player')

musicButton.addEventListener('click', () => {
  musicPlayer.muted = !musicPlayer.muted

  const setIcon = musicPlayer.muted ? 'music_off' : 'music_note'
  musicButton.querySelector('.material-icons').innerHTML = setIcon
})