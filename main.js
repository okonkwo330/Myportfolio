// Show the current year in the footer (dynamic content update)
document.getElementById('year').textContent = new Date().getFullYear();

// Open / close the menu on small screens (event handling + DOM)
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', function () {
  navLinks.classList.toggle('show');
});


// 1. Show the current year in the footer
