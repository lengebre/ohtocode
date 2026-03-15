import type { HierarchyLayer } from '../types';

export const HIERARCHY_LAYERS: HierarchyLayer[] = [
  { id: 'ai', title: 'Artificial Intelligence', color: '#404859', desc: 'The superset. Creating systems that simulate human intelligence through logic, rules, or patterns.' },
  { id: 'ml', title: 'Machine Learning', color: '#7896f5', desc: 'The engine. Algorithms that ingest data and autonomously improve without explicit programming.' },
  { id: 'dl', title: 'Deep Learning', color: '#c792ea', desc: 'The architecture. Multi-layered neural networks inspired by the human brain.' },
  { id: 'genai', title: 'Generative AI', color: '#ffffff', desc: 'The centerpiece. Specialized models designed to generate new content by predicting sequences.' },
];
