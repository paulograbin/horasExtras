import type { CalculationResult, BandCategory } from '../types';
import { formatBRL } from '../utils/calculations';

interface BandCardProps {
  result: CalculationResult;
  onDelete: () => void;
}

function formatMultiplier(m: number): string {
  if (Math.abs(m - 1 / 3) < 0.001) return '1/3';
  if (m % 1 === 0) return m.toFixed(1);
  return m.toFixed(4).replace(/0+$/, '');
}

const categoryStyles: Record<BandCategory, { border: string; bg: string; badge: string }> = {
  base: {
    border: 'border-gray-300',
    bg: 'bg-gray-50',
    badge: 'bg-gray-200 text-gray-700',
  },
  overtime: {
    border: 'border-blue-300',
    bg: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
  },
  night: {
    border: 'border-purple-300',
    bg: 'bg-purple-50',
    badge: 'bg-purple-100 text-purple-700',
  },
  special: {
    border: 'border-amber-300',
    bg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
  },
};

export function BandCard({ result, onDelete }: BandCardProps) {
  const { band, valorHora } = result;
  const styles = categoryStyles[band.category];

  return (
    <div
      className={`rounded-xl border-2 ${styles.border} ${styles.bg} p-4 sm:p-5 transition-all hover:shadow-lg hover:-translate-y-0.5`}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <h3 className="font-bold text-gray-900 text-sm leading-tight">
          {band.name}
        </h3>
        <button
          onClick={onDelete}
          className="w-5 h-5 flex items-center justify-center rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100 transition-colors -mt-1 -mr-1"
          aria-label="Remover faixa"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        {formatBRL(valorHora)}
        <span className="text-xs sm:text-sm font-normal text-gray-500">/hora</span>
      </div>

      <div className="text-xs font-mono text-gray-500 bg-white/60 rounded px-2 py-1">
        base × {formatMultiplier(band.multiplier)}
      </div>
    </div>
  );
}
