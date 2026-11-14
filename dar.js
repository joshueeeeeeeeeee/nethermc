const portal = document.querySelector(".portal");

// sound for the "under" scene (plays when the portal is on)
const netherSound = new Audio("audio/Nether.mp3");
// netherSound.loop = true;   // uncomment to loop while "under" is showing

// make the portal behave like a proper toggle (keyboard + screen readers)
portal.setAttribute("role", "switch");
portal.setAttribute("tabindex", "0");
portal.setAttribute("aria-checked", "false");
portal.setAttribute("aria-label", "Toggle portal");

function flip() {
  const isOn = document.body.classList.toggle("on");
  portal.setAttribute("aria-checked", String(isOn));

  if (isOn) {
    netherSound.currentTime = 0;
    netherSound.play().catch(() => {});   // 🔊 "under" is showing
  } else {
    netherSound.pause();                  // "land" is showing, no sound
  }
}

portal.addEventListener("click", flip);

portal.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    flip();
  }
});

// floating embers for the nether overlay
const embers = document.querySelector('.particles[data-type="ember"]');
const rand = (min, max) => Math.random() * (max - min) + min;

for (let i = 0; i < 30; i++) {
  const p = document.createElement("span");
  p.style.setProperty("--x", rand(0, 100) + "%");
  p.style.setProperty("--size", Math.round(rand(3, 8)) + "px");
  p.style.setProperty("--d", rand(6, 14) + "s");
  p.style.setProperty("--delay", -rand(0, 12) + "s");
  p.style.setProperty("--drift", rand(-80, 80) + "px");
  embers.appendChild(p);
}