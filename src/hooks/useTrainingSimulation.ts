import { useState, useEffect } from 'react';

const MAX_EPOCH = 100;
const LOSS_DECAY = 0.95;
const INITIAL_LOSS = 1.0;

export function useTrainingSimulation() {
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(INITIAL_LOSS);
  const [weights, setWeights] = useState([0.15, 0.45, 0.72, 0.12, 0.88, 0.34]);
  const [logs, setLogs] = useState(["[INIT] System ready.", "[READY] Waiting for signal..."]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isTraining && epoch < MAX_EPOCH) {
      interval = setInterval(() => {
        setEpoch((prev) => {
          const next = prev + 1;
          if (next % 10 === 0) {
            setLogs((l) => [`[TRAIN] Epoch ${next} | Loss: ${(INITIAL_LOSS * Math.pow(0.92, next)).toFixed(4)}`, ...l.slice(0, 4)]);
          }
          return next;
        });
        setLoss((prev) => prev * LOSS_DECAY);
        setWeights((prev) => prev.map((w) => Math.min(1, Math.max(0.1, w + (Math.random() - 0.5) * 0.05))));
      }, 100);
    } else if (epoch >= MAX_EPOCH) {
      setIsTraining(false);
      setLogs((prev) => ["[SUCCESS] Network weights optimized.", ...prev]);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isTraining, epoch]);

  const addLog = (message: string) => setLogs((prev) => [message, ...prev.slice(0, 3)]);

  return { isTraining, setIsTraining, epoch, loss, weights, logs, addLog };
}
