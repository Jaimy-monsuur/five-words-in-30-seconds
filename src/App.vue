<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

onMounted(() => {
  setTimeout(() => {
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;

    if (bodyBg === 'rgb(0, 0, 0)' || bodyBg === 'rgb(18, 18, 18)' || bodyBg === 'rgb(30, 30, 30)') {
      document.documentElement.style.setProperty('background-color', '#ffffff', 'important');
      document.body.style.setProperty('background-color', '#ffffff', 'important');
      document.body.style.setProperty('color', '#1a1a1a', 'important');

      const allTexts = document.querySelectorAll('p, h1, h2, h3, h4, span, a, li');
      allTexts.forEach(el => {
        el.style.setProperty('color', '#1a1a1a', 'important');
      });
    }
  }, 300);
})
</script>

<template>
  <div class="app">
    <div class="bg-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  color-scheme: only light !important;
  --purple-deep: #3c1053;
  --purple-mid: #7b2d8e;
  --purple: #9b30ff;
  --purple-light: #b77dff;
  --purple-glow: rgba(155, 48, 255, 0.4);
  --green: #4caf50;
  --green-glow: rgba(76, 175, 80, 0.4);
  --timer-green: #4caf50;
  --timer-orange: #ff9800;
  --timer-red: #f44336;
  --card-bg: #faf5ff;
  --text-primary: #ffffff;
  --text-on-card: #1a0a2e;
  --text-muted: rgba(255, 255, 255, 0.7);
  --font-display: 'Bricolage Grotesque', sans-serif;
  --font-body: 'Outfit', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

html {
  height: 100%;
  overflow-x: hidden;
  forced-color-adjust: none !important;
  background: linear-gradient(135deg, #3c1053, #7b2d8e, #9b30ff) !important;
  color: #ffffff !important;
}

body {
  height: 100%;
  overflow-x: hidden;
  forced-color-adjust: none;
  font-family: var(--font-body);
  color: var(--text-primary);
  background: transparent;
}

.app {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--purple-deep) 0%, var(--purple-mid) 50%, var(--purple) 100%) !important;
}

.bg-orbs {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: var(--purple-light);
  top: -100px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: var(--green);
  bottom: -80px;
  left: -80px;
  animation: float 25s ease-in-out infinite reverse;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: var(--purple-mid);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float 18s ease-in-out infinite 5s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

@media (prefers-color-scheme: dark) {
  html {
    filter: invert(1) hue-rotate(180deg) !important;
  }

  img, video, iframe, [class*="icon"], .no-invert {
    filter: invert(1) hue-rotate(180deg) !important;
  }
}
</style>
