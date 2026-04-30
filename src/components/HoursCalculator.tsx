import { useState } from 'react';
import type { CalculationResult } from '../types';
import { formatBRL } from '../utils/calculations';

interface HoursCalculatorProps {
  results: CalculationResult[];
}

export function HoursCalculator({ results }: HoursCalculatorProps) {
  const [hours, setHours] = useState<Record<string, number>>({});

  const handleHoursChange = (bandId: string, value: string) => {
    const parsed = parseFloat(value);
    setHours((prev) => ({ ...prev, [bandId]: isNaN(parsed) ? 0 : parsed }));
  };

  const grandTotal = results.reduce(
    (sum, r) => sum + r.valorHora * (hours[r.band.id] || 0),
    0
  );

  return (
    <section className="max-w-5xl mx-auto px-4 pb-8 w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Calculadora de Horas
      </h2>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <span>Faixa</span>
          <span className="w-28 text-right">Valor/Hora</span>
          <span className="w-24 text-center">Horas</span>
          <span className="w-32 text-right">Subtotal</span>
        </div>

        {/* Rows */}
        {results.map((result) => {
          const h = hours[result.band.id] || 0;
          const subtotal = result.valorHora * h;

          return (
            <div
              key={result.band.id}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-gray-100 items-center last:border-b-0"
            >
              <span className="text-sm font-medium text-gray-800">
                {result.band.name}
              </span>
              <span className="w-28 text-right text-sm text-gray-600">
                {formatBRL(result.valorHora)}
              </span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={h || ''}
                onChange={(e) => handleHoursChange(result.band.id, e.target.value)}
                placeholder="0"
                className="w-24 text-center text-sm border border-gray-300 rounded-lg py-1.5 px-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
              />
              <span className="w-32 text-right text-sm font-semibold text-gray-900">
                {formatBRL(subtotal)}
              </span>
            </div>
          );
        })}

        {/* Total */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-4 bg-gray-50 border-t-2 border-gray-300 items-center">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="w-28"></span>
          <span className="w-24"></span>
          <span className="w-32 text-right text-lg font-bold text-green-700">
            {formatBRL(grandTotal)}
          </span>
        </div>
      </div>
    </section>
  );
}
