import { render, screen } from '@testing-library/react';
import { BandCard } from './BandCard';
import type { CalculationResult } from '../types';

const mockResult: CalculationResult = {
  band: { id: 'extra50', name: 'Extra 50%', multiplier: 1.5, category: 'overtime' },
  valorHoraBase: 20,
  valorHora: 30,
};

describe('BandCard', () => {
  it('renders band name', () => {
    render(<BandCard result={mockResult} onDelete={() => {}} />);
    expect(screen.getByText('Extra 50%')).toBeDefined();
  });

  it('renders formatted hourly value', () => {
    render(<BandCard result={mockResult} onDelete={() => {}} />);
    expect(screen.getByText(/R\$\s*30,00/)).toBeDefined();
  });

  it('renders multiplier', () => {
    render(<BandCard result={mockResult} onDelete={() => {}} />);
    expect(screen.getByText(/base × 1\.5/)).toBeDefined();
  });

  it('applies overtime category border color', () => {
    const { container } = render(<BandCard result={mockResult} onDelete={() => {}} />);
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain('border-blue-300');
  });
});
