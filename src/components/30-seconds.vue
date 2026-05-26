<template>
  <div class="game-root">
    <header class="game-header">
      <div class="header-top">
        <router-link to="/" class="btn-back">
          <span class="back-arrow">&larr;</span>
        </router-link>
        <h1 class="game-title">30 Seconds</h1>
      </div>
      <div v-if="gameState === 'playing'" class="timer-wrapper">
        <div class="timer" :class="{ urgent: timer <= 5 }" :style="{ color: timerColor }">
          <span class="timer-value">{{ timer }}</span>
          <span class="timer-label">sec</span>
        </div>
        <div class="cards-done">{{ cardsCompleted }} kaarten</div>
      </div>
    </header>

    <main class="game-main">
      <div v-if="gameState === 'idle'" class="start-screen">
        <div class="start-card">
          <p class="start-hint">Trek een kaart om te beginnen</p>
          <button @click="startGame" class="btn-start">
            <span class="btn-start-icon">&#9654;</span>
            Start
          </button>
        </div>
      </div>

      <div v-else-if="gameState === 'playing'" class="game-area">
        <div class="game-board">
        <div class="card-stack">
          <div
            v-for="(card, index) in bgCards"
            :key="card.id"
            class="card card-bg"
            :style="bgCardStyle(index)"
          >
            <div class="card-inner">
              <ul class="word-list">
                <li class="word">&nbsp;</li>
                <li class="word">&nbsp;</li>
                <li class="word">&nbsp;</li>
                <li class="word">&nbsp;</li>
                <li class="word">&nbsp;</li>
              </ul>
            </div>
          </div>

          <div
            v-if="topCard"
            :key="topCard.id"
            class="card card-top"
            :class="{
              dragging: isDragging && !isLeaving,
              leaving: isLeaving,
              next: isNext,
              settling: isSettling,
            }"
            :style="topCardStyle"
            @pointerdown="startDrag"
            @pointermove="onDrag"
            @pointerup="endDrag"
            @pointercancel="endDrag"
          >
            <div class="card-inner">
              <div class="card-number">#{{ cardsCompleted + 1 }}</div>
              <ul class="word-list">
                <li
                  v-for="(word, wi) in topCard.words"
                  :key="wi"
                  class="word"
                  :style="{ animationDelay: wi * 0.07 + 's' }"
                >
                  {{ word }}
                </li>
              </ul>
            </div>
          </div>

          <div v-if="!topCard" class="empty-stack">
            <p>Geen woorden meer</p>
          </div>
        </div>

        <button
          @click="nextCard"
          class="btn-next"
          :disabled="isLeaving || isSettling || isNext"
        >
          <svg class="btn-next-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          Volgende
        </button>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
const SPEED_THRESHOLD = 80;

export default {
  props: {
    wordsData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      words: [...(this.wordsData.words || [])],
      gameState: 'idle',
      cardStack: [],
      isDragging: false,
      isLeaving: false,
      isSettling: false,
      isNext: false,
      swipeX: 0,
      swipeY: 0,
      dragStart: { x: 0, y: 0 },
      timer: 30,
      timerInterval: null,
      cardsCompleted: 0,
      cardIdCounter: 0,
    };
  },
  computed: {
    topCard() {
      return this.cardStack[0] || null;
    },
    bgCards() {
      return this.cardStack.slice(1);
    },
    timerColor() {
      if (this.timer > 20) return 'var(--timer-green)';
      if (this.timer > 10) return 'var(--timer-orange)';
      return 'var(--timer-red)';
    },
    topCardStyle() {
      if (this.isLeaving) {
        const angle = Math.atan2(this.swipeY, this.swipeX);
        const dist = 600;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        const rot = this.swipeX * 0.06;
        return {
          transform: 'translate(' + x + 'px, ' + y + 'px) rotate(' + rot + 'deg)',
          opacity: 0,
        };
      }
      if (this.isDragging) {
        const rot = this.swipeX * 0.04 + this.swipeY * 0.02;
        return {
          transform: 'translate(' + this.swipeX + 'px, ' + this.swipeY + 'px) rotate(' + rot + 'deg)',
        };
      }
      return {};
    },
  },
  methods: {
    bgCardStyle(index) {
      const offsets = [
        { x: 4, y: 8, r: -1.5 },
        { x: -3, y: 16, r: 2 },
        { x: 2, y: 24, r: -0.5 },
      ];
      const o = offsets[index] || offsets[0];
      return {
        transform: 'translate(' + o.x + 'px, ' + o.y + 'px) rotate(' + o.r + 'deg)',
        zIndex: 3 - index,
      };
    },
    shuffleArray(arr) {
      const a = [...arr];
      let i = a.length;
      while (i) {
        const r = Math.floor(Math.random() * i);
        i--;
        [a[i], a[r]] = [a[r], a[i]];
      }
      return a;
    },
    getRandomWords(count) {
      if (this.words.length === 0) return [];
      const shuffled = this.shuffleArray(this.words);
      const taken = shuffled.splice(0, Math.min(count, shuffled.length));
      this.words = shuffled;
      return taken;
    },
    generateCard() {
      const words = this.getRandomWords(5);
      if (words.length === 0) return null;
      this.cardIdCounter++;
      return { id: this.cardIdCounter, words };
    },
    fillStack() {
      while (this.cardStack.length < 4) {
        const card = this.generateCard();
        if (!card) break;
        this.cardStack.push(card);
      }
    },
    startGame() {
      this.timer = 30;
      this.cardsCompleted = 0;
      this.cardStack = [];
      this.cardIdCounter = 0;
      this.isDragging = false;
      this.isLeaving = false;
      this.isNext = false;
      this.swipeX = 0;
      this.swipeY = 0;

      this.words = [...(this.wordsData.words || [])];
      this.shuffleArray(this.words);
      this.fillStack();
      this.gameState = 'playing';

      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        }
      }, 1000);
    },
    startDrag(e) {
      if (this.isLeaving || this.isSettling || this.isNext || this.gameState !== 'playing') return;
      this.isDragging = true;
      this.swipeX = 0;
      this.swipeY = 0;
      this.dragStart = { x: e.clientX, y: e.clientY };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    onDrag(e) {
      if (!this.isDragging) return;
      this.swipeX = e.clientX - this.dragStart.x;
      this.swipeY = e.clientY - this.dragStart.y;
    },
    endDrag() {
      if (!this.isDragging) return;
      this.isDragging = false;
      const dist = Math.hypot(this.swipeX, this.swipeY);
      if (dist > SPEED_THRESHOLD) {
        this.flyAway();
      } else {
        this.snapBack();
      }
    },
    snapBack() {
      this.swipeX = 0;
      this.swipeY = 0;
    },
    flyAway() {
      this.isLeaving = true;
      setTimeout(() => {
        this.advanceCard();
      }, 350);
    },
    nextCard() {
      if (this.isLeaving || this.isSettling || this.isNext) return;
      this.isNext = true;
      setTimeout(() => {
        this.advanceCard();
      }, 350);
    },
    advanceCard() {
      this.cardStack.shift();
      this.cardsCompleted++;
      this.isLeaving = false;
      this.isNext = false;
      this.swipeX = 0;
      this.swipeY = 0;

      this.timer = 30;
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        }
      }, 1000);

      this.isSettling = true;
      setTimeout(() => {
        this.fillStack();
        setTimeout(() => {
          this.isSettling = false;
        }, 50);
      }, 300);
    },
  },
};
</script>
<style scoped>
.game-root {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.game-header {
  padding: 20px 24px 0;
}

.header-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.btn-back {
  color: var(--text-primary);
  text-decoration: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.btn-back:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(-2px);
}

.back-arrow {
  font-size: 1.3rem;
  line-height: 1;
}

.game-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
}

.timer-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 20px;
  padding: 12px 0 8px;
  text-align: center;
}

.timer {
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-family: var(--font-mono);
  transition: color 0.5s ease;
}

.timer-value {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
}

.timer-label {
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.7;
  font-family: var(--font-body);
}

.timer.urgent .timer-value {
  animation: timerPulse 0.5s ease-in-out infinite;
}

@keyframes timerPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.18); }
}

.cards-done {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-muted);
}

.game-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 24px 40px;
}

.start-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60vh;
}

.start-card {
  text-align: center;
}

.start-hint {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--text-muted);
  margin-bottom: 24px;
  font-weight: 300;
}

.btn-start {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  padding: 16px 48px;
  border: none;
  border-radius: 16px;
  color: white;
  background: linear-gradient(135deg, var(--green), #2e7d32);
  box-shadow: 0 8px 32px var(--green-glow);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.btn-start:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 48px var(--green-glow);
}

.btn-start:active {
  transform: scale(0.97);
}

.btn-start-icon {
  font-size: 0.9rem;
}

.btn-start--again {
  font-size: 1.1rem;
  padding: 14px 40px;
}

.game-area {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 60vh;
}

.game-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.game-board > .btn-next {
  margin-top: 16px;
}

.card-stack {
  position: relative;
  width: min(340px, 82vw);
  height: min(460px, 68vh);
  perspective: 800px;
}

.card {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: var(--card-bg) !important;
  border: 1px solid var(--card-border);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  backdrop-filter: blur(2px);
  forced-color-adjust: none !important;
}

.card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 28px 24px 24px;
  background: var(--card-bg);
  forced-color-adjust: none;
}

.card-number {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--purple);
  opacity: 0.5;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
}

.card-bg {
  opacity: 0.85;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.card-top {
  z-index: 10;
  animation: cardFloat 4s ease-in-out infinite;
  touch-action: none;
  cursor: grab;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.3s ease;
}

.card-top.dragging {
  transition: none !important;
  animation: none;
  cursor: grabbing;
}

.card-top.leaving {
  transition:
    transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.3s ease;
  animation: none;
  cursor: default;
}

.card-top.settling {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
  animation: none;
}

.card-top.next {
  animation: cardNext 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  pointer-events: none;
  cursor: default;
}

@keyframes cardNext {
  to {
    transform: translateX(500px) rotate(12deg);
    opacity: 0;
  }
}

@keyframes cardFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

.word-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 8px;
}

.word {
  font-family: var(--font-display);
  font-size: clamp(1rem, 3.5vw, 1.4rem);
  font-weight: 500;
  color: var(--text-on-card) !important;
  padding: 6px 12px;
  border-radius: 8px;
  background: var(--card-item-bg) !important;
  border-left: 3px solid var(--purple-light);
  line-height: 1.4;
  animation: wordIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  forced-color-adjust: none;
}

.word:nth-child(1) { animation-delay: 0s; }
.word:nth-child(2) { animation-delay: 0.07s; }
.word:nth-child(3) { animation-delay: 0.14s; }
.word:nth-child(4) { animation-delay: 0.21s; }
.word:nth-child(5) { animation-delay: 0.28s; }

@keyframes wordIn {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.empty-stack {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-family: var(--font-body);
  font-size: 1rem;
}

.btn-next {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  padding: 12px 28px;
  border: none;
  border-radius: 14px;
  color: white;
  background: linear-gradient(135deg, var(--purple-mid), var(--purple));
  box-shadow: 0 6px 24px var(--purple-glow);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 5;
  overflow: hidden;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.btn-next:hover:not(:disabled) {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 36px var(--purple-glow);
}

.btn-next:active:not(:disabled) {
  transform: scale(0.97);
}

.btn-next:disabled {
  opacity: 0.4;
  cursor: default;
}

.btn-next-icon {
  width: 18px;
  height: 18px;
}

</style>
