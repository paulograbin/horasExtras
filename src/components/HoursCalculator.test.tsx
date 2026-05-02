import { render, screen, fireEvent } from '@testing-library/react';
import { HoursCalculator } from './HoursCalculator';
import type { CalculationResult } from '../types';

const mockResults: CalculationResult[] = [
  {
    band: { id: 'base', name: 'Base', multiplier: 1.0, category: 'base' },
    valorHoraBase: 20,
    valorHora: 20,
  },
  {
    band: { id: 'extra50', name: 'Extra 50%', multiplier: 1.5, category: 'overtime' },
    valorHoraBase: 20,
    valorHora: 30,
  },
];

describe('HoursCalculator', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders a row for each band', () => {
    render(<HoursCalculator results={mockResults} />);
    expect(screen.getAllByText('Base').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Extra 50%').length).toBeGreaterThan(0);
  });

  it('shows total as R$ 0,00 initially', () => {
    render(<HoursCalculator results={mockResults} />);
    const totals = screen.getAllByText(/R\$\s*0,00/);
    expect(totals.length).toBeGreaterThan(0);
  });

  it('updates subtotal when hours are entered', () => {
    render(<HoursCalculator results={mockResults} />);
    const inputs = screen.getAllByPlaceholderText('0');
    fireEvent.change(inputs[0], { target: { value: '5' } });

    // Base: 20 * 5 = R$ 100,00
    expect(screen.getAllByText(/R\$\s*100,00/).length).toBeGreaterThan(0);
  });

  it('calculates grand total across all bands', () => {
    render(<HoursCalculator results={mockResults} />);
    const inputs = screen.getAllByPlaceholderText('0');
    fireEvent.change(inputs[0], { target: { value: '5' } });  // 20 * 5 = 100
    fireEvent.change(inputs[2], { target: { value: '2' } });  // 30 * 2 = 60

    // Total: 160
    expect(screen.getAllByText(/R\$\s*160,00/).length).toBeGreaterThan(0);
  });

  it('only accepts integer values', () => {
    render(<HoursCalculator results={mockResults} />);
    const inputs = screen.getAllByPlaceholderText('0');
    fireEvent.change(inputs[0], { target: { value: '3.7' } });

    // parseInt('3.7') = 3, so subtotal = 20 * 3 = 60
    expect(screen.getAllByText(/R\$\s*60,00/).length).toBeGreaterThan(0);
  });

  it('persists hours to localStorage', () => {
    render(<HoursCalculator results={mockResults} />);
    const inputs = screen.getAllByPlaceholderText('0');
    fireEvent.change(inputs[0], { target: { value: '4' } });

    const stored = JSON.parse(localStorage.getItem('hours')!);
    expect(stored.base).toBe(4);
  });

  it('loads hours from localStorage on mount', () => {
    localStorage.setItem('hours', JSON.stringify({ base: 7 }));
    render(<HoursCalculator results={mockResults} />);

    // Base: 20 * 7 = 140
    expect(screen.getAllByText(/R\$\s*140,00/).length).toBeGreaterThan(0);
  });
});
