"use strict";

// Reveal content only through temporary animations, so it stays visible if JavaScript fails.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const touchLayout = window.matchMedia("(max-width: 800px)");
const runningAnimations = new Set();
let revealObserver;
let galleryAnimation;

function animateElement(element, frames, options) {
  if (touchLayout.matches) {
    frames = frames.map(({ transform, ...frame }) => frame);
    options = { ...options, duration: Math.min(options.duration, 280), delay: 0 };
  }
  const animation = element.animate(frames, options);
  runningAnimations.add(animation);
  const release = () => runningAnimations.delete(animation);
  animation.finished.then(release, release);
  return animation;
}

function startMotion() {
  if (
    touchLayout.matches ||
    motionPreference.matches ||
    !Element.prototype.animate ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  document.documentElement.classList.add("motion-enabled");
  const delays = new WeakMap();
  const targets = new Set();
  const groups = [
    ".about-layout > *",
    ".projects-heading > *",
    ".featured-projects > *",
    ".services > *",
    ".process-steps > *",
    ".sub-services-grid > *",
    ".faq-list > details",
    ".contact-methods > *",
    ".footer-top > *",
    ".portfolio-intro > *",
  ];
  groups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      targets.add(element);
      delays.set(element, Math.min(index % 4, 3) * 75);
    });
  });
  document
    .querySelectorAll(
      ".offer-heading, .process-heading, .interlude-content, .contact-intro, .contact-form, " +
        ".subsection-heading, .portfolio-project-top, .portfolio-image, .portfolio-project-info, " +
        ".full-width-cta > .wrap, .footer-bottom, .offer-more",
    )
    .forEach((element) => targets.add(element));

  revealObserver = new IntersectionObserver(
    (entries) => {
      if (motionPreference.matches) return;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealObserver.unobserve(entry.target);
        entry.target.classList.add("motion-revealed");
        if (!touchLayout.matches && entry.target.matches(".process-steps > article")) {
          entry.target.querySelectorAll(".step-number, h3, p").forEach((part, index) => {
            animateElement(
              part,
              [
                { opacity: 0, transform: "translateY(16px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: 600,
                delay: (delays.get(entry.target) || 0) + 120 + index * 100,
                easing: "cubic-bezier(.2,.7,.2,1)",
                fill: "backwards",
              },
            );
          });
        }
        if (touchLayout.matches && entry.target.matches(".featured-projects > *")) return;
        animateElement(
          entry.target,
          [
            { opacity: 0, transform: "translateY(26px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 720,
            delay: delays.get(entry.target) || 0,
            easing: "cubic-bezier(.2,.7,.2,1)",
            fill: "backwards",
          },
        );
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px 35px 0px" },
  );
  targets.forEach((element) => revealObserver.observe(element));

  document
    .querySelectorAll(".hero-content > *, .hero-bottom, .page-hero-caption")
    .forEach((element, index) => {
      animateElement(
        element,
        [
          { opacity: 0, transform: "translateY(20px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 850,
          delay: 100 + index * 100,
          easing: "cubic-bezier(.2,.7,.2,1)",
          fill: "backwards",
        },
      );
    });
}

function stopMotion() {
  revealObserver?.disconnect();
  runningAnimations.forEach((animation) => animation.cancel());
  runningAnimations.clear();
  document.documentElement.classList.remove("motion-enabled");
  document
    .querySelectorAll(".motion-revealed")
    .forEach((element) => element.classList.remove("motion-revealed"));
}

touchLayout.addEventListener("change", () => {
  stopMotion();
  startMotion();
});

motionPreference.addEventListener("change", () => {
  stopMotion();
  startMotion();
});

document.querySelector("#gallery-image")?.addEventListener("load", (event) => {
  if (
    touchLayout.matches ||
    motionPreference.matches ||
    !Element.prototype.animate ||
    !document.querySelector("#project-dialog").open
  ) {
    return;
  }
  galleryAnimation?.cancel();
  galleryAnimation = animateElement(
    event.target,
    [
      { opacity: 0.3, transform: "scale(.99)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    { duration: 300, easing: "ease-out" },
  );
});

// One queued update per scroll frame keeps the progress indicator inexpensive.
const pageProgress = document.createElement("div");
pageProgress.className = "page-progress";
pageProgress.setAttribute("aria-hidden", "true");
document.body.append(pageProgress);
let progressFrame;
function updateProgress() {
  progressFrame = undefined;
  if (touchLayout.matches) return;
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
  pageProgress.style.transform = `scaleX(${progress})`;
}
function queueProgress() {
  if (touchLayout.matches) return;
  if (progressFrame === undefined) progressFrame = window.requestAnimationFrame(updateProgress);
}
window.addEventListener("scroll", queueProgress, { passive: true });
window.addEventListener("resize", queueProgress);
window.addEventListener("pageshow", queueProgress);
window.addEventListener("load", queueProgress, { once: true });
updateProgress();
startMotion();
