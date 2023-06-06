(function() {
    const reviewSlider = document.querySelector('.reviews');
    let isDown = false;
    let startX;
    let scrollLeft;
  
    reviewSlider.addEventListener('mousedown', (e) => {
      isDown = true;
      reviewSlider.classList.add('active');
      startX = e.pageX - reviewSlider.offsetLeft;
      scrollLeft = reviewSlider.scrollLeft;
    });
  
    reviewSlider.addEventListener('touchstart', (e) => {
      isDown = true;
      reviewSlider.classList.add('active');
      startX = e.touches[0].pageX - reviewSlider.offsetLeft;
      scrollLeft = reviewSlider.scrollLeft;
    });
  
    reviewSlider.addEventListener('mouseleave', () => {
      isDown = false;
      reviewSlider.classList.remove('active');
    });
  
    reviewSlider.addEventListener('touchcancel', () => {
      isDown = false;
      reviewSlider.classList.remove('active');
    });
  
    reviewSlider.addEventListener('mouseup', () => {
      isDown = false;
      reviewSlider.classList.remove('active');
    });
  
    reviewSlider.addEventListener('touchend', () => {
      isDown = false;
      reviewSlider.classList.remove('active');
    });
  
    reviewSlider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - reviewSlider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      reviewSlider.scrollLeft = scrollLeft - walk;
    });
  
    reviewSlider.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - reviewSlider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      reviewSlider.scrollLeft = scrollLeft - walk;
    });
  
  })();