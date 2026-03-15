import { Table, FileText, Image as ImageIcon, Music, Activity, Hash } from 'lucide-react';
import type { DataModality } from '../types';

export const DATA_MODALITIES: DataModality[] = [
  {
    id: 'unstructured',
    title: 'Unstructured',
    icon: <ImageIcon size={18} />,
    desc: 'Data with no predefined schema. The primary fuel for Large Language Models (LLMs) and computer vision.',
    types: [
      { name: 'Text', detail: 'Natural language, code, logs', icon: <FileText size={12} /> },
      { name: 'Images', detail: 'Pixels, depth maps, medical scans', icon: <ImageIcon size={12} /> },
      { name: 'Audio', detail: 'Waveforms, spectrograms', icon: <Music size={12} /> }
    ]
  },
  {
    id: 'structured',
    title: 'Structured',
    icon: <Table size={18} />,
    desc: 'Highly organized data residing in fixed fields. Essential for classic regression and prediction models.',
    types: [
      { name: 'Tabular', detail: 'Excel, SQL databases, CSVs', icon: <Table size={12} /> },
      { name: 'Time-Series', detail: 'Stock prices, sensor telemetry', icon: <Activity size={12} /> },
      { name: 'Metadata', detail: 'Labels, timestamps, geo-tags', icon: <Hash size={12} /> }
    ]
  }
];
