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
      description: 'Valor base da hora de trabalho',
      multiplier: 1.0,
      legalBasis: '',
      category: 'base',
    },
    {
      id: 'extra50',
      name: '2 primemiras horas extra',
      description: 'Duas primeiras horas extras',
      multiplier: 1.5,
      legalBasis: '',
      category: 'overtime',
    },
    {
      id: 'extra75',
      name: 'A partir da 3a Hora Extra',
      description: 'A partir da 3 hora extra',
      multiplier: 1.75,
      legalBasis: '',
      category: 'overtime',
    },
    {
      id: 'extra100',
      name: 'HE com Adicional Noturno na Semana e Sábado (22:00hs - 5:00hs)',
      description: 'Adicional noturno na semana e sabado (22h até 5h)',
      multiplier: 2.225,
      legalBasis: '',
      category: 'overtime',
    },

    {
      id: 'sabado75',
      name: 'Horas Extras aos Sábados',
      description: 'Adicional noturno na semana e sabado (22h até 5h)',
      multiplier: 1.75,
      legalBasis: '',
      category: 'overtime',
    },

    {
      id: 'domingo',
      name: 'Horas Extras aos Domingos e Feriados',
      description: '',
      multiplier: 2,
      legalBasis: '',
      category: 'night',
    },
    {
      id: 'extraNoturna50',
      name: 'HE com Adicional Noturno aos Domingos e Feriados (22:00hs - 5:00hs)',
      description: 'Hora extra em dia útil no período noturno',
      multiplier: 2.6568, // 1.5 × 1.2
      legalBasis: '',
      category: 'night',
    },
    {
      id: 'sobreaviso',
      name: 'Sobreaviso (1/3)',
      description: 'Período em que o empregado aguarda chamado',
      multiplier: 1 / 3,
      legalBasis: '',
      category: 'special',
    }
  ],
};
