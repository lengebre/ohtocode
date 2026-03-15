import { useState, useCallback } from 'react';

export function usePulse(onLog: (msg: string) => void) {
  const [pulseStage, setPulseStage] = useState(0);

  const triggerPulse = useCallback(() => {
    if (pulseStage !== 0) return;
    setPulseStage(1);
    onLog("[SIGNAL] Exciting input layer...");
    setTimeout(() => setPulseStage(2), 500);
    setTimeout(() => {
      setPulseStage(3);
      onLog("[PROCESS] Hidden neurons calculating weights...");
    }, 1000);
    setTimeout(() => setPulseStage(4), 1500);
    setTimeout(() => {
      setPulseStage(5);
      onLog("[RESULT] Prediction layer reached.");
    }, 2000);
    setTimeout(() => setPulseStage(0), 3500);
  }, [pulseStage, onLog]);

  return { pulseStage, triggerPulse };
}
