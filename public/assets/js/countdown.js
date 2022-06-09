const countDownDate = new Date('Sep 26, 2025 08:00:00').getTime();
const countDownContainer = document.querySelector('.event-countdown');
const countDownBoxes = countDownContainer.children;

const x = setInterval(() => {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  countDownBoxes[0].innerText = days + 'd';
  countDownBoxes[1].innerText = hours + 'h';
  countDownBoxes[2].innerText = minutes + 'm';
  countDownBoxes[3].innerText = seconds + 's';

  // If the count down is over, write some text
  if (distance < 0) {
    clearCountDown();
  }
}, 1000);

const clearCountDown = () => {
  for (let i = 0; i < countDownBoxes.length; i++) {
    countDownBoxes[i].innerText = '-';
  }

  const eventEnd = document.querySelector('.event-ends');
  eventEnd.style.display = 'block';

  clearInterval(x);
};
