/* ==========================================================
   Diwali Fireworks Animation (Centralized JS)

   Version: 2.0.0

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
    const defaults = {
        showFireworks: true,
        showLights: true,
        showKandils: true,
        showDiyas: true,
        clickToLaunch: true,
        launchInterval: 950,
        maxParticles: 220,
    };
    const config = Object.assign({}, defaults, window.DiwaliConfig || {});

    const styleEl = document.createElement("style");
    styleEl.id = "diwali-decor-styles";
    styleEl.textContent = `
    #diwali-decor-root {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none !important;
      z-index: 99995;
      overflow: hidden;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      contain: layout style size;
    }

    #diwali-decor-root *,
    #diwali-decor-root *::before,
    #diwali-decor-root *::after {
      box-sizing: border-box;
      pointer-events: none !important;
      user-select: none;
    }

    .diwali-festoon-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 65px;
      z-index: 10;
    }

    .diwali-festoon-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 52px;
      overflow: visible;
    }

    .diwali-festoon-strand {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      padding: 0 16px;
      width: 100%;
    }

    .diwali-bulb-unit {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      transform-origin: top center;
      will-change: transform, opacity;
      animation: diwaliSwayLight 4.5s ease-in-out infinite alternate;
    }

    .diwali-socket {
      width: 10px;
      height: 8px;
      background: linear-gradient(90deg, #5a4103 0%, #e5b33b 35%, #fff09e 55%, #9b7216 80%, #473200 100%);
      border-radius: 2px 2px 1px 1px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.6);
      position: relative;
      z-index: 3;
    }

    .diwali-glass-bulb {
      width: 16px;
      height: 24px;
      margin-top: -1px;
      border-radius: 50% 50% 50% 50% / 35% 35% 65% 65%;
      position: relative;
      box-shadow: inset -2px -2px 4px rgba(0,0,0,0.4), inset 2px 2px 4px rgba(255,255,255,0.7);
      will-change: opacity, transform;
      animation: diwaliGlowPulse 2.4s ease-in-out infinite alternate;
    }

    .diwali-glass-bulb::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 5px;
      width: 6px;
      height: 8px;
      border: 1px solid rgba(255, 255, 255, 0.95);
      border-bottom: none;
      border-radius: 3px 3px 0 0;
      opacity: 0.9;
    }

    .diwali-glass-bulb::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 4px;
      height: 9px;
      background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 80%);
      border-radius: 50%;
      transform: rotate(-15deg);
    }

    .bulb-gold {
      background: radial-gradient(circle at 35% 35%, #fff8d6 0%, #ffc107 45%, #b27b00 100%);
      box-shadow: 0 0 12px rgba(255, 193, 7, 0.9), 0 2px 4px rgba(0,0,0,0.4);
    }
    .bulb-ruby {
      background: radial-gradient(circle at 35% 35%, #ffd6e0 0%, #e91e63 50%, #880e4f 100%);
      box-shadow: 0 0 12px rgba(233, 30, 99, 0.9), 0 2px 4px rgba(0,0,0,0.4);
    }
    .bulb-emerald {
      background: radial-gradient(circle at 35% 35%, #c8fce0 0%, #00e676 50%, #004d40 100%);
      box-shadow: 0 0 12px rgba(0, 230, 118, 0.9), 0 2px 4px rgba(0,0,0,0.4);
    }
    .bulb-amber {
      background: radial-gradient(circle at 35% 35%, #ffe6c7 0%, #ff9800 50%, #e65100 100%);
      box-shadow: 0 0 12px rgba(255, 152, 0, 0.9), 0 2px 4px rgba(0,0,0,0.4);
    }
    .bulb-cyan {
      background: radial-gradient(circle at 35% 35%, #e1f5fe 0%, #00e5ff 50%, #006064 100%);
      box-shadow: 0 0 12px rgba(0, 229, 255, 0.9), 0 2px 4px rgba(0,0,0,0.4);
    }

    .diwali-bell-unit {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
      transform-origin: top center;
      animation: diwaliSwayBell 3.8s ease-in-out infinite alternate;
    }
    .diwali-bell-cup {
      width: 14px;
      height: 13px;
      background: linear-gradient(135deg, #ffe082 0%, #ffb300 45%, #8c6200 100%);
      border-radius: 7px 7px 2px 2px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.7);
      position: relative;
    }
    .diwali-bell-clapper {
      width: 4px;
      height: 4px;
      background: #5a3e00;
      border-radius: 50%;
      margin: -1px auto 0;
      box-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }

    .diwali-kandil {
      position: absolute;
      top: 50px;
      width: 76px;
      height: 190px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transform-origin: top center;
      will-change: transform;
      animation: diwaliKandilSway 5.5s ease-in-out infinite alternate;
      z-index: 12;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.45));
    }
    .diwali-kandil-left {
      left: 18px;
      animation-delay: -2.2s;
    }
    .diwali-kandil-right {
      right: 18px;
      animation-delay: -0.8s;
    }

    .diwali-kandil-cord {
      width: 2px;
      height: 30px;
      background: linear-gradient(180deg, #d4af37, #785608);
    }
    .diwali-kandil-bead {
      width: 8px;
      height: 8px;
      background: radial-gradient(circle at 35% 35%, #fff6b3, #b8860b);
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.6);
    }

    .diwali-kandil-prism {
      position: relative;
      width: 58px;
      height: 64px;
      margin-top: 2px;
    }
    .diwali-prism-face {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #d50000 0%, #ff1744 40%, #ffb300 75%, #ff6d00 100%);
      clip-path: polygon(50% 0%, 100% 28%, 100% 72%, 50% 100%, 0% 72%, 0% 28%);
      box-shadow: inset 0 0 18px rgba(255, 235, 59, 0.95);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .diwali-prism-core {
      position: absolute;
      width: 26px;
      height: 26px;
      background: radial-gradient(circle, #ffffff 0%, #fff176 45%, rgba(255,238,88,0) 80%);
      border-radius: 50%;
      box-shadow: 0 0 14px #ffd54f;
      will-change: transform, opacity;
      animation: diwaliLanternCore 2.6s ease-in-out infinite alternate;
    }
    .diwali-prism-symbol {
      position: absolute;
      color: #7f5500;
      font-size: 22px;
      line-height: 1;
      text-shadow: 0 0 5px #ffffff, 0 1px 2px rgba(0,0,0,0.5);
    }

    .diwali-tassels-row {
      display: flex;
      justify-content: center;
      gap: 3px;
      width: 50px;
      margin-top: -1px;
    }
    .diwali-streamer {
      width: 4px;
      border-radius: 0 0 2px 2px;
      transform-origin: top center;
      will-change: transform;
      animation: diwaliStreamerSway 3.2s ease-in-out infinite alternate;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    .diwali-streamer:nth-child(1) { height: 46px; background: linear-gradient(180deg, #ff1744, #ff8a80); animation-delay: -0.3s; }
    .diwali-streamer:nth-child(2) { height: 58px; background: linear-gradient(180deg, #ffd600, #fff9c4); animation-delay: -0.9s; }
    .diwali-streamer:nth-child(3) { height: 66px; background: linear-gradient(180deg, #ff9100, #ffe0b2); animation-delay: -0.5s; }
    .diwali-streamer:nth-child(4) { height: 58px; background: linear-gradient(180deg, #00e676, #b9f6ca); animation-delay: -1.2s; }
    .diwali-streamer:nth-child(5) { height: 46px; background: linear-gradient(180deg, #ff1744, #ff8a80); animation-delay: -0.7s; }

    .diwali-diya {
      position: absolute;
      bottom: 12px;
      width: 76px;
      height: 60px;
      z-index: 14;
      filter: drop-shadow(0 6px 14px rgba(0,0,0,0.55));
    }
    .diwali-diya-left {
      left: 18px;
    }
    .diwali-diya-right {
      right: 18px;
      transform: scaleX(-1);
    }

    .diwali-diya-pool {
      position: absolute;
      bottom: -6px;
      left: -18px;
      width: 110px;
      height: 32px;
      background: radial-gradient(ellipse at center, rgba(255, 140, 0, 0.42) 0%, rgba(255, 87, 34, 0.18) 50%, rgba(0,0,0,0) 75%);
      border-radius: 50%;
      will-change: transform, opacity;
      animation: diwaliPoolGlow 2.1s ease-in-out infinite alternate;
    }

    .diwali-clay-body {
      position: absolute;
      bottom: 2px;
      left: 8px;
      width: 60px;
      height: 25px;
      background: radial-gradient(ellipse at 50% 25%, #bf5026 0%, #8e3212 55%, #4f1805 100%);
      border-radius: 8px 32px 24px 24px / 8px 18px 24px 24px;
      box-shadow: inset 0 2px 3px rgba(255, 186, 148, 0.65), inset 0 -3px 5px rgba(22, 6, 2, 0.85), 0 4px 6px rgba(0,0,0,0.5);
      border-top: 1.5px solid #df7b54;
    }

    .diwali-clay-oil {
      position: absolute;
      top: 2px;
      left: 11px;
      width: 40px;
      height: 10px;
      background: radial-gradient(ellipse at center, #ffd54f 0%, #b8860b 55%, #422d00 100%);
      border-radius: 50%;
      box-shadow: inset 0 1px 2px rgba(255,255,255,0.7);
    }

    .diwali-wick {
      position: absolute;
      bottom: 19px;
      left: 14px;
      width: 4px;
      height: 7px;
      background: linear-gradient(to top, #261403 0%, #110700 80%, #ff5722 100%);
      border-radius: 2px 2px 0 0;
      transform: rotate(-16deg);
    }

    .diwali-living-flame {
      position: absolute;
      bottom: 22px;
      left: 7px;
      width: 19px;
      height: 33px;
      transform-origin: center bottom;
      will-change: transform;
      animation: diwaliFlicker 0.12s infinite alternate ease-in-out;
      filter: drop-shadow(0 0 10px rgba(255, 111, 0, 0.95)) drop-shadow(0 0 20px rgba(255, 193, 7, 0.6));
    }

    .diwali-flame-outer {
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at 50% 80%, #ffeb3b 0%, #ff9800 45%, #ff3d00 85%, rgba(213, 0, 0, 0) 100%);
      border-radius: 50% 50% 20% 20% / 70% 70% 30% 30%;
    }

    .diwali-flame-inner {
      position: absolute;
      bottom: 2px;
      left: 4px;
      width: 11px;
      height: 19px;
      background: radial-gradient(ellipse at 50% 80%, #ffffff 0%, #fff9c4 45%, #ffeb3b 90%);
      border-radius: 50% 50% 30% 30% / 70% 70% 30% 30%;
      opacity: 0.96;
    }

    .diwali-flame-blue {
      position: absolute;
      bottom: 0;
      left: 5px;
      width: 9px;
      height: 6px;
      background: radial-gradient(circle at center, #00e5ff 0%, #2979ff 65%, rgba(41, 121, 255, 0) 100%);
      border-radius: 50%;
      opacity: 0.85;
    }

    .diwali-ember {
      position: absolute;
      width: 3px;
      height: 3px;
      background: #fff59d;
      border-radius: 50%;
      box-shadow: 0 0 4px #ff9800;
      bottom: 50px;
      left: 14px;
      will-change: transform, opacity;
      animation: diwaliEmberRise 2.2s infinite ease-out;
    }
    .diwali-ember:nth-child(2) {
      animation-delay: -0.7s;
      animation-duration: 2.8s;
      left: 16px;
    }
    .diwali-ember:nth-child(3) {
      animation-delay: -1.4s;
      animation-duration: 2s;
      left: 12px;
    }

    @keyframes diwaliSwayLight {
      0% { transform: rotate(-2deg); }
      100% { transform: rotate(2deg); }
    }
    @keyframes diwaliSwayBell {
      0% { transform: rotate(-3deg); }
      100% { transform: rotate(3deg); }
    }
    @keyframes diwaliGlowPulse {
      0% { opacity: 0.82; transform: scale(0.97); }
      100% { opacity: 1; transform: scale(1.03); }
    }

    @keyframes diwaliKandilSway {
      0% { transform: rotate(-3deg); }
      100% { transform: rotate(3deg); }
    }
    @keyframes diwaliStreamerSway {
      0% { transform: rotate(-4.5deg); }
      100% { transform: rotate(4.5deg); }
    }
    @keyframes diwaliLanternCore {
      0% { transform: scale(0.9); opacity: 0.75; }
      100% { transform: scale(1.15); opacity: 1; }
    }

    @keyframes diwaliFlicker {
      0% { transform: scale(1) skewX(-1.5deg); }
      25% { transform: scale(0.97) skewX(2deg) scaleY(1.05); }
      50% { transform: scale(1.03) skewX(-1deg) scaleY(0.98); }
      75% { transform: scale(0.96) skewX(1deg) scaleY(1.02); }
      100% { transform: scale(1.02) skewX(-2deg); }
    }
    @keyframes diwaliPoolGlow {
      0% { transform: scale(0.94); opacity: 0.6; }
      100% { transform: scale(1.06); opacity: 0.92; }
    }
    @keyframes diwaliEmberRise {
      0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.9; }
      100% { transform: translate3d(random(10px, -10px), -45px, 0) scale(0.2); opacity: 0; }
    }

    @media (max-width: 768px) {
      .diwali-kandil {
        transform: scale(0.72);
        top: 25px;
      }
      .diwali-kandil-left { left: 4px; }
      .diwali-kandil-right { right: 4px; }
      .diwali-diya {
        transform: scale(0.82);
        bottom: 6px;
      }
      .diwali-diya-left { left: 6px; }
      .diwali-diya-right { right: 6px; transform: scale(0.82) scaleX(-1); }
    }

    @media (max-width: 480px) {
      .diwali-kandil {
        transform: scale(0.58);
        top: 14px;
      }
      .diwali-festoon-strand {
        padding: 0 4px;
      }
    }
  `;
    document.head.appendChild(styleEl);

    const decorRoot = document.createElement("div");
    decorRoot.id = "diwali-decor-root";
    decorRoot.setAttribute("aria-hidden", "true");

    function generateFestoonHTML() {
        const bulbThemes = ["gold", "ruby", "emerald", "amber", "cyan"];
        const count = Math.max(8, Math.min(26, Math.floor(window.innerWidth / 56)));
        let elementsHTML = "";

        for (let i = 0; i < count; i++) {
            const isBell = i % 4 === 2;
            const theme = bulbThemes[i % bulbThemes.length];
            const delay = (-(i * 0.32) % 3).toFixed(2);

            if (isBell) {
                elementsHTML += `
          <div class="diwali-bell-unit" style="animation-delay: ${delay}s;">
            <div class="diwali-bell-cup"></div>
            <div class="diwali-bell-clapper"></div>
          </div>
        `;
            } else {
                elementsHTML += `
          <div class="diwali-bulb-unit" style="animation-delay: ${delay}s;">
            <div class="diwali-socket"></div>
            <div class="diwali-glass-bulb bulb-${theme}" style="animation-delay: ${delay}s;"></div>
          </div>
        `;
            }
        }

        return `
      <div class="diwali-festoon-wrap">
        <svg class="diwali-festoon-svg" preserveAspectRatio="none" viewBox="0 0 1000 50">
          <path d="M0,8 Q250,38 500,12 T1000,10" fill="none" stroke="#d4af37" stroke-width="1.8" opacity="0.85" />
          <path d="M0,10 Q250,40 500,14 T1000,12" fill="none" stroke="#5a4309" stroke-width="1.2" opacity="0.65" />
        </svg>
        <div class="diwali-festoon-strand">
          ${elementsHTML}
        </div>
      </div>
    `;
    }

    function getKandilHTML(sideClass) {
        return `
      <div class="diwali-kandil ${sideClass}">
        <div class="diwali-kandil-cord"></div>
        <div class="diwali-kandil-bead"></div>
        <div class="diwali-kandil-prism">
          <div class="diwali-prism-face">
            <div class="diwali-prism-core"></div>
            <span class="diwali-prism-symbol">✦</span>
          </div>
        </div>
        <div class="diwali-tassels-row">
          <div class="diwali-streamer"></div>
          <div class="diwali-streamer"></div>
          <div class="diwali-streamer"></div>
          <div class="diwali-streamer"></div>
          <div class="diwali-streamer"></div>
        </div>
      </div>
    `;
    }

    function getDiyaHTML(sideClass) {
        return `
      <div class="diwali-diya ${sideClass}">
        <div class="diwali-diya-pool"></div>
        <div class="diwali-clay-body"></div>
        <div class="diwali-clay-oil"></div>
        <div class="diwali-wick"></div>
        <div class="diwali-living-flame">
          <div class="diwali-flame-outer"></div>
          <div class="diwali-flame-inner"></div>
          <div class="diwali-flame-blue"></div>
        </div>
        <div class="diwali-ember"></div>
        <div class="diwali-ember"></div>
        <div class="diwali-ember"></div>
      </div>
    `;
    }

    function renderDecor() {
        let html = "";
        if (config.showLights) html += generateFestoonHTML();
        if (config.showKandils) {
            html += getKandilHTML("diwali-kandil-left");
            html += getKandilHTML("diwali-kandil-right");
        }
        if (config.showDiyas) {
            html += getDiyaHTML("diwali-diya-left");
            html += getDiyaHTML("diwali-diya-right");
        }
        decorRoot.innerHTML = html;
    }

    renderDecor();
    document.body.appendChild(decorRoot);

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (config.showLights) renderDecor();
        }, 200);
    });

    if (!config.showFireworks) return;

    const canvas = document.createElement("canvas");
    canvas.id = "diwaliCanvas";
    Object.assign(canvas.style, {
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "99990",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let fireworks = [];
    let particles = [];

    const distance = (x1, y1, x2, y2) =>
        Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const random = (min, max) => Math.random() * (max - min) + min;

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
            this.brightness = random(55, 75);
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

            if (Math.random() < 0.45 && particles.length < config.maxParticles) {
                particles.push(new Particle(this.x, this.y, 45, true));
            }

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
            ctx.lineWidth = 2.2;
            ctx.stroke();
        }
    }

    class Particle {
        constructor(x, y, hue, isTrail = false) {
            this.x = x;
            this.y = y;
            this.isTrail = isTrail;
            this.coordinates = Array(isTrail ? 3 : 5).fill([this.x, this.y]);
            this.angle = random(0, Math.PI * 2);
            this.speed = isTrail ? random(0.5, 2.5) : random(1, 8.5);
            this.friction = isTrail ? 0.90 : 0.94;
            this.gravity = isTrail ? 0.4 : 1.05;
            this.hue = random(hue - 20, hue + 20);
            this.brightness = random(55, 85);
            this.alpha = 1;
            this.decay = isTrail ? random(0.04, 0.08) : random(0.015, 0.028);
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
            const flicker = Math.random() > 0.15 ? this.brightness : this.brightness * 0.6;
            ctx.strokeStyle = `hsla(${this.hue},100%,${flicker}%,${this.alpha})`;
            ctx.lineWidth = this.isTrail ? 1.0 : 1.6;
            ctx.stroke();
        }
    }

    function createParticles(x, y, hue) {
        let count = 30;
        while (particles.length + count > config.maxParticles) {
            particles.shift();
        }
        while (count--) particles.push(new Particle(x, y, hue));
    }

    function loop() {
        requestAnimationFrame(loop);
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "lighter";

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update(i);
            if (fireworks[i]) fireworks[i].draw();
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update(i);
            if (particles[i]) particles[i].draw();
        }
    }

    function launchFireworks() {
        setInterval(() => {
            const startX = random(canvas.width * 0.2, canvas.width * 0.8);
            const targetX = random(canvas.width * 0.05, canvas.width * 0.95);
            const targetY = random(canvas.height * 0.08, canvas.height * 0.52);
            fireworks.push(new Firework(startX, canvas.height, targetX, targetY));
        }, config.launchInterval);
    }

    if (config.clickToLaunch) {
        window.addEventListener("pointerdown", (e) => {
            const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
            if (["input", "select", "textarea"].includes(tag)) return;

            const startX = random(e.clientX - 50, e.clientX + 50);
            fireworks.push(new Firework(startX, canvas.height, e.clientX, e.clientY));
        });
    }

    loop();
    launchFireworks();
})();
