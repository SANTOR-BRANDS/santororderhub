import { useEffect, useRef } from 'react';

/**
 * Throttle hook - delays executing a callback until after wait milliseconds
 * have elapsed since the last time it was invoked.
 * 
 * @param callback - The function to throttle
 * @param delay - Delay in milliseconds (default: 1000)
 * 
 * @example
 * const throttledSave = useThrottle((basket) => {
 *   localStorage.setItem('basket', JSON.stringify(basket));
 * }, 1000);
 * 
 * useEffect(() => {
 *   throttledSave(basketItems);
 * }, [basketItems, throttledSave]);
 */
export function useThrottle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  delay = 1000
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastExecRef = useRef<number>(0);

  return (...args: Parameters<T>) => {
    const now = Date.now();
    const elapsed = now - lastExecRef.current;

    const execute = () => {
      lastExecRef.current = now;
      callback(...args);
    };

    if (elapsed > delay) {
      // If enough time has passed, execute immediately
      execute();
    } else {
      // Otherwise, schedule for later
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(execute, delay - elapsed);
    }
  };
}
