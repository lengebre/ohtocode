import { Moon, Sun } from 'lucide-react';
import type { ThemeConfig } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  theme: ThemeConfig;
}

export function Header({ isDarkMode, onToggleDarkMode, theme }: HeaderProps) {
  return (
    <header className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-black/5 dark:border-white/5 pb-8 gap-6`}>
      <div>
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#7896f5] mb-2">
          Neural Reference Architecture
        </div>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
          AIF-C01 <span className="text-[#7896f5]">Notes</span>
        </h1>
      </div>
      <button
        onClick={onToggleDarkMode}
        className={`p-3 rounded-2xl border ${theme.borderBright} ${theme.surface} hover:shadow-lg transition-all flex items-center gap-3`}
      >
        {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
          {isDarkMode ? 'Light' : 'Dark'} Mode
        </span>
      </button>
    </header>
  );
}
