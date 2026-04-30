import type { CalculationResult } from '../types';
import { BandCard } from './BandCard';

interface ResultsGridProps {
  results: CalculationResult[];
}

export function ResultsGrid({ results }: ResultsGridProps) {
  if (results.length === 0) return null;

  return (
    <div className="px-4 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {results.map((result) => (
          <BandCard key={result.band.id} result={result} />
        ))}
      </div>
    </div>
  );
}
