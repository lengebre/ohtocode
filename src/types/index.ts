import type { ReactNode } from 'react';

export interface HierarchyLayer {
  id: string;
  title: string;
  color: string;
  desc: string;
}

export interface StepItem {
  id: number;
  title: string;
  icon: ReactNode;
}

export interface FoundationalStage {
  id: number;
  title: string;
  desc: string;
  color: string;
  icon: ReactNode;
}

export interface DataModalityType {
  name: string;
  detail: string;
  icon: ReactNode;
}

export interface DataModality {
  id: string;
  title: string;
  icon: ReactNode;
  desc: string;
  types: DataModalityType[];
}

export interface TokenStyle {
  bg: string;
  border: string;
  text: string;
  label?: string;
}

export interface ProcessedToken {
  id: number;
  text: string;
  type: number;
  lead: boolean;
  style: TokenStyle;
}

export interface ThemeConfig {
  bg: string;
  text: string;
  muted: string;
  surface: string;
  surface2: string;
  border: string;
  borderBright: string;
  panel: string;
  accent: string;
  ring: string;
}

export type TabId = 'comparison' | 'data' | 'classic' | 'tokens' | 'foundational';
