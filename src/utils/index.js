export function scrollToSection(event, id) {
  event.preventDefault();

  const section = document.getElementById(id);
  const headerOffset = 60;
  const sectionPosition = section?.offsetTop;
  const offsetPosition = sectionPosition ? sectionPosition - headerOffset : 0;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
