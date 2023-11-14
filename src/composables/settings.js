// composables/settings.js
import { ref } from 'vue';

const fontSize = ref(14); // Default font size
const backgroundColor = ref('#ffffff'); // Default background color

export function useSettings() {
  return {
    fontSize,
    backgroundColor,
    // Add methods for setting and retrieving other settings...
  };
}

