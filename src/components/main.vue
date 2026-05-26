<script setup>
</script>

<template>
  <div class="container">
    <header class="hero">
      <p class="hero-subtitle">Five words in</p>
      <h1 class="hero-title">30 Seconds</h1>
      <div class="hero-divider"></div>
    </header>

    <section class="intro">
      <p>
        30 Seconds is een spel waarin je woorden moet uitleggen aan je team
        zonder het woord zelf te zeggen. Je hebt 30 seconden om zoveel mogelijk
        woorden te omschrijven.
      </p>
      <p class="cta-text">Klik op een startknop om te beginnen!</p>
    </section>

    <nav class="button-container">
      <router-link to="/baseGame" class="button button--base">
        <span class="button-label">Base Game</span>
        <span class="button-desc">Standaard woorden</span>
      </router-link>
      <router-link to="/cookie" class="button button--base">
        <span class="button-label">Cookie Games</span>
        <span class="button-desc">The Cookie Edition</span>
      </router-link>
    </nav>


  </div>
</template>

<style scoped>
.container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 60px 24px;
  text-align: center;
}

.hero {
  margin-bottom: 32px;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, #ffffff 0%, var(--purple-light) 50%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleGlow 3s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  0% { filter: drop-shadow(0 0 20px var(--purple-glow)); }
  100% { filter: drop-shadow(0 0 40px var(--purple-glow)); }
}

.hero-divider {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--green), transparent);
  margin: 16px auto 0;
  border-radius: 2px;
}

.intro {
  max-width: 480px;
  margin-bottom: 40px;
}

.intro p {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--text-muted);
  font-weight: 300;
}

.cta-text {
  margin-top: 16px;
  font-family: var(--font-display);
  font-weight: 500;
  color: var(--text-primary) !important;
}

.button-container {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 18px 32px;
  border-radius: 16px;
  text-decoration: none;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 200px;
  position: relative;
  overflow: hidden;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
}

.button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.button:hover {
  transform: translateY(-4px) scale(1.02);
}

.button:hover::before {
  opacity: 1;
}

.button--base {
  background: linear-gradient(135deg, var(--purple-mid), var(--purple));
  box-shadow: 0 8px 32px var(--purple-glow);
}

.button--base:hover {
  box-shadow: 0 12px 48px var(--purple-glow);
}

.button-label {
  position: relative;
  z-index: 1;
}

.button-desc {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 400;
  position: relative;
  z-index: 1;
}


</style>
