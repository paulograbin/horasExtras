import type { Config, CalculationResult } from '../types';

export function calculateAllBands(salary: number, config: Config): CalculationResult[] {
  const valorHoraBase = salary / config.horasMensais;

  return config.bands.map((band) => ({
    band,
    valorHoraBase,
    valorHora: valorHoraBase * band.multiplier,
  }));
}

/**
 * DSR — Descanso Semanal Remunerado (Súmula 172 TST).
 *
 * Aplica o ratio sobre o total de horas extras do mês. O ratio exato é
 * `dias de DSR / dias úteis`; usamos a estimativa média (~22%) por padrão.
 */
export function calculateDSR(totalHE: number, rate: number): number {
  if (totalHE <= 0 || rate <= 0) return 0;
  return totalHE * rate;
}

const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatBRL(value: number): string {
  return brlFormatter.format(value);
}
