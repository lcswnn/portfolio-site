document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.querySelector('.cursor');
  const navbar = document.getElementById('nav-bar');
  
  // Cursor functionality (your existing code)
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  const clickableElements = document.querySelectorAll('a, button, [onclick]');
  
  clickableElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', function() {
      cursor.classList.remove('hover');
    });
  });
  
  // NEW: Navbar scroll functionality
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) { // Add background after scrolling 50px
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});