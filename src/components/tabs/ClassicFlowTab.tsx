import { useState } from 'react';
import { Database, Send, Target, Terminal } from 'lucide-react';
import { CLASSIC_STEPS } from '../../constants';
import { useTrainingSimulation, usePulse } from '../../hooks';
import type { ThemeConfig } from '../../types';

interface ClassicFlowTabProps {
  theme: ThemeConfig;
  isDarkMode: boolean;
}

export function ClassicFlowTab({ theme, isDarkMode }: ClassicFlowTabProps) {
  const [step, setStep] = useState(0);
  const { logs, addLog } = useTrainingSimulation();
  const { pulseStage, triggerPulse } = usePulse(addLog);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-wrap gap-2 mb-8">
        {CLASSIC_STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setStep(i)}
            className={`font-mono text-[10px] px-4 py-2 rounded-xl border transition-all ${step === i ? 'bg-[#7896f526] border-[#7896f5] text-[#7896f5]' : `${theme.borderBright} ${theme.muted}`}`}
          >
            Step {i + 1}: {s.title}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className={`lg:col-span-8 ${theme.panel} border ${theme.borderBright} rounded-[2rem] min-h-[420px] relative flex items-center justify-center overflow-hidden shadow-inner`}>
          {step === 0 && (
            <div className="grid grid-cols-4 gap-6 opacity-40 font-mono animate-in zoom-in-95">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="p-4 border border-bright rounded-2xl flex flex-col items-center bg-white/5">
                  <Database size={24} className="text-[#7896f5] mb-2" />
                  <span className="text-[9px] uppercase tracking-tighter">Feature.{i}</span>
                </div>
              ))}
            </div>
          )}
          {step === 1 && (
            <div className="w-full flex flex-col items-center">
              <svg viewBox="0 0 420 240" className="w-full max-lg drop-shadow-2xl">
                {[60, 120, 180].map((y1) => [40, 90, 140, 190].map((y2) => (
                  <line key={`p1-${y1}-${y2}`} x1="60" y1={y1} x2="200" y2={y2} stroke="#7896f5" strokeWidth={pulseStage === 2 ? 3 : 1} opacity={pulseStage === 2 ? 1 : 0.1} className={pulseStage === 2 ? 'flowing' : ''} />
                )))}
                {[40, 90, 140, 190].map((y1) => (
                  <line key={`p2-${y1}`} x1="200" y1={y1} x2="360" y2={120} stroke="#7896f5" strokeWidth={pulseStage === 4 ? 3 : 1} opacity={pulseStage === 4 ? 1 : 0.1} className={pulseStage === 4 ? 'flowing' : ''} />
                ))}
                <g>
                  {[60, 120, 180].map((y) => (
                    <circle key={`i-${y}`} cx="60" cy={y} r="12" fill={pulseStage >= 1 ? '#7896f5' : (isDarkMode ? '#131620' : '#fff')} stroke="#7896f5" strokeWidth="2" className="transition-all duration-300" />
                  ))}
                  {[40, 90, 140, 190].map((y) => (
                    <circle key={`h-${y}`} cx="200" cy={y} r="12" fill={pulseStage >= 3 ? '#c792ea' : (isDarkMode ? '#131620' : '#fff')} stroke={pulseStage >= 3 ? '#c792ea' : '#404859'} strokeWidth="2" className="transition-all duration-500" />
                  ))}
                  <circle cx="360" cy="120" r="18" fill={pulseStage >= 5 ? '#3ecb8a' : (isDarkMode ? '#131620' : '#fff')} stroke={pulseStage >= 5 ? '#3ecb8a' : '#404859'} strokeWidth="3" className="transition-all duration-500" />
                </g>
              </svg>
              <button
                onClick={triggerPulse}
                disabled={pulseStage !== 0}
                className="mt-8 flex items-center gap-3 bg-[#7896f5] text-[#0d0f14] px-8 py-3 rounded-2xl font-mono text-[11px] font-black uppercase hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-30"
              >
                <Send size={14} /> {pulseStage === 0 ? 'Fire Activation Signal' : 'Computing Path...'}
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="text-center animate-in zoom-in-95 duration-500">
              <Target className="mx-auto text-[#3ecb8a] mb-6" size={64} />
              <div className="font-mono text-sm uppercase tracking-[0.2em] text-[#3ecb8a] font-black">Pattern_Match: 98.2 %</div>
            </div>
          )}
        </div>
        <div className="lg:col-span-4 space-y-4">
          <div className={`${theme.surface2} p-6 border ${theme.border} rounded-2xl h-full shadow-lg`}>
            <div className="font-mono text-[10px] text-[#3ecb8a] uppercase mb-4 tracking-tighter flex items-center gap-2">
              <Terminal size={14} /> Node_Explorer
            </div>
            <div className="space-y-2 font-mono text-[10px] opacity-60 min-h-[160px]">
              {logs.map((l, i) => (
                <div key={i} className={`border-l-2 pl-3 ${i === 0 ? 'border-[#7896f5] text-[#7896f5] opacity-100' : 'border-bright opacity-40'}`}>{l}</div>
              ))}
              {pulseStage !== 0 && <div className="animate-pulse">_</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
