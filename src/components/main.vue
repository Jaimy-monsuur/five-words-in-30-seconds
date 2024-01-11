<script setup>
</script>

<template>
  <div class="container">
    <h2>Five words in 30 Seconds</h2>
    <p>
      30 Seconds is a game where you have to explain words to your team without saying the word itself.
      You have 30 seconds to explain as many words as possible.
    </p>
    <p>Click on the start button to begin the game.</p>
    <div class="button-container">
      <router-link to="/baseGame" class="button">Base game</router-link>
      <router-link to="/cookie" class="button">Cookie Games</router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  color: white;
}

h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

p {
  font-size: 1.2em;
  margin-bottom: 15px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.button {
  display: inline-block;
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #4caf50; /* Green */
  color: white;
  text-decoration: none;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #45a049; /* Darker green on hover */
}

html {
  background-color: #8a2be2; /* Purple background color */
}
</style>
