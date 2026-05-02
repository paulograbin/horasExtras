import type { CalculationResult, BandCategory } from '../types';
import { formatBRL } from '../utils/calculations';

interface BandCardProps {
  result: CalculationResult;
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

export function BandCard({ result }: BandCardProps) {
  const { band, valorHora } = result;
  const styles = categoryStyles[band.category];

  return (
    <div
      className={`rounded-xl border-2 ${styles.border} ${styles.bg} p-4 sm:p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]`}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <h3 className="font-bold text-gray-900 text-sm leading-tight">
          {band.name}
        </h3>
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
