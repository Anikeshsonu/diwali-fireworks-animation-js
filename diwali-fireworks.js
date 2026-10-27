/* ==========================================================
   Diwali Fireworks Animation (Centralized JS)

   Version: 1.0.4

   Developed by: Anikesh Kumar Mishra
   Organization: CODE4UTECH CONSULTANCY PVT. LTD.
   GitHub: https://github.com/Anikeshsonu/diwali-fireworks-animation-js

   Description:
   A reusable centralized JavaScript fireworks animation
   that can be integrated into any website for Diwali
   celebrations.

   License: MIT
========================================================== */

(function () {
  // ===== Canvas Setup =====
  const canvas = document.createElement("canvas");
  canvas.id = "diwaliCanvas";
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "9999", // above content
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  // ===== Resize Canvas =====
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let fireworks = [];
  let particles = [];

  // ===== Utility Functions =====
  const distance = (x1, y1, x2, y2) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const random = (min, max) => Math.random() * (max - min) + min;

  // ===== Firework Class =====
  class Firework {
    constructor(x, y, targetX, targetY) {
      this.x = x;
      this.y = y;
      this.targetX = targetX;
      this.targetY = targetY;
      this.distanceToTarget = distance(x, y, targetX, targetY);
      this.distanceTraveled = 0;
      this.coordinates = Array(5).fill([this.x, this.y]);
      this.angle = Math.atan2(targetY - y, targetX - x);
      this.speed = 2;
      this.acceleration = 1.05;
      this.brightness = random(50, 70);
      this.targetRadius = 1;
      this.hue = random(0, 360);
    }

    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);

      this.targetRadius = this.targetRadius < 8 ? this.targetRadius + 0.3 : 1;

      this.speed *= this.acceleration;
      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;
      this.distanceTraveled = distance(this.x, this.y, this.x + vx, this.y + vy);

      if (this.distanceTraveled >= this.distanceToTarget) {
        fireworks.splice(index, 1);
        createParticles(this.targetX, this.targetY, this.hue);
      } else {
        this.x += vx;
        this.y += vy;
      }
    }

    draw() {
      ctx.beginPath();
      const last = this.coordinates[this.coordinates.length - 1];
      ctx.moveTo(last[0], last[1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = `hsl(${this.hue},100%,${this.brightness}%)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  // ===== Particle Class =====
  class Particle {
    constructor(x, y, hue) {
      this.x = x;
      this.y = y;
      this.coordinates = Array(5).fill([this.x, this.y]);
      this.angle = random(0, Math.PI * 2);
      this.speed = random(1, 8);
      this.friction = 0.94;
      this.gravity = 1;
      this.hue = random(hue - 20, hue + 20);
      this.brightness = random(50, 80);
      this.alpha = 1;
      this.decay = random(0.015, 0.03);
    }

    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);
      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= this.decay;

      if (this.alpha <= this.decay) particles.splice(index, 1);
    }

    draw() {
      ctx.beginPath();
      const last = this.coordinates[this.coordinates.length - 1];
      ctx.moveTo(last[0], last[1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = `hsla(${this.hue},100%,${this.brightness}%,${this.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  // ===== Create Particles =====
  function createParticles(x, y, hue) {
    let count = 30;
    while (count--) particles.push(new Particle(x, y, hue));
  }

  // ===== Animation Loop =====
  function loop() {
    requestAnimationFrame(loop);
    ctx.globalCompositeOperation = "destination-out";
    // Darker trail for better contrast
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";

    fireworks.forEach((fw, i) => {
      fw.update(i);
      fw.draw();
    });

    particles.forEach((p, i) => {
      p.update(i);
      p.draw();
    });
  }

  // ===== Launch Fireworks =====
  function launchFireworks() {
    setInterval(() => {
      const startX = random(canvas.width * 0.2, canvas.width * 0.8);
      const targetX = random(0, canvas.width);
      const targetY = random(0, canvas.height * 0.5);
      fireworks.push(new Firework(startX, canvas.height, targetX, targetY));
    }, 900);
  }

  // ===== Initialize =====
  loop();
  launchFireworks();
})();
