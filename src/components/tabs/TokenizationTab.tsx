import { useMemo, useState } from 'react';
import { Type, Hash, BarChart3, Binary, DollarSign, Activity } from 'lucide-react';
import { TOKEN_PRESETS } from '../../constants';
import { processTokens } from '../../utils/tokenizer';
import type { ThemeConfig } from '../../types';

const DECODER_LEGEND = [
  { lbl: 'word / stem', color: 'bg-blue-500', desc: 'Common root words or whole words.' },
  { lbl: 'subword piece', color: 'bg-purple-500', desc: 'Fragments (suffixes/prefixes) of longer words.' },
  { lbl: 'punctuation', color: 'bg-teal-500', desc: 'Dots, commas, and formatting marks.' },
  { lbl: 'space + word', color: 'bg-amber-500', desc: 'Most tokenizers attach spaces to the following word.' },
  { lbl: 'numbers', color: 'bg-rose-500', desc: 'Digits are often tokenized individually or in small clusters.' }
];

const STATS = [
  { lbl: 'Tokens', key: 'tokens' as const },
  { lbl: 'Characters', key: 'chars' as const },
  { lbl: 'Char / Tok', key: 'ratio' as const },
  { lbl: 'Est. Cost*', key: 'cost' as const }
];

interface TokenizationTabProps {
  theme: ThemeConfig;
  isDarkMode: boolean;
}

export function TokenizationTab({ theme, isDarkMode }: TokenizationTabProps) {
  const [tokenInput, setTokenInput] = useState(TOKEN_PRESETS.english);
  const processedTokens = useMemo(() => processTokens(tokenInput), [tokenInput]);

  const tokenCount = processedTokens.length;
  const charCount = tokenInput.length;
  const ratio = (charCount / (tokenCount || 1)).toFixed(1);
  const cost = `$${((tokenCount / 1_000_000) * 3).toFixed(5)}`;

  const statValues = { tokens: tokenCount, chars: charCount, ratio, cost };
  const statIcons = [<Type key="t" size={12} />, <Binary key="b" size={12} />, <BarChart3 key="r" size={12} />, <DollarSign key="d" size={12} />];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className={`p-8 ${theme.panel} border ${theme.borderBright} rounded-[2rem] shadow-inner`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Type className="text-[#7896f5]" size={20} />
                <h2 className="font-mono text-xs font-black uppercase tracking-widest text-[#7896f5]">Text Segmentation Engine</h2>
              </div>
            </div>
            <div className="mb-6">
              <label className={`block font-mono text-[10px] uppercase ${theme.muted} mb-2 tracking-[0.1em]`}>Live Input Stream</label>
              <textarea
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className={`w-full p-5 rounded-2xl font-sans text-sm border-2 ${theme.borderBright} ${isDarkMode ? 'bg-[#0d0f14] text-[#dde2f0]' : 'bg-white text-[#1e293b]'} focus:border-[#7896f5] outline-none transition-all resize-none h-28 shadow-sm`}
                placeholder="Type or paste any text here..."
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.keys(TOKEN_PRESETS).map((key) => (
                <button
                  key={key}
                  onClick={() => setTokenInput(TOKEN_PRESETS[key])}
                  className={`px-3 py-1.5 rounded-full border ${theme.borderBright} font-mono text-[10px] uppercase hover:border-[#7896f5] hover:text-[#7896f5] transition-all`}
                >
                  {key}
                </button>
              ))}
            </div>
            <div className={`min-h-[120px] p-6 ${theme.surface2} rounded-2xl border ${theme.borderBright} flex flex-wrap gap-2 items-center content-start`}>
              {processedTokens.length > 0 ? (
                processedTokens.map((tok, i) => (
                  <div key={i} className="flex flex-col items-center group cursor-default token-pop" style={{ animationDelay: `${Math.min(i * 15, 400)}ms` }}>
                    <div className={`px-2.5 py-1 rounded-lg border-2 font-mono text-xs transition-all ${tok.style.bg} ${tok.style.border} ${tok.style.text} group-hover:scale-105`}>
                      {tok.lead ? '·' : ''}{tok.text}
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 opacity-40 font-mono text-[8px]">
                      <Hash size={8} />{tok.id}
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex flex-col items-center justify-center opacity-30 py-8">
                  <Activity className="mb-2 animate-pulse" />
                  <p className="text-xs uppercase font-mono tracking-widest">Waiting for character buffer...</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {STATS.map((s, i) => (
                <div key={i} className={`p-4 ${theme.surface2} rounded-xl border ${theme.borderBright} text-center`}>
                  <div className="flex items-center justify-center gap-2 mb-1 opacity-50">
                    {statIcons[i]}
                    <span className="font-mono text-[9px] uppercase font-bold">{s.lbl}</span>
                  </div>
                  <div className="text-xl font-black tracking-tighter">{statValues[s.key]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-4">
          <div className={`${theme.surface2} p-6 border ${theme.border} rounded-2xl shadow-lg`}>
            <div className="font-mono text-[10px] text-[#7896f5] uppercase mb-6 tracking-widest border-b border-bright pb-2">Decoder Legend</div>
            <div className="space-y-4">
              {DECODER_LEGEND.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`w-3 h-3 rounded-sm mt-0.5 shrink-0 ${item.color}`} />
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase">{item.lbl}</div>
                    <p className="text-[10px] opacity-60 leading-tight">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
