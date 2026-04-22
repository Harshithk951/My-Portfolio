import { useState, useEffect } from 'react';

/**
 * Custom hook for cycling through an array of words
 * @param {string[]} words - Array of words to cycle through
 * @param {number} interval - Time in milliseconds between word changes (default: 2000ms)
 * @returns {number} - Current word index
 */
export const useWordCycle = (words, interval = 2000) => {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return currentWord;
};
