export type BandCategory = 'base' | 'overtime' | 'night' | 'special';

export interface Band {
  id: string;
  name: string;
  multiplier: number;
  category: BandCategory;
}

export interface CalculationResult {
  band: Band;
  valorHora: number;
  valorHoraBase: number;
}

export interface Config {
  horasMensais: number;
  bands: Band[];
}
