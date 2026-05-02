import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { DEFAULT_BANDS } from './config';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the header', () => {
    render(<App />);
    expect(screen.getByText('Calculadora de Horas Extras')).toBeDefined();
  });

  it('renders the salary input', () => {
    render(<App />);
    expect(screen.getByLabelText('Salário Mensal Bruto')).toBeDefined();
  });

  it('renders the hours calculator section', () => {
    render(<App />);
    expect(screen.getByText('Calculadora de Horas')).toBeDefined();
  });

  it('initializes salary from localStorage', () => {
    localStorage.setItem('salary', '5000');
    render(<App />);
    expect(screen.getByDisplayValue('5.000,00')).toBeDefined();
  });

  it('initializes with default bands when localStorage is empty', () => {
    render(<App />);
    expect(screen.getAllByText(DEFAULT_BANDS[0].name).length).toBeGreaterThan(0);
  });

  it('initializes bands from localStorage', () => {
    const customBands = [
      { id: 'custom', name: 'Minha Faixa', multiplier: 2.0, category: 'overtime' },
    ];
    localStorage.setItem('bands', JSON.stringify(customBands));
    render(<App />);
    expect(screen.getAllByText('Minha Faixa').length).toBeGreaterThan(0);
  });

  it('recalculates results when salary changes', () => {
    render(<App />);
    const input = screen.getByLabelText('Salário Mensal Bruto');

    // Type salary of R$ 4000,00 → raw digits "400000"
    fireEvent.change(input, { target: { value: '400000' } });

    // Base hourly = 4000 / 200 = R$ 20,00
    expect(screen.getAllByText(/R\$\s*20,00/).length).toBeGreaterThan(0);
  });

  it('opens band editor when gear button is clicked', () => {
    render(<App />);
    const gearBtn = screen.getByLabelText('Configurar faixas');
    fireEvent.click(gearBtn);
    expect(screen.getByText('Configurar Faixas')).toBeDefined();
  });
});
