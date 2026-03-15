import type { TabId, ThemeConfig } from '../types';

const TABS: { id: TabId; label: string }[] = [
  { id: 'comparison', label: 'Hierarchy' },
  { id: 'data', label: 'Data Types' },
  { id: 'classic', label: 'Neural Flow' },
  { id: 'tokens', label: 'Tokenization' },
  { id: 'foundational', label: 'Scaling' }
];

interface TabNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  theme: ThemeConfig;
}

export function TabNav({ activeTab, onTabChange, theme }: TabNavProps) {
  return (
    <div className={`${theme.surface2} border-b ${theme.border} px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4`}>
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className={`font-mono text-[10px] ${theme.muted} ml-3 hidden sm:inline`}>mo@aif-c01-visualizer</span>
      </div>
      <div className="flex gap-2 font-mono hide-scroll overflow-x-auto max-w-full sm:max-w-none">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-1.5 rounded-xl text-[10px] uppercase font-bold transition-all border whitespace-nowrap ${activeTab === tab.id
                ? 'bg-[#7896f526] border-[#7896f5] text-[#7896f5]'
                : `border-transparent ${theme.muted} hover:text-current`
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
