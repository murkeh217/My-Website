const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card[data-kind]');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });

    projects.forEach((project) => {
      const visible = selected === 'all' || project.dataset.kind === selected;
      project.classList.toggle('is-hidden', !visible);
    });
  });
});

filters.forEach((filter) => filter.setAttribute('aria-pressed', String(filter.classList.contains('active'))));

const revealTargets = document.querySelectorAll('.project-card, .timeline article, .personal-card, .skill-list article');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealTargets.forEach((target) => observer.observe(target));
}
