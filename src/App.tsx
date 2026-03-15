import { useState } from 'react';
import { useTheme } from './hooks';
import type { TabId } from './types';
import { Header } from './components/Header';
import { TabNav } from './components/TabNav';
import { Footer } from './components/Footer';
import { GlobalStyles } from './components/GlobalStyles';
import {
  HierarchyTab,
  DataTypesTab,
  ClassicFlowTab,
  TokenizationTab,
  FoundationalTab
} from './components/tabs';

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>('comparison');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = useTheme(isDarkMode);

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} p-4 md:p-12 font-['DM_Sans',sans-serif] transition-colors duration-500`}>
      <GlobalStyles />
      <div className="max-w-5xl mx-auto">
        <Header isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} theme={theme} />
        <div className={`${theme.surface} border ${theme.border} rounded-3xl overflow-hidden shadow-2xl transition-colors duration-500`}>
          <TabNav activeTab={activeTab} onTabChange={setActiveTab} theme={theme} />
          <div className="p-6 md:p-10">
            {activeTab === 'comparison' && <HierarchyTab theme={theme} isDarkMode={isDarkMode} />}
            {activeTab === 'data' && <DataTypesTab theme={theme} />}
            {activeTab === 'classic' && <ClassicFlowTab theme={theme} isDarkMode={isDarkMode} />}
            {activeTab === 'tokens' && <TokenizationTab theme={theme} isDarkMode={isDarkMode} />}
            {activeTab === 'foundational' && <FoundationalTab theme={theme} isDarkMode={isDarkMode} />}
          </div>
        </div>
        <Footer theme={theme} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;
