import type { Band } from './types';

export const HORAS_MENSAIS = 200;

/**
 * DSR — Descanso Semanal Remunerado (Súmula 172 TST).
 *
 * Fórmula exata: DSR = Total de HE no mês × (dias de DSR / dias úteis do mês),
 * onde dias de DSR = domingos + feriados e dias úteis = dias do mês − dias de DSR.
 * O ratio varia mês a mês (mais domingos/feriados = ratio maior); a média fica
 * em torno de 22% do total de HE, valor usado aqui como estimativa.
 */
export const DSR_RATE = 0.22;

export const DEFAULT_BANDS: Band[] = [
  {
    id: 'base',
    name: 'Valor Hora Normal',
    multiplier: 1.0,
    category: 'base',
  },
  {
    id: 'extra50',
    name: '2 primeiras horas extra',
    multiplier: 1.5,
    category: 'overtime',
  },
  {
    id: 'extra75',
    name: 'A partir da 3a Hora Extra',
    multiplier: 1.75,
    category: 'overtime',
  },
  {
    id: 'extra100',
    name: 'HE com Adicional Noturno na Semana e Sábado (22h até 5h)',
    multiplier: 2.225,
    category: 'overtime',
  },
  {
    id: 'sabado75',
    name: 'Horas Extras aos Sábados',
    multiplier: 1.75,
    category: 'overtime',
  },
  {
    id: 'domingo',
    name: 'Horas Extras aos Domingos e Feriados',
    multiplier: 2,
    category: 'night',
  },
  {
    id: 'extraNoturna50',
    name: 'HE com Adicional Noturno aos Domingos e Feriados (22:00hs - 5:00hs)',
    multiplier: 2.6568,
    category: 'night',
  },
  {
    id: 'sobreaviso',
    name: 'Sobreaviso',
    multiplier: 1 / 3,
    category: 'special',
  }
];
