import type { Config } from './types';

/**
 * ★ CONFIGURAÇÃO CENTRAL ★
 *
 * Para alterar as horas mensais: mude o valor de `horasMensais`
 * Para adicionar uma faixa: adicione um objeto ao array `bands`
 * Para remover uma faixa: delete o objeto do array `bands`
 */
export const CONFIG: Config = {
  // Divisor padrão CLT: 44h/semana × 5 semanas = 220h/mês
  // Use 200 para jornada de 40h/semana, ou 180 para escala 12×36
  horasMensais: 200,

  bands: [
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
      multiplier: 2.6568, // 1.5 × 1.2
      category: 'night',
    },
    {
      id: 'sobreaviso',
      name: 'Sobreaviso',
      multiplier: 1 / 3,
      category: 'special',
    }
  ],
};
