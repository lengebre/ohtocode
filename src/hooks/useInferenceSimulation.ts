import { useState, useEffect } from 'react';

export function useInferenceSimulation() {
  const [isInferenceRunning, setIsInferenceRunning] = useState(false);
  const [inferenceProgress, setInferenceProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isInferenceRunning) {
      setInferenceProgress(0);
      interval = setInterval(() => {
        setInferenceProgress((prev) => {
          if (prev >= 100) {
            setIsInferenceRunning(false);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isInferenceRunning]);

  return { isInferenceRunning, setIsInferenceRunning, inferenceProgress };
}
