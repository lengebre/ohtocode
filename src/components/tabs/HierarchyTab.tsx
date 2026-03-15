import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { HIERARCHY_LAYERS } from '../../constants';
import type { ThemeConfig } from '../../types';

interface HierarchyTabProps {
  theme: ThemeConfig;
  isDarkMode: boolean;
}

export function HierarchyTab({ theme, isDarkMode }: HierarchyTabProps) {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 flex justify-center py-6">
          <div className="relative w-full aspect-square max-w-[320px]">
            <div className={`absolute inset-0 border-2 ${theme.ring} rounded-full transition-all duration-500 ${hoveredLayer && hoveredLayer !== 'ai' ? 'opacity-20 blur-[1px]' : 'opacity-100'}`} />
            <div className={`absolute inset-[18%] border-2 transition-all duration-500 rounded-full ${hoveredLayer === 'ml' ? 'border-[#7896f5] bg-[#7896f505]' : theme.ring} ${hoveredLayer && hoveredLayer !== 'ml' ? 'opacity-20 blur-[1px]' : 'opacity-100'}`} />
            <div className={`absolute inset-[36%] border-2 transition-all duration-500 rounded-full ${hoveredLayer === 'dl' ? 'border-[#c792ea] bg-[#c792ea05]' : theme.ring} ${hoveredLayer && hoveredLayer !== 'dl' ? 'opacity-20 blur-[1px]' : 'opacity-100'}`} />
            <div className={`absolute inset-[54%] transition-all duration-500 rounded-full flex items-center justify-center ${hoveredLayer === 'genai' ? 'bg-white shadow-[0_0_50px_rgba(120,150,245,0.4)] scale-110' : 'bg-[#7896f5] shadow-xl'} ${hoveredLayer && hoveredLayer !== 'genai' ? 'opacity-20' : 'opacity-100'}`}>
              <Sparkles className={`transition-colors ${hoveredLayer === 'genai' ? 'text-indigo-600' : 'text-[#0d0f14]'}`} size={32} />
            </div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <path d="M 160 0 L 160 -40 L 400 -40" fill="none" stroke={theme.accent} strokeWidth="0.5" className="leader-line" opacity={hoveredLayer === 'ai' ? 1 : 0.2} />
              <path d="M 50 100 L -100 100" fill="none" stroke={theme.accent} strokeWidth="0.5" className="leader-line" opacity={hoveredLayer === 'ml' ? 1 : 0.2} />
              <path d="M 270 200 L 400 280" fill="none" stroke={theme.accent} strokeWidth="0.5" className="leader-line" opacity={hoveredLayer === 'dl' ? 1 : 0.2} />
            </svg>
          </div>
        </div>
        <div className="lg:col-span-6 space-y-3">
          <div className={`font-mono text-[10px] uppercase tracking-widest ${theme.muted} mb-4`}>Structural Classification</div>
          {HIERARCHY_LAYERS.map((layer) => (
            <div
              key={layer.id}
              onMouseEnter={() => setHoveredLayer(layer.id)}
              onMouseLeave={() => setHoveredLayer(null)}
              className={`group ${theme.surface2} border transition-all duration-300 rounded-2xl overflow-hidden cursor-default ${hoveredLayer === layer.id ? 'border-[#7896f5] translate-x-2' : theme.borderBright + ' opacity-60 hover:opacity-100'}`}
              style={{ borderLeft: `5px solid ${layer.color}` }}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-mono text-[11px] font-bold uppercase tracking-wider ${hoveredLayer === layer.id ? (isDarkMode ? 'text-white' : 'text-[#1e293b]') : theme.muted}`}>{layer.title}</span>
                </div>
                <p className={`text-[12px] leading-relaxed transition-colors ${hoveredLayer === layer.id ? (isDarkMode ? 'text-white' : 'text-[#334155]') : theme.muted}`}>{layer.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
