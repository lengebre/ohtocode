import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /AIF-C01/i })).toBeInTheDocument();
  });

  it('renders tab navigation', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /hierarchy/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /data types/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tokenization/i })).toBeInTheDocument();
  });

  it('renders structural classification when Hierarchy tab is active', () => {
    render(<App />);
    expect(screen.getByText(/Structural Classification/i)).toBeInTheDocument();
  });
});
