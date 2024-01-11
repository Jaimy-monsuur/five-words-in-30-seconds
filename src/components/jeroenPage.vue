<script >
import wordsData from '@/assets/Jeroen.json';
import Game from "@/components/30-seconds.vue";
export default {
  components: {Game},
  data() {
    return {
      wordsData: wordsData,
    };
  },
};
</script>

<template>
  <game  :words-data="wordsData"></game>
</template>
<style scoped>
html {
  background-color: #8a2be2; /* Purple background color */

}
</style>