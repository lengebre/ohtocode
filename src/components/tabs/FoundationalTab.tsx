import { useState } from 'react';
import { Rocket, UserCheck, ArrowRight, Sparkles, ThumbsUp, Info } from 'lucide-react';
import { FOUNDATIONAL_STAGES } from '../../constants';
import { useInferenceSimulation } from '../../hooks';
import type { ThemeConfig } from '../../types';

interface FoundationalTabProps {
  theme: ThemeConfig;
  isDarkMode: boolean;
}

export function FoundationalTab({ theme, isDarkMode }: FoundationalTabProps) {
  const [scale, setScale] = useState(70);
  const [lifecycleStep, setLifecycleStep] = useState(0);
  const { isInferenceRunning, setIsInferenceRunning, inferenceProgress } = useInferenceSimulation();

  const capability = scale > 130 ? 'MULTI_STEP_REASONING' : scale > 60 ? 'COHERENT_OUTPUT' : 'PATTERN_MATCH';

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className={`${theme.surface2} p-8 border ${theme.borderBright} rounded-3xl shadow-inner`}>
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <Rocket className="text-[#7896f5]" size={20} />
                <div className={`font-mono text-[10px] uppercase tracking-[0.2em] ${theme.muted}`}>Model Parameter Scale</div>
              </div>
              <span className="font-mono text-xs font-black text-[#7896f5] bg-[#7896f51a] px-4 py-1.5 rounded-full">{scale} Billion</span>
            </div>
            <input
              type="range"
              min="1"
              max="175"
              value={scale}
              onChange={(e) => setScale(parseInt(e.target.value, 10))}
              className={`w-full h-1.5 ${isDarkMode ? 'bg-[#2e3448]' : 'bg-[#e2e8f0]'} rounded-lg appearance-none cursor-pointer accent-[#7896f5]`}
            />
          </div>
          <div className={`${theme.panel} p-12 border ${theme.borderBright} rounded-[2.5rem] min-h-[280px] flex items-center justify-center relative shadow-2xl`}>
            <div className={`absolute inset-0 opacity-5 bg-[radial-gradient(${theme.accent}_1px,transparent_1px)] [background-size:24px_24px]`} />
            {lifecycleStep === 0 && (
              <div className="flex flex-wrap gap-3 justify-center max-w-md animate-in zoom-in-95">
                {[...Array(Math.floor(scale / 12) + 6)].map((_, i) => (
                  <div key={i} className="w-8 h-10 border border-[#7896f54d] rounded-lg bg-[#7896f50d] animate-pulse" />
                ))}
              </div>
            )}
            {lifecycleStep === 1 && (
              <div className="flex items-center gap-12 animate-in fade-in slide-in-from-right-12 duration-500">
                <UserCheck className="text-[#c792ea]" size={64} />
                <ArrowRight className="text-bright animate-bounce-x" size={32} />
                <Sparkles className="text-[#7896f5] animate-pulse" size={64} />
              </div>
            )}
            {lifecycleStep === 2 && (
              <div className="flex gap-16 items-center animate-in zoom-in-110">
                <div className="p-8 border-4 border-[#3ecb8a] rounded-full bg-[#3ecb8a0a] shadow-[0_0_50px_rgba(62,203,138,0.2)]">
                  <ThumbsUp className="text-[#3ecb8a]" size={48} />
                </div>
                <span className="font-mono text-[9px] font-black uppercase text-[#3ecb8a]">Human Alignment</span>
              </div>
            )}
          </div>
          <div className={`${theme.surface2} p-8 border ${theme.borderBright} rounded-3xl`}>
            <div className="flex justify-between items-center mb-6">
              <div className="font-mono text-[11px] font-black uppercase tracking-widest text-[#7a8499]">Inference_Kernel</div>
              {isInferenceRunning && (
                <span className="font-mono text-[10px] text-[#3ecb8a] animate-pulse font-bold">EXECUTING... {inferenceProgress}%</span>
              )}
            </div>
            <div className={`font-mono text-xs p-6 rounded-2xl ${theme.panel} text-[#7896f5] border ${theme.border} mb-6 shadow-inner min-h-[64px]`}>
              {isInferenceRunning
                ? '>> sampling_next_token(context, weights_v2.bin)...'
                : `>> System Ready [Capability: ${capability}]`}
            </div>
            <button
              onClick={() => setIsInferenceRunning(true)}
              disabled={isInferenceRunning}
              className="w-full py-4 bg-[#7896f5] text-[#0d0f14] rounded-2xl font-mono text-[11px] font-black uppercase transition-all hover:brightness-110 shadow-xl disabled:opacity-30"
            >
              Run Foundation Inference
            </button>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4">
          <div className={`${theme.surface} border ${theme.borderBright} rounded-[2rem] p-6 shadow-xl`}>
            <div className={`font-mono text-[10px] uppercase ${theme.muted} mb-8 tracking-[0.2em] flex items-center justify-between`}>
              Refinement Pipeline
              <Info size={14} className="opacity-40" />
            </div>
            <div className="space-y-3">
              {FOUNDATIONAL_STAGES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setLifecycleStep(i)}
                  className={`w-full text-left p-6 rounded-[1.5rem] border-2 transition-all flex items-start gap-4 ${
                    lifecycleStep === i
                      ? 'bg-indigo-500/10 border-[#7896f5] shadow-lg scale-[1.03]'
                      : `bg-transparent ${theme.borderBright} opacity-40 hover:opacity-100`
                  }`}
                >
                  <div className="mt-1 p-2.5 bg-black/10 rounded-xl" style={{ color: s.color }}>
                    {s.icon}
                  </div>
                  <div>
                    <div className={`font-mono text-[11px] font-black uppercase tracking-tight ${lifecycleStep === i ? 'text-[#7896f5]' : theme.text}`}>
                      {s.title}
                    </div>
                    <p className={`text-[10px] ${theme.muted} mt-2 leading-tight font-light`}>{s.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
