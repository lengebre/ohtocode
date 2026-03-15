import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

const theme = {
  bg: 'bg-[#0d0f14]',
  text: 'text-[#dde2f0]',
  muted: 'text-[#7a8499]',
  surface: 'bg-[#131620]',
  surface2: 'bg-[#191d2a]',
  border: 'border-[#242938]',
  borderBright: 'border-[#2e3448]',
  panel: 'bg-[#0a0c10]',
  accent: '#7896f5',
  ring: 'border-white/10',
};

describe('Header', () => {
  it('renders title and subtitle', () => {
    render(<Header isDarkMode={true} onToggleDarkMode={() => {}} theme={theme} />);
    expect(screen.getByText(/Neural Reference Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/AIF-C01/i)).toBeInTheDocument();
    expect(screen.getByText(/Notes/i)).toBeInTheDocument();
  });

  it('shows Light Mode when dark mode is on', () => {
    render(<Header isDarkMode={true} onToggleDarkMode={() => {}} theme={theme} />);
    expect(screen.getByText(/Light/)).toBeInTheDocument();
  });

  it('shows Dark Mode when dark mode is off', () => {
    render(<Header isDarkMode={false} onToggleDarkMode={() => {}} theme={theme} />);
    expect(screen.getByText(/Dark/)).toBeInTheDocument();
  });

  it('calls onToggleDarkMode when the theme button is clicked', () => {
    const onToggle = vi.fn();
    render(<Header isDarkMode={true} onToggleDarkMode={onToggle} theme={theme} />);
    const button = screen.getByRole('button', { name: /light/i });
    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
