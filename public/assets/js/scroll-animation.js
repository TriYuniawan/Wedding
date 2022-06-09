const headerTitle = document.querySelector('.detail-header-title');
const brideDetail = document.querySelector('.bride-detail');
const groomDetail = document.querySelector('.groom-detail');
const hearIcon = document.querySelector('.heart-icon-animation');

const eventDate = document.querySelector('.event-date');
const eventMessage = document.querySelector('.event-message');
const eventDetailHeader = document.querySelector('.event-detail-header');
const eventLocationButton = document.querySelector('.event-location-button');

const eventGallerySection = document.querySelector('.event-gallery-section');

const rsvpContent = document.querySelector('.rsvp-content');
const rsvpFormAnimate = document.querySelector('.rsvp-form');

const detailElements = [headerTitle, brideDetail, groomDetail, hearIcon, eventDate, eventMessage, eventDetailHeader, eventLocationButton, eventGallerySection, rsvpContent, rsvpFormAnimate];

const observer = new IntersectionObserver((entries) => {
  entries.map((entry) => {
    if (entry.isIntersecting) entry.target.dataset.animate = 'show';
    else entry.target.dataset.animate = 'hide';
  });
});

detailElements.map((el) => observer.observe(el));
