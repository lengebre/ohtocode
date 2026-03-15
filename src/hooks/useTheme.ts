import { useMemo } from 'react';
import type { ThemeConfig } from '../types';

export function useTheme(isDarkMode: boolean): ThemeConfig {
  return useMemo(() => ({
    bg: isDarkMode ? 'bg-[#0d0f14]' : 'bg-[#f8fafc]',
    text: isDarkMode ? 'text-[#dde2f0]' : 'text-[#1e293b]',
    muted: isDarkMode ? 'text-[#7a8499]' : 'text-[#64748b]',
    surface: isDarkMode ? 'bg-[#131620]' : 'bg-[#ffffff]',
    surface2: isDarkMode ? 'bg-[#191d2a]' : 'bg-[#f1f5f9]',
    border: isDarkMode ? 'border-[#242938]' : 'border-black/5',
    borderBright: isDarkMode ? 'border-[#2e3448]' : 'border-black/10',
    panel: isDarkMode ? 'bg-[#0a0c10]' : 'bg-[#f1f3f6]',
    accent: '#7896f5',
    ring: isDarkMode ? 'border-white/10' : 'border-black/5'
  }), [isDarkMode]);
}
