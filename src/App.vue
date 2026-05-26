<script setup>
import { RouterView } from 'vue-router'
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
  color-scheme: light dark;
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
  --card-item-bg: #f3e8ff;
  --card-border: rgba(155, 48, 255, 0.12);
  --card-shadow:
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 6px 20px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
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
  :root {
    --purple-deep: #140a2d;
    --purple-mid: #2a1452;
    --purple: #5f2ca5;
    --purple-light: #b987ff;
    --purple-glow: rgba(122, 78, 221, 0.32);
    --green: #67d98a;
    --green-glow: rgba(103, 217, 138, 0.28);
    --timer-green: #67d98a;
    --timer-orange: #ffb74d;
    --timer-red: #ff6b6b;
    --card-bg: #201633;
    --card-item-bg: #2a1d42;
    --card-border: rgba(194, 146, 255, 0.24);
    --card-shadow:
      0 24px 72px rgba(8, 5, 22, 0.62),
      0 8px 24px rgba(5, 3, 14, 0.5),
      0 1px 0 rgba(194, 146, 255, 0.1) inset;
    --text-primary: #f7f3ff;
    --text-on-card: #f2e9ff;
    --text-muted: rgba(232, 219, 255, 0.74);
  }
}
</style>
