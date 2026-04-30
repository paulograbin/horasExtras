import type { Config, CalculationResult } from '../types';

export function calculateAllBands(salary: number, config: Config): CalculationResult[] {
  const valorHoraBase = salary / config.horasMensais;

  return config.bands.map((band) => ({
    band,
    valorHoraBase,
    valorHora: valorHoraBase * band.multiplier,
  }));
}

const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatBRL(value: number): string {
  return brlFormatter.format(value);
}
