import { Cpu, Brain } from 'lucide-react';
import type { ThemeConfig } from '../types';

interface FooterProps {
  theme: ThemeConfig;
  isDarkMode: boolean;
}

export function Footer({ theme, isDarkMode }: FooterProps) {
  return (
    <footer className={`mt-16 border-t ${theme.border} pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-[10px]`}>
      <div className={`${theme.muted} leading-relaxed`}>
        <span className={isDarkMode ? 'text-white' : 'text-black'}>UNIDIRECTIONAL FLOW:</span>{' '}
        Data maps to vectors, vectors map to hidden weights, and weights synthesize predictions.
      </div>
      <div className="flex flex-col gap-3 justify-center items-end">
        <div className="flex items-center gap-3 opacity-60">
          <Cpu size={14} /> WEIGHTS: NUMERICAL INTENSITY
        </div>
        <div className="flex items-center gap-3 opacity-60">
          <Brain size={14} /> NEURONS: NON-LINEAR NODES
        </div>
      </div>
    </footer>
  );
}
