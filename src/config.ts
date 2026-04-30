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


  // 2 Primeiras Horas Extras 50%	
  // "A partir da 3a Hora Extra   // 75%"
  // 	"HE com Adicional Noturno na Semana e Sábado (22:00hs - 5:00hs)
  // 220,25%"	"Horas Extras
  // aos Sábados
  // 75%"	"Horas Extras aos Domingos e Feriados
  // 100%"	"HE com Adicional Noturno aos Domingos e Feriados (22:00hs - 5:00hs)
  // 265,68%"	"Sobreaviso
  // 33%"


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
      name: 'Hora Extra 50%',
      description: 'Duas primeiras horas extras',
      multiplier: 1.5,
      legalBasis: '',
      category: 'overtime',
    },
    {
      id: 'extra75',
      name: 'Hora Extra 75%',
      description: 'A partir da 3 hora extra',
      multiplier: 1.75,
      legalBasis: '',
      category: 'overtime',
    },
    {
      id: 'extra100',
      name: 'Hora extra com adicional noturno e sábado',
      description: 'Adicional noturno na semana e sabado (22h até 5h)',
      multiplier: 2.225,
      legalBasis: '',
      category: 'overtime',
    },
    {
      id: 'domingo',
      name: 'Domingos e feriados',
      description: '',
      multiplier: 2,
      legalBasis: '',
      category: 'night',
    },
    {
      id: 'extraNoturna50',
      name: 'Hora Extra com adicional noturno aos domingos e feriados',
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
