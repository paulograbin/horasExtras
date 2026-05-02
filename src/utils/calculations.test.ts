import { calculateAllBands, formatBRL } from './calculations';
import type { Config } from '../types';

const testConfig: Config = {
  horasMensais: 200,
  bands: [
    { id: 'base', name: 'Base', multiplier: 1.0, category: 'base' },
    { id: 'extra50', name: 'Extra 50%', multiplier: 1.5, category: 'overtime' },
    { id: 'double', name: 'Double', multiplier: 2.0, category: 'night' },
    { id: 'sobreaviso', name: 'Sobreaviso', multiplier: 1 / 3, category: 'special' },
  ],
};

describe('calculateAllBands', () => {
  it('returns one result per band', () => {
    const results = calculateAllBands(4000, testConfig);
    expect(results).toHaveLength(4);
  });

  it('calculates base hourly rate as salary / horasMensais', () => {
    const results = calculateAllBands(4000, testConfig);
    expect(results[0].valorHoraBase).toBe(20); // 4000 / 200
  });

  it('applies multiplier correctly', () => {
    const results = calculateAllBands(4000, testConfig);
    expect(results[0].valorHora).toBe(20);  // 1.0x
    expect(results[1].valorHora).toBe(30);  // 1.5x
    expect(results[2].valorHora).toBe(40);  // 2.0x
  });

  it('handles fractional multiplier (1/3)', () => {
    const results = calculateAllBands(6000, testConfig);
    // 6000 / 200 = 30, 30 * (1/3) = 10
    expect(results[3].valorHora).toBeCloseTo(10);
  });

  it('returns zero values for zero salary', () => {
    const results = calculateAllBands(0, testConfig);
    results.forEach((r) => {
      expect(r.valorHoraBase).toBe(0);
      expect(r.valorHora).toBe(0);
    });
  });

  it('returns empty array for empty bands', () => {
    const results = calculateAllBands(4000, { horasMensais: 200, bands: [] });
    expect(results).toEqual([]);
  });

  it('preserves band reference in result', () => {
    const results = calculateAllBands(4000, testConfig);
    expect(results[0].band).toBe(testConfig.bands[0]);
    expect(results[1].band.id).toBe('extra50');
  });
});

describe('formatBRL', () => {
  it('formats a value as Brazilian Real currency', () => {
    const formatted = formatBRL(1234.56);
    expect(formatted).toContain('1.234,56');
    expect(formatted).toContain('R$');
  });

  it('formats zero', () => {
    const formatted = formatBRL(0);
    expect(formatted).toContain('0,00');
  });
});
