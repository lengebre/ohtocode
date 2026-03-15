import { useState } from 'react';
import { Binary, FileText, Image as ImageIcon, Music } from 'lucide-react';
import { DATA_MODALITIES } from '../../constants';
import type { ThemeConfig } from '../../types';

const STRUCTURED_ROWS = [
  { id: '#001', a: '0.82', b: '42.1', l: 'True' },
  { id: '#002', a: '0.11', b: '19.4', l: 'False' },
  { id: '#003', a: '0.45', b: '33.9', l: 'True' },
];

interface DataTypesTabProps {
  theme: ThemeConfig;
}

export function DataTypesTab({ theme }: DataTypesTabProps) {
  const [activeModality, setActiveModality] = useState('unstructured');
  const [showMachineView, setShowMachineView] = useState(false);

  const currentModality = DATA_MODALITIES.find((m) => m.id === activeModality)!;

  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-4">
          <div className={`font-mono text-[10px] uppercase tracking-widest ${theme.muted} mb-4`}>Modality Selection</div>
          {DATA_MODALITIES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModality(mod.id)}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-start gap-4 ${activeModality === mod.id ? 'border-[#7896f5] bg-[#7896f50d] shadow-lg' : `${theme.borderBright} opacity-50`}`}
            >
              <div className={`p-3 rounded-xl ${activeModality === mod.id ? 'bg-[#7896f5] text-[#0d0f14]' : 'bg-surface2 text-slate-500'}`}>{mod.icon}</div>
              <div>
                <div className={`font-mono text-xs font-black uppercase ${activeModality === mod.id ? 'text-[#7896f5]' : ''}`}>{mod.title}</div>
                <p className="text-[10px] mt-2 leading-relaxed font-light">{mod.desc}</p>
              </div>
            </button>
          ))}
          <div className={`mt-8 p-6 ${theme.surface2} border ${theme.border} rounded-2xl`}>
            <div className="flex items-center gap-2 mb-4">
              <Binary className="text-[#3ecb8a]" size={14} />
              <span className="font-mono text-[10px] uppercase font-bold text-[#3ecb8a]">Machine Translation</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-60">Models don&apos;t &quot;see&quot; cats or &quot;read&quot; words. All modalities are converted into high-dimensional vectors (arrays of floats) before processing.</p>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <div className={`${theme.panel} border ${theme.borderBright} rounded-[2rem] p-8 min-h-[400px] flex flex-col shadow-inner overflow-hidden`}>
            <div className="flex justify-between items-center mb-8">
              <div className="font-mono text-xs font-black uppercase tracking-widest text-[#7896f5]">Data Inspector</div>
              <button
                onClick={() => setShowMachineView(!showMachineView)}
                className={`px-4 py-1.5 rounded-full font-mono text-[10px] uppercase transition-all border ${showMachineView ? 'bg-[#3ecb8a] text-[#0d0f14] border-[#3ecb8a]' : `${theme.borderBright} ${theme.muted}`}`}
              >
                {showMachineView ? 'View: Numbers' : 'View: Human'}
              </button>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <div className="w-full max-w-md space-y-6">
                {activeModality === 'unstructured' ? (
                  <div className="animate-in zoom-in-95 duration-500">
                    {showMachineView ? (
                      <div className="bg-[#0d0f14]/50 p-6 rounded-2xl border border-bright font-mono text-[10px] text-[#7896f5] leading-relaxed overflow-hidden">
                        <div>[0.122, -0.456, 0.882, 0.001, ... ]</div>
                        <div className="opacity-60 mt-1">[0.992, 0.112, -0.221, 0.543, ... ]</div>
                        <div className="opacity-30 mt-1">[-0.12, 0.887, 0.111, -0.098, ... ]</div>
                        <div className="mt-4 text-[#3ecb8a] opacity-80">// 1,536 Dimensional Tensor</div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-4">
                        <div className={`aspect-square rounded-2xl border-2 border-bright flex items-center justify-center bg-[#7896f51a]`}><ImageIcon className="text-[#7896f5]" /></div>
                        <div className={`aspect-square rounded-2xl border-2 border-bright flex items-center justify-center bg-[#c792ea1a]`}><FileText className="text-[#c792ea]" /></div>
                        <div className={`aspect-square rounded-2xl border-2 border-bright flex items-center justify-center bg-[#3ecb8a1a]`}><Music className="text-[#3ecb8a]" /></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="animate-in zoom-in-95 duration-500">
                    <div className={`border border-bright rounded-xl overflow-hidden ${theme.surface2}`}>
                      <div className="bg-bright px-4 py-2 font-mono text-[9px] flex justify-between uppercase font-bold opacity-40">
                        <span>ID</span><span>Val_A</span><span>Val_B</span><span>Label</span>
                      </div>
                      <div className="p-4 space-y-2 font-mono text-[10px]">
                        {STRUCTURED_ROWS.map((row) => (
                          <div key={row.id} className="flex justify-between border-b border-bright pb-2 last:border-0 opacity-80">
                            <span>{row.id}</span>
                            <span className="text-[#7896f5]">{row.a}</span>
                            <span className="text-[#c792ea]">{row.b}</span>
                            <span className="text-[#3ecb8a]">{row.l}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentModality.types.map((t) => (
                <div key={t.name} className={`p-4 border ${theme.borderBright} rounded-xl ${theme.surface2}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-indigo-400">{t.icon}</div>
                    <div className="font-mono text-[9px] font-bold uppercase">{t.name}</div>
                  </div>
                  <div className="text-[10px] opacity-60 leading-tight">{t.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
