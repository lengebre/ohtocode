import { Database, Brain, Target, Globe, UserCheck, ThumbsUp } from 'lucide-react';
import type { StepItem, FoundationalStage } from '../types';

export const CLASSIC_STEPS: StepItem[] = [
  { id: 0, title: "Data Prep", icon: <Database size={14} /> },
  { id: 1, title: "Neural Flow", icon: <Brain size={14} /> },
  { id: 2, title: "Inference", icon: <Target size={14} /> },
];

export const FOUNDATIONAL_STAGES: FoundationalStage[] = [
  { id: 0, title: "Pre-training", desc: "Predicting the next token across trillions of web documents.", color: "#7896f5", icon: <Globe size={14} /> },
  { id: 1, title: "SFT", desc: "Instruction-tuning on human-written expert demonstrations.", color: "#c792ea", icon: <UserCheck size={14} /> },
  { id: 2, title: "RLHF", desc: "Refining alignment based on human preference scoring.", color: "#3ecb8a", icon: <ThumbsUp size={14} /> },
];
