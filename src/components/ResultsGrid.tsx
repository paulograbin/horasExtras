import { useState } from 'react';
import type { CalculationResult } from '../types';
import { BandCard } from './BandCard';

interface ResultsGridProps {
  results: CalculationResult[];
  onLongPressBand: (bandId: string) => void;
  onDeleteBand: (bandId: string) => void;
  onAddBand: (name: string, multiplier: number) => void;
}

export function ResultsGrid({ results, onLongPressBand, onDeleteBand, onAddBand }: ResultsGridProps) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newMultiplier, setNewMultiplier] = useState('');

  const handleAdd = () => {
    const name = newName.trim();
    const multiplier = parseFloat(newMultiplier);
    if (!name || isNaN(multiplier) || multiplier <= 0) return;
    onAddBand(name, multiplier);
    setNewName('');
    setNewMultiplier('');
    setAdding(false);
  };

  if (results.length === 0) return null;

  return (
    <div className="px-4 pb-6 sm:pb-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
        {results.map((result) => (
          <BandCard
            key={result.band.id}
            result={result}
            onLongPress={() => onLongPressBand(result.band.id)}
            onDelete={() => onDeleteBand(result.band.id)}
          />
        ))}

        {adding ? (
          <div className="rounded-xl border-2 border-dashed border-green-300 bg-green-50 p-4 sm:p-5 flex flex-col gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nome da faixa"
              autoFocus
              className="text-sm font-medium border border-gray-300 rounded-lg px-2 py-1.5 focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none"
            />
            <input
              type="number"
              value={newMultiplier}
              onChange={(e) => setNewMultiplier(e.target.value)}
              placeholder="Multiplicador (ex: 1.5)"
              min="0"
              step="0.01"
              className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 focus:border-green-500 focus:ring-1 focus:ring-green-200 outline-none"
            />
            <div className="flex gap-2 mt-1">
              <button
                onClick={handleAdd}
                className="flex-1 text-xs font-semibold text-white bg-green-600 rounded-lg py-1.5 hover:bg-green-700 transition-colors"
              >
                Adicionar
              </button>
              <button
                onClick={() => { setAdding(false); setNewName(''); setNewMultiplier(''); }}
                className="flex-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg py-1.5 hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-4 sm:p-5 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-green-600 hover:border-green-300 hover:bg-green-50 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="text-sm font-medium">Nova Faixa</span>
          </button>
        )}
      </div>
    </div>
  );
}
