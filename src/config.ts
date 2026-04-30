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
  horasMensais: 220,

  bands: [
    {
      id: 'base',
      name: 'Valor Hora Normal',
      description: 'Valor base da hora de trabalho',
      multiplier: 1.0,
      legalBasis: 'CLT Art. 64',
      category: 'base',
    },
    {
      id: 'extra50',
      name: 'Hora Extra 50%',
      description: 'Hora extra em dias úteis',
      multiplier: 1.5,
      legalBasis: 'CLT Art. 59',
      category: 'overtime',
    },
    {
      id: 'extra75',
      name: 'Hora Extra 75%',
      description: 'Hora extra conforme convenção coletiva',
      multiplier: 1.75,
      legalBasis: 'Convenção Coletiva',
      category: 'overtime',
    },
    {
      id: 'extra100',
      name: 'Hora Extra 100%',
      description: 'Hora extra em domingos e feriados',
      multiplier: 2.0,
      legalBasis: 'CLT Art. 70 / Súmula TST 146',
      category: 'overtime',
    },
    {
      id: 'noturno',
      name: 'Adicional Noturno 20%',
      description: 'Trabalho entre 22h e 5h',
      multiplier: 1.2,
      legalBasis: 'CLT Art. 73',
      category: 'night',
    },
    {
      id: 'extraNoturna50',
      name: 'Hora Extra Noturna 50%+20%',
      description: 'Hora extra em dia útil no período noturno',
      multiplier: 1.8, // 1.5 × 1.2
      legalBasis: 'CLT Art. 59 + Art. 73',
      category: 'night',
    },
    {
      id: 'extraNoturna100',
      name: 'Hora Extra Noturna 100%+20%',
      description: 'Hora extra em domingo/feriado no período noturno',
      multiplier: 2.4, // 2.0 × 1.2
      legalBasis: 'CLT Art. 70 + Art. 73',
      category: 'night',
    },
    {
      id: 'sobreaviso',
      name: 'Sobreaviso (1/3)',
      description: 'Período em que o empregado aguarda chamado',
      multiplier: 1 / 3,
      legalBasis: 'CLT Art. 244 §2',
      category: 'special',
    },
    {
      id: 'intrajornada',
      name: 'Intrajornada Suprimida',
      description: 'Intervalo de descanso não concedido (natureza indenizatória)',
      multiplier: 1.5,
      legalBasis: 'CLT Art. 71 §4',
      category: 'special',
    },
  ],
};
