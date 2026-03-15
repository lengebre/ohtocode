import { describe, it, expect } from 'vitest';
import { processTokens } from './tokenizer';

describe('processTokens', () => {
  it('returns empty array for empty or whitespace-only input', () => {
    expect(processTokens('')).toEqual([]);
    expect(processTokens('   ')).toEqual([]);
    expect(processTokens('\n\t')).toEqual([]);
  });

  it('tokenizes simple words', () => {
    const tokens = processTokens('hello');
    expect(tokens.length).toBe(1);
    expect(tokens[0].text).toBe('hello');
    expect(tokens[0].id).toBeGreaterThanOrEqual(0);
    expect(tokens[0].style).toBeDefined();
  });

  it('tokenizes words with spaces', () => {
    const tokens = processTokens('hello world');
    expect(tokens.length).toBeGreaterThanOrEqual(2);
    const texts = tokens.map((t) => t.text);
    expect(texts).toContain('hello');
    expect(texts).toContain('world');
  });

  it('splits long words (>= 8 chars) into stem + subword', () => {
    const tokens = processTokens('tokenization');
    expect(tokens.length).toBe(2);
    expect(tokens[0].text.length + tokens[1].text.length).toBe('tokenization'.length);
  });

  it('tokenizes numbers', () => {
    const tokens = processTokens('42');
    expect(tokens.length).toBe(1);
    expect(tokens[0].text).toBe('42');
  });

  it('tokenizes punctuation as separate tokens', () => {
    const tokens = processTokens('Hi!');
    expect(tokens.length).toBeGreaterThanOrEqual(2);
    const punct = tokens.find((t) => t.text === '!');
    expect(punct).toBeDefined();
  });

  it('assigns deterministic id and style to each token', () => {
    const a = processTokens('test');
    const b = processTokens('test');
    expect(a[0].id).toBe(b[0].id);
    expect(a[0].style).toEqual(b[0].style);
  });

  it('handles XSS-like input as safe text (no injection)', () => {
    const input = '<script>alert(1)</script>';
    const tokens = processTokens(input);
    expect(tokens.length).toBeGreaterThan(0);
    tokens.forEach((t) => {
      expect(typeof t.text).toBe('string');
      expect(t.id).toBeLessThan(50000);
      expect(t.id).toBeGreaterThanOrEqual(0);
    });
  });
});
