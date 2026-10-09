const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

let currentButton = null;
let currentAudio = null;

function stopCurrent() {
  if (!currentAudio) return;
  currentAudio.pause();
  currentAudio.currentTime = 0;
  if (currentButton) {
    currentButton.textContent = "Play sound";
    currentButton.setAttribute("aria-pressed", "false");
  }
  currentButton = null;
  currentAudio = null;
}

document.querySelectorAll(".play").forEach(function (button) {
  const audio = new Audio(button.dataset.src);

  button.addEventListener("click", function () {
    if (currentButton === button && currentAudio && !currentAudio.paused) {
      stopCurrent();
      return;
    }
    stopCurrent();
    currentButton = button;
    currentAudio = audio;
    button.textContent = "Stop";
    button.setAttribute("aria-pressed", "true");
    audio.play().catch(function () {
      button.textContent = "Play sound";
      button.setAttribute("aria-pressed", "false");
    });
  });

  audio.addEventListener("ended", function () {
    if (currentButton === button) stopCurrent();
  });
});
