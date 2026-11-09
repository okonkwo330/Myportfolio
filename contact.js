/* ========= CONTACT FORM VALIDATION ========= */

const form = document.getElementById('contactForm');

// Small helper that writes an error message under a field
function showError(fieldId, message) {
  document.getElementById(fieldId + 'Error').textContent = message;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();   // stop the page from reloading
  let isValid = true;

  // --- Read what the user typed ---
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();

  // --- 1. Name must not be empty ---
  if (name === '') {
    showError('name', 'Please enter your name.');
    isValid = false;
  } else {
    showError('name', '');
  }

  // --- 2. Email must not be empty AND must be a valid format ---
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // something@something.something
  if (email === '') {
    showError('email', 'Please enter your email address.');
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showError('email', 'Enter a valid email, e.g. you@example.com');
    isValid = false;
  } else {
    showError('email', '');
  }

  // --- 3. Phone must not be empty AND contain digits only ---
  const digitsOnly = /^\d+$/;    // only 0-9, nothing else
  if (phone === '') {
    showError('phone', 'Please enter your phone number.');
    isValid = false;
  } else if (!digitsOnly.test(phone)) {
    showError('phone', 'Phone number must contain digits only.');
    isValid = false;
  } else {
    showError('phone', '');
  }

  // --- 4. Message must not be empty ---
  if (message === '') {
    showError('message', 'Please enter a message.');
    isValid = false;
  } else {
    showError('message', '');
  }

  // --- Show the result ---
  const success = document.getElementById('success');
  if (isValid) {
    success.textContent = 'Thank you! Your message has been sent.';
    form.reset();               // clear the form
  } else {
    success.textContent = '';
  }
});