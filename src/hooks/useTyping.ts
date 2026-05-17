import { useEffect, useState } from 'react';

/**
 * A custom hook that simulates typing effect on a text string.
 * @param text The string to be typed out.
 * @param speed The typing speed in milliseconds per character.
 */
export function useTyping(text: string, speed = 50) {
  const [out, setOut] = useState('');
  
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    
    return () => clearInterval(t);
  }, [text, speed]);
  
  return out;
}
