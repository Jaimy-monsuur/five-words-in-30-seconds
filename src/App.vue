<script setup>
import { RouterView } from 'vue-router'
import { computed, onMounted, ref } from 'vue'

const STORAGE_KEY = 'five-words-theme'
const theme = ref('dark')

const toggleLabel = computed(() =>
  theme.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
)

function applyTheme(nextTheme) {
  theme.value = nextTheme
  document.documentElement.setAttribute('data-theme', nextTheme)
  document.documentElement.style.colorScheme = nextTheme
}

function toggleTheme() {
  const nextTheme = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(nextTheme)
  localStorage.setItem(STORAGE_KEY, nextTheme)
}

onMounted(() => {
  const storedTheme = localStorage.getItem(STORAGE_KEY)
  if (storedTheme === 'light' || storedTheme === 'dark') {
    applyTheme(storedTheme)
    return
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(prefersDark ? 'dark' : 'light')
})
</script>

<template>
  <div class="app">
    <button
      class="theme-toggle"
      type="button"
      @click="toggleTheme"
      :aria-label="toggleLabel"
      :title="toggleLabel"
    >
      {{ theme === 'dark' ? 'Light mode' : 'Dark mode' }}
    </button>

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
  color-scheme: light;
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
  --card-bg: #ffffff;
  --card-item-bg: #f6f1ff;
  --card-border: rgba(99, 62, 144, 0.16);
  --card-shadow:
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 6px 20px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
  --text-primary: #f7f3ff;
  --text-on-card: #241141;
  --text-muted: rgba(242, 234, 255, 0.82);
  --font-display: 'Bricolage Grotesque', sans-serif;
  --font-body: 'Outfit', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

html {
  height: 100%;
  overflow-x: hidden;
  forced-color-adjust: none !important;
  background: linear-gradient(135deg, var(--purple-deep), var(--purple-mid), var(--purple)) !important;
  color: var(--text-primary) !important;
}

body {
  height: 100%;
  overflow-x: hidden;
  forced-color-adjust: none;
  font-family: var(--font-body);
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--purple-deep), var(--purple-mid), var(--purple));
}

.app {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--purple-deep) 0%, var(--purple-mid) 50%, var(--purple) 100%) !important;
}

.theme-toggle {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 5;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  padding: 8px 14px;
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  background: rgba(20, 10, 45, 0.4);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.theme-toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(20, 10, 45, 0.28);
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

[data-theme='dark'] {
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

@media (max-width: 640px) {
  .theme-toggle {
    top: 10px;
    right: 10px;
    padding: 7px 12px;
    font-size: 0.82rem;
  }
}
</style>
