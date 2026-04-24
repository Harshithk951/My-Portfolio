import { useState, useEffect } from 'react';

/**
 * useWordCycle Hook
 * 
 * Cycles through an array of words at specified time intervals.
 * Returns the index of the current word, allowing components to display
 * different content based on the word cycle progression.
 * 
 * @param {string[]} words - Array of words to cycle through (e.g., ['React', 'Node.js', 'Python'])
 * @param {number} [interval=2000] - Time in milliseconds between word changes. Default: 2000ms (2 seconds)
 * @returns {number} Current word index (0 to words.length - 1)
 * 
 * @example
 * // Basic usage
 * import { useWordCycle } from '@/hooks/useWordCycle';
 * 
 * function SkillDisplay() {
 *   const skills = ['React', 'Node.js', 'Python', 'TypeScript'];
 *   const currentIndex = useWordCycle(skills, 1500);
 *   
 *   return (
 *     <motion.div key={currentIndex}>
 *       <h2>{skills[currentIndex]}</h2>
 *     </motion.div>
 *   );
 * }
 * 
 * @note The hook cleans up the interval on unmount
 * @note Interval updates if the words array or interval parameter changes
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
