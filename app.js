"use strict";

const find = (selector) => document.querySelector(selector);
const projects = window.archisferaProjects || [];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const formatNumber = (value) => String(value).padStart(2, "0");

// A single header is shared by the home page and all subpages.
const header = find(".topbar");
const menuButton = find(".menu-toggle");
const navigation = find("#navigation");
function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 48);
}
function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.querySelector("span").textContent = "+";
}
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.querySelector("span").textContent = isOpen ? "−" : "+";
});
navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("pageshow", updateHeader);
window.addEventListener("resize", () => {
  if (window.innerWidth > 560) closeMenu();
});
updateHeader();

// Show one supplied visualization per project. Pause during interaction and in hidden tabs.
const hero = find("#hero");
if (hero) {
  const slides = Array.from(hero.querySelectorAll(".hero-slide"));
  const pauseButton = find("#hero-pause");
  let currentSlide = 0;
  let paused = reducedMotion.matches;
  let hovering = false;
  let timer;
  let slideRequest = 0;

  function stopTimer() {
    window.clearTimeout(timer);
  }
  function scheduleSlide() {
    stopTimer();
    if (paused || hovering || document.hidden || hero.contains(document.activeElement)) return;
    timer = window.setTimeout(() => showSlide(currentSlide + 1), 6500);
  }
  function updatePauseButton() {
    pauseButton.textContent = paused ? "Odtwórz" : "Pauza";
    pauseButton.setAttribute("aria-pressed", String(paused));
    pauseButton.setAttribute("aria-label", paused ? "Uruchom pokaz projektów" : "Wstrzymaj pokaz projektów");
  }
  async function showSlide(target) {
    stopTimer();
    const nextIndex = (target + slides.length) % slides.length;
    const nextSlide = slides[nextIndex];
    const request = ++slideRequest;
    nextSlide.loading = "eager";
    try {
      await nextSlide.decode();
    } catch {
      scheduleSlide();
      return;
    }
    if (request !== slideRequest) return;
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === nextIndex);
      slide.setAttribute("aria-hidden", String(index !== nextIndex));
    });
    currentSlide = nextIndex;
    const project = projects.find((item) => item.id === Number(nextSlide.dataset.project));
    find("#hero-project-location").textContent = project.location;
    find("#hero-project-name").textContent = project.title;
    find("#hero-project-link").href = `projekty/#projekt-${formatNumber(project.id)}`;
    find("#hero-counter").textContent = `${formatNumber(nextIndex + 1)} / ${formatNumber(slides.length)}`;
    scheduleSlide();
  }
  find("#hero-next").addEventListener("click", () => showSlide(currentSlide + 1));
  find("#hero-prev").addEventListener("click", () => showSlide(currentSlide - 1));
  pauseButton.addEventListener("click", () => {
    paused = !paused;
    updatePauseButton();
    scheduleSlide();
  });
  hero.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse") return;
    hovering = true;
    stopTimer();
  });
  hero.addEventListener("pointerleave", () => {
    hovering = false;
    scheduleSlide();
  });
  hero.addEventListener("focusin", stopTimer);
  hero.addEventListener("focusout", () => window.setTimeout(scheduleSlide, 0));
  document.addEventListener("visibilitychange", scheduleSlide);
  reducedMotion.addEventListener("change", () => {
    paused = reducedMotion.matches;
    updatePauseButton();
    scheduleSlide();
  });
  updatePauseButton();
  scheduleSlide();
}

function openDialog(dialog) {
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add("modal-open");
}
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target !== dialog) return;
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      dialog.close();
  });
});
find("#open-bio")?.addEventListener("click", () => openDialog(find("#bio-dialog")));

// The portfolio uses the eight numbered folders and metadata supplied by the client.
let activeProject;
let imageIndex = 0;
function renderGallery() {
  const image = find("#gallery-image");
  image.src = activeProject.images[imageIndex];
  image.alt = `${activeProject.description} Wizualizacja ${imageIndex + 1} z ${activeProject.images.length}.`;
  find("#gallery-counter").textContent =
    `${formatNumber(imageIndex + 1)} / ${formatNumber(activeProject.images.length)}`;
  Array.from(find("#gallery-thumbnails").children).forEach((button, index) => {
    button.setAttribute("aria-pressed", String(index === imageIndex));
  });
}
function openProject(project) {
  activeProject = project;
  imageIndex = 0;
  find("#project-category").textContent = `${project.location} / ${project.status}`;
  find("#project-title").textContent = project.title;
  const areaLabel = project.perBuilding
    ? "Powierzchnia użytkowa pojedynczego budynku"
    : "Powierzchnia użytkowa";
  find("#project-description").textContent = `${areaLabel} · ${project.area.toLocaleString("pl-PL")} m²`;
  const thumbnails = project.images.map((source, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Pokaż wizualizację ${index + 1}`);
    const image = document.createElement("img");
    image.src = source;
    image.alt = "";
    image.width = 90;
    image.height = 60;
    image.loading = "lazy";
    button.append(image);
    button.addEventListener("click", () => {
      imageIndex = index;
      renderGallery();
    });
    return button;
  });
  find("#gallery-thumbnails").replaceChildren(...thumbnails);
  renderGallery();
  openDialog(find("#project-dialog"));
}
function nextImage(delta) {
  imageIndex = (imageIndex + delta + activeProject.images.length) % activeProject.images.length;
  renderGallery();
}
document.querySelectorAll("[data-project-id]").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects.find((item) => item.id === Number(button.dataset.projectId));
    if (project) openProject(project);
  });
});
find("#gallery-prev").addEventListener("click", () => nextImage(-1));
find("#gallery-next").addEventListener("click", () => nextImage(1));
find("#project-dialog").addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    nextImage(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    nextImage(1);
  }
});
if (document.body.dataset.page === "projekty") {
  const requestedId = Number(new URLSearchParams(location.search).get("projekt"));
  const requestedProject = projects.find((project) => project.id === requestedId);
  if (requestedProject) openProject(requestedProject);
}

// Prepare the user's message in their email application, as on the existing site.
const contactForm = find("#contact-form");
if (contactForm) {
  const serviceNames = {
    koncepcja: "projekt koncepcyjny",
    budowlany: "projekt budowlany wielobranżowy",
    technologia: "projekt technologiczny",
  };
  const service = new URLSearchParams(location.search).get("usluga");
  if (Object.hasOwn(serviceNames, service) && !contactForm.elements.message.value) {
    contactForm.elements.message.value = `Interesuje mnie ${serviceNames[service]}.\n\n`;
  }
  const status = find("#form-status");
  const emailLink = document.createElement("a");
  emailLink.className = "prepared-mail";
  emailLink.hidden = true;
  emailLink.textContent = "Otwórz wiadomość w poczcie ↗";
  status.before(emailLink);

  function prepareMessage() {
    const values = Object.fromEntries(new FormData(contactForm));
    const type = values.type.trim() || "Do ustalenia";
    return {
      subject: `Zapytanie o projekt — ${type}`,
      body: `Dzień dobry,\n\n${values.message.trim()}\n\nRodzaj projektu: ${type}\nLokalizacja: ${values.location.trim() || "Do ustalenia"}\n\nKontakt:\n${values.name.trim()}\nE-mail: ${values.email.trim()}\nTelefon: ${values.phone.trim() || "Nie podano"}`,
    };
  }
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const message = prepareMessage();
    emailLink.href = `mailto:biuro@archisfera.net?subject=${encodeURIComponent(message.subject)}&body=${encodeURIComponent(message.body)}`;
    emailLink.hidden = false;
    status.textContent = "Wiadomość jest przygotowana. Otwórz ją w poczcie, aby wysłać, lub skopiuj treść.";
    emailLink.focus();
  });
  contactForm.addEventListener("input", () => {
    emailLink.hidden = true;
    status.textContent = "";
  });
  find("#copy-message").addEventListener("click", async () => {
    if (!contactForm.reportValidity()) return;
    const message = prepareMessage();
    const text = `Do: biuro@archisfera.net\nTemat: ${message.subject}\n\n${message.body}`;
    try {
      await navigator.clipboard.writeText(text);
      status.textContent =
        "Treść została skopiowana. Wklej ją do wiadomości i wyślij na biuro@archisfera.net.";
    } catch {
      status.textContent = "Użyj przycisku „Przygotuj wiadomość”, aby otworzyć ją w swojej poczcie.";
    }
  });
}
