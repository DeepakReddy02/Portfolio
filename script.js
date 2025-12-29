document.addEventListener("DOMContentLoaded", () => {
  const animated = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animated.forEach(el => observer.observe(el));

  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("toggleSidebar");

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    sidebar.classList.toggle("expanded");
  });
});
