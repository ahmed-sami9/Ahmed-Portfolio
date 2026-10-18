// Scrolls to the element with this id and moves keyboard focus to it.
//
// - Smooth or instant follows the global `scroll-behavior` in index.css, which already
//   respects prefers-reduced-motion. Where it stops follows the target's scroll-margin.
// - Focus: so keyboard and screen-reader users continue from the section they jumped to,
//   not from the button they clicked. The target needs tabIndex={-1} to accept focus;
//   preventScroll stops focus() from jumping there instantly and cancelling the smooth scroll.
// - Used instead of an <a href="#id"> on purpose: a hash link adds a history entry, so the
//   browser's Back would scroll back up instead of closing the project page.
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView();
  target.focus({ preventScroll: true });
}
