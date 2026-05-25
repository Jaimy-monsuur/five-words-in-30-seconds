<script >
import wordsData from '@/assets/base.json';
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
  <game :words-data="wordsData"></game>
</template>
