import type { ProcessedToken, TokenStyle } from '../types';

const PALETTE: TokenStyle[] = [
  { bg: "bg-blue-500/20", border: "border-blue-500/40", text: "text-blue-400", label: "word/stem" },
  { bg: "bg-purple-500/20", border: "border-purple-500/40", text: "text-purple-400", label: "subword" },
  { bg: "bg-teal-500/20", border: "border-teal-500/40", text: "text-teal-400", label: "punct" },
  { bg: "bg-amber-500/20", border: "border-amber-500/40", text: "text-amber-400", label: "space+word" },
  { bg: "bg-rose-500/20", border: "border-rose-500/40", text: "text-rose-400", label: "number" },
  { bg: "bg-emerald-500/20", border: "border-emerald-500/40", text: "text-emerald-400", label: "other" }
];

function hashId(text: string): number {
  let hash = 0;
  for (let j = 0; j < text.length; j++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(j);
    hash |= 0;
  }
  return Math.abs(hash % 50000);
}

interface RawToken {
  text: string;
  type: number;
  lead: boolean;
}

export function processTokens(text: string): ProcessedToken[] {
  const input = text.trim();
  if (!input) return [];

  const result: RawToken[] = [];
  let i = 0;

  while (i < input.length) {
    const ch = input[i];
    if (ch === ' ' || ch === '\n' || ch === '\t') { i++; continue; }
    const hasSpace = i > 0 && (input[i - 1] === ' ' || input[i - 1] === '\n' || input[i - 1] === '\t');

    if (/[A-Za-z]/.test(ch)) {
      let word = '';
      while (i < input.length && /[A-Za-z']/.test(input[i])) { word += input[i]; i++; }

      if (word.length >= 8) {
        const split = Math.floor(word.length * 0.6);
        result.push({ text: word.slice(0, split), type: hasSpace ? 3 : 0, lead: hasSpace });
        result.push({ text: word.slice(split), type: 1, lead: false });
      } else {
        result.push({ text: word, type: hasSpace ? 3 : 0, lead: hasSpace });
      }
    } else if (/\d/.test(ch)) {
      let num = '';
      while (i < input.length && /[\d.,:]/.test(input[i])) { num += input[i]; i++; }
      result.push({ text: num, type: 4, lead: hasSpace });
    } else if (/[\u4E00-\u9FFF\u0600-\u06FF]/.test(ch)) {
      result.push({ text: ch, type: 5, lead: hasSpace });
      i++;
    } else {
      result.push({ text: ch, type: 2, lead: hasSpace });
      i++;
    }
  }

  return result.map((t) => ({
    ...t,
    id: hashId(t.text),
    style: PALETTE[t.type]
  }));
}
