<template>
  <div>
    <header>
      <h1>Five words in</h1>
      <h1>30 Seconds</h1>
    </header>
    <div class="app-container">
      <div v-if="currentCard !== null">
        <h2>Your Card:</h2>
        <div class="timer">{{ timer }}s</div>
        <div class="card-container">
          <ul class="word-list">
            <li v-for="(word, index) in currentCard.words" :key="index" class="word">{{ word }}</li>
          </ul>
        </div>
        <button @click="startTimer" class="next-button">Next</button>
      </div>
      <div v-else>
        <button @click="startTimer" class="next-button">Start</button>
      </div>
    </div>
  </div>
</template>

<script>
import wordsData from '@/assets/words.json';
import audioSound from '@/assets/beep.mp3';

export default {
  data() {
    return {
      words: wordsData.words,
      currentCard: null,
      timer: 30,
      timerInterval: null
    };
  },
  methods: {
    startTimer() {
      // Reset the timer
      this.timer = 30;

      // Clear any existing interval
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }

      // Start the timer interval
      this.timerInterval = setInterval(() => {
        if (this.timer > 1) {
          this.timer--;
        } else {
          this.timer--;
          // Time is up, play the beep sound
          const audio = new Audio(audioSound);
          audio.play();
          console.log('Audio played');
          // Stop the timer interval
          clearInterval(this.timerInterval);
        }
      }, 1000);

      // Get 5 random words without repeating
      const selectedWords = this.getRandomWords(5);
      console.log("New array length: " + this.words.length);
      this.currentCard = {
        words: selectedWords
      };
    },
    getRandomWords(count) {
      // Shuffle the array to get a random order
      const shuffledWords = this.shuffleArray(this.words);
      this.words = shuffledWords;
      // Take the first 'count' words
      return shuffledWords.splice(0, count);
    },
    shuffleArray(array) {
      // Fisher-Yates shuffle algorithm
      let currentIndex = array.length,
          randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }

      return array;
    }
  }
};
</script>

<style scoped>

.timer {
  margin-top: 10px;
  font-size: 24px;
  color: #4caf50; /* Green color for the timer */
  display: block;
}

header {
  text-align: center;
  padding: 10px;
  color: white; /* Text color for the header */
}

.word {
  margin-bottom: 5vh;
}

.app-container {
  background-color: #8a2be2; /* Purple background color */
  color: white; /* Text color */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.card-container {
  text-align: left;
  margin-top: 15px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Box shadow for a subtle lift effect */
  width: 30vh; /* Adjust the width as needed */
  height: 40vh;
  margin-bottom: 20px; /* Add margin to separate from the button */
}

.word-list {
  list-style: none; /* Remove bullet points */
  padding: 0;
}

.next-button {
  margin-top: 10px;
  background-color: #4caf50; /* Green background color for the button */
  color: white; /* Button text color */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  height: 5vh;
  width: 25vh;
}

.word {
  margin-bottom: 5vh;
}
</style>
