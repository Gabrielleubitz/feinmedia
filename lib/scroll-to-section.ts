export function scrollToSection(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
  return true;
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.history.replaceState(null, "", "/");
}
