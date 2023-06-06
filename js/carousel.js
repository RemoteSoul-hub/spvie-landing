(function() {
const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;
const scrollSpeed = 10; // Adjust the scroll speed as desired

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchstart', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('touchcancel', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('touchend', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});

const dotsContainer = document.querySelector('.dots');
const carouselItems = document.querySelectorAll('.item');
let activeIndex = 0;

function createDot(index) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.addEventListener('click', () => {
    setActiveItem(index);
  });
  dotsContainer.appendChild(dot);
}

function setActiveDot(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function setActiveItem(index) {
  activeIndex = index;
  smoothScrollTo(index * slider.offsetWidth);
}

// Call createDot for each carousel item
carouselItems.forEach((item, index) => {
  createDot(index);
});

// Set the initial active dot
setActiveDot(activeIndex);

// Update active dot when scrolling
slider.addEventListener('scroll', () => {
  const scrollPosition = Math.round(slider.scrollLeft / slider.offsetWidth);
  setActiveDot(scrollPosition);
});

// Scroll arrows
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');

leftArrow.addEventListener('click', () => {
  smoothScrollTo(slider.scrollLeft - slider.offsetWidth);
});

rightArrow.addEventListener('click', () => {
  smoothScrollTo(slider.scrollLeft + slider.offsetWidth);
});

function smoothScrollTo(target) {
  const duration = 500; // Adjust the scroll duration as desired
  const startTime = performance.now();
  const start = slider.scrollLeft;
  const distance = target - start;

  function scrollStep(timestamp) {
    const currentTime = timestamp - startTime;
    const scrollProgress = Math.min(currentTime / duration, 1);
    const scrollValue = start + distance * ease(scrollProgress);
    slider.scrollLeft = scrollValue;

    if (currentTime < duration) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

function ease(t) {
  return t * (2 - t);
}

})();


