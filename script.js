// Sidebar toggle functionality
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});


const textArray = [
  "Data analyst",
  "Business analyst",
  "Data visualization enthusiast",
  "Data engineer"
];

// Typing animation logic
const animatedText = document.getElementById("animated-text");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
  const currentText = textArray[textIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  animatedText.textContent = currentText.substring(0, charIndex);

  if (!isDeleting && charIndex === currentText.length) {
    // Pause before deleting
    isDeleting = true;
    setTimeout(typeAnimation, 1000);
  } else if (isDeleting && charIndex === 0) {
    // Move to the next text
    isDeleting = false;
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(typeAnimation, 500);
  } else {
    // Continue typing or deleting
    setTimeout(typeAnimation, isDeleting ? 50 : 100);
  }
}
// Start the animation
typeAnimation();

