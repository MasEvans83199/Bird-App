// parallax.js

window.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY;

  // Calculate and apply parallax effect to the layers
  // Adjust the values according to your specific layout and desired effect
  const backgroundPosition = -scrollPosition * 0.3;
  const contentPosition = scrollPosition * 0.5;
  const imagePosition = scrollPosition * 0.8;

  // Apply the calculated positions to the respective layers using CSS transforms
  document.getElementById('background').style.transform = `translateY(${backgroundPosition}px)`;
  document.getElementById('content').style.transform = `translateY(${contentPosition}px)`;
  document.getElementById('image').style.transform = `translateY(${imagePosition}px)`;
});
