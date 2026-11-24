const canvas = document.querySelector("#universe");
const ctx = canvas.getContext("2d");

const densityInput = document.querySelector("#particle-count");
const distanceInput = document.querySelector("#connection-distance");
const densityValue = document.querySelector("#particle-count-value");
const distanceValue = document.querySelector("#connection-distance-value");
const particleTotal = document.querySelector("#particle-total");
const fpsDisplay = document.querySelector("#fps");
const motionToggle = document.querySelector("#motion-toggle");
const pointerToggle = document.querySelector("#pointer-toggle");
const resetButton = document.querySelector("#reset-button");

const settings = { particleCount: 100, connectionDistance: 120, motion: true, pointer: true };
let width = 0, height = 0, particles = [], bursts = [];
let fpsFrames = 0, fpsStart = performance.now();
const pointer = { x: null, y: null, radius: 145 };

class Particle {
  constructor(x = Math.random() * width, y = Math.random() * height) {
    this.x = x; this.y = y;
    this.radius = Math.random() * 1.8 + .7;
    this.speedX = (Math.random() - .5) * .55;
    this.speedY = (Math.random() - .5) * .55;
    this.phase = Math.random() * Math.PI * 2;
  }
  update() {
    if (!settings.motion) return;
    this.phase += .012;
    this.x += this.speedX; this.y += this.speedY;
    if (this.x < -10) this.x = width + 10;
    if (this.x > width + 10) this.x = -10;
    if (this.y < -10) this.y = height + 10;
    if (this.y > height + 10) this.y = -10;
    if (settings.pointer && pointer.x !== null) {
      const dx = this.x - pointer.x, dy = this.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < pointer.radius && distance > 0) {
        const force = (pointer.radius - distance) / pointer.radius;
        this.x += dx / distance * force * 1.8;
        this.y += dy / distance * force * 1.8;
      }
    }
  }
  draw() {
    const pulse = .75 + Math.sin(this.phase) * .25;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(173,157,255,${.45 + pulse * .4})`;
    ctx.shadowBlur = 12; ctx.shadowColor = "rgba(129,113,255,.8)";
    ctx.fill(); ctx.shadowBlur = 0;
  }
}

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth; height = window.innerHeight;
  canvas.width = Math.floor(width * ratio); canvas.height = Math.floor(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  createParticles();
}
function createParticles() {
  particles = Array.from({ length: settings.particleCount }, () => new Particle());
  updateParticleCount();
}
function updateParticleCount() { particleTotal.textContent = particles.length; }

function drawConnections() {
  const maxDistance = settings.connectionDistance;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance < maxDistance) {
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(113,210,220,${(1 - distance / maxDistance) * .25})`;
        ctx.lineWidth = .7; ctx.stroke();
      }
    }
  }
}
function drawBursts() {
  bursts = bursts.filter(burst => burst.radius < burst.maxRadius);
  for (const burst of bursts) {
    burst.radius += 3;
    ctx.beginPath(); ctx.arc(burst.x, burst.y, burst.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(101,230,224,${1 - burst.radius / burst.maxRadius})`;
    ctx.lineWidth = 1.5; ctx.stroke();
  }
}
function animate(timestamp = 0) {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, width, height);
  for (const particle of particles) { particle.update(); particle.draw(); }
  drawConnections(); drawBursts();
  fpsFrames++;
  if (timestamp - fpsStart >= 1000) {
    fpsDisplay.textContent = Math.round(fpsFrames * 1000 / (timestamp - fpsStart));
    fpsFrames = 0; fpsStart = timestamp;
  }
}
function createBurst(x, y) {
  bursts.push({ x, y, radius: 2, maxRadius: 90 });
  for (let i = 0; i < 12; i++) {
    const angle = Math.PI * 2 * i / 12;
    const particle = new Particle(x, y);
    particle.speedX = Math.cos(angle) * (Math.random() * 2 + 1);
    particle.speedY = Math.sin(angle) * (Math.random() * 2 + 1);
    particle.radius = Math.random() * 2 + 1;
    particles.push(particle);
  }
  while (particles.length > settings.particleCount + 60) particles.shift();
}
function setupSwitch(button, key) {
  button.addEventListener("click", () => {
    settings[key] = !settings[key];
    button.classList.toggle("is-on", settings[key]);
    button.setAttribute("aria-checked", String(settings[key]));
    button.querySelector("b").textContent = settings[key] ? "ON" : "OFF";
  });
}

densityInput.addEventListener("input", () => {
  settings.particleCount = Number(densityInput.value);
  densityValue.textContent = settings.particleCount;
  createParticles();
});
distanceInput.addEventListener("input", () => {
  settings.connectionDistance = Number(distanceInput.value);
  distanceValue.textContent = `${settings.connectionDistance} px`;
});
setupSwitch(motionToggle, "motion");
setupSwitch(pointerToggle, "pointer");

resetButton.addEventListener("click", () => {
  densityInput.value = 100; distanceInput.value = 120;
  densityValue.textContent = "100"; distanceValue.textContent = "120 px";
  settings.particleCount = 100; settings.connectionDistance = 120;
  settings.motion = true; settings.pointer = true; bursts = [];
  for (const button of [motionToggle, pointerToggle]) {
    button.classList.add("is-on");
    button.setAttribute("aria-checked", "true");
    button.querySelector("b").textContent = "ON";
  }
  createParticles();
});

window.addEventListener("pointermove", event => { pointer.x = event.clientX; pointer.y = event.clientY; });
window.addEventListener("pointerleave", () => { pointer.x = null; pointer.y = null; });
window.addEventListener("click", event => {
  if (event.target.closest(".control-panel, .topbar, .page-footer")) return;
  createBurst(event.clientX, event.clientY);
});
window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animate();
