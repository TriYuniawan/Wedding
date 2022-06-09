const database = window.firebase.database();
const rsvpDatabase = database.ref('rsvp');

const wishesContainer = document.querySelector('.wishes-container');
const prevWishesButton = document.querySelector('.wishes-prev');
const nextWishesButton = document.querySelector('.wishes-next');

rsvpDatabase.on('value', (snapshots) => {
  if (snapshots.exists()) {
    const rsvpList = snapshots.val();

    for (let key in rsvpList) {
      wishesContainer.innerHTML += `
      <div class="wishes-card">
        <span class="guest-name">${rsvpList[key].name}</span>
        <span class="guest-wishes">${rsvpList[key].wishes}</span>
      </div>
      `;
    }
  } else {
    nextWishesButton.style.display = 'none';
    prevWishesButton.style.display = 'none';
  }
});

let activeIndex = 0;
let margin = 0;

const changeButtonOpacity = () => {
  if (activeIndex === 0) {
    prevWishesButton.style.opacity = 0.6;
    nextWishesButton.style.opacity = 1;
  }
  if (activeIndex === wishesContainer.childElementCount - 1) {
    prevWishesButton.style.opacity = 1;
    nextWishesButton.style.opacity = 0.6;
  }
};
changeButtonOpacity();

prevWishesButton.addEventListener('click', () => {
  if (activeIndex !== 0) {
    margin += 100;
    wishesContainer.children[0].style.marginLeft = margin + '%';
    activeIndex--;
  }

  changeButtonOpacity();
});

nextWishesButton.addEventListener('click', () => {
  if (activeIndex !== wishesContainer.childElementCount - 1) {
    margin -= 100;
    wishesContainer.children[0].style.marginLeft = margin + '%';
    activeIndex++;
  }

  changeButtonOpacity();
});

//
//  RSVP Form handler
//
const rsvpForm = document.querySelector('.rsvp-form');
const error = document.querySelector('.error-message');

rsvpForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  error.innerHTML = '';

  const nameValue = rsvpForm.elements['name'].value;
  const attendingValue = rsvpForm.elements['attending'].value;
  const personValue = rsvpForm.elements['person'].value;
  const wishesValue = rsvpForm.elements['wishes'].value;

  if (!nameValue) {
    return (error.innerHTML = 'Name field is required');
  }
  if (!attendingValue) {
    return (error.innerHTML = 'Attending selection is required');
  }
  if (!personValue) {
    return (error.innerHTML = 'Person selection is required');
  }
  if (!wishesValue) {
    return (error.innerHTML = 'Wishes field is required');
  }

  await rsvpDatabase.push().set({
    name: nameValue,
    attending: attendingValue,
    person: personValue,
    wishes: wishesValue,
  });

  rsvpForm.elements['name'].value = '';
  rsvpForm.elements['attending'].value = '';
  rsvpForm.elements['person'].value = '';
  rsvpForm.elements['wishes'].value = '';

  window.location.reload();
});
