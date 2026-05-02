import { useState, useEffect, useRef } from 'react';
import type { Band, BandCategory } from '../types';
import { DEFAULT_BANDS } from '../config';
import { logEvent } from '../utils/logger';

interface BandEditorProps {
  bands: Band[];
  onChange: (bands: Band[]) => void;
  onClose: () => void;
  focusBandId?: string | null;
}

const CATEGORIES: { value: BandCategory; label: string }[] = [
  { value: 'base', label: 'Base' },
  { value: 'overtime', label: 'Hora Extra' },
  { value: 'night', label: 'Noturno' },
  { value: 'special', label: 'Especial' },
];

export function BandEditor({ bands, onChange, onClose, focusBandId }: BandEditorProps) {
  const [draft, setDraft] = useState<Band[]>(bands);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusBandId && listRef.current) {
      const el = listRef.current.querySelector(`[data-band-id="${focusBandId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-blue-400');
        setTimeout(() => el.classList.remove('ring-2', 'ring-blue-400'), 1500);
      }
    }
  }, [focusBandId]);

  const updateBand = (id: string, updates: Partial<Band>) => {
    setDraft((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const deleteBand = (id: string) => {
    const band = draft.find((b) => b.id === id);
    logEvent('band_deleted', { bandId: id, bandName: band?.name });
    setDraft((prev) => prev.filter((b) => b.id !== id));
    setConfirmDelete(null);
  };

  const addBand = () => {
    const newBand: Band = {
      id: `band_${Date.now()}`,
      name: 'Nova Faixa',
      multiplier: 1.5,
      category: 'overtime',
    };
    logEvent('band_added', { bandId: newBand.id });
    setDraft((prev) => [...prev, newBand]);
  };

  const handleSave = () => {
    logEvent('bands_saved', { count: draft.length });
    onChange(draft);
    onClose();
  };

  const handleReset = () => {
    logEvent('bands_reset');
    setDraft(DEFAULT_BANDS);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full sm:max-w-md bg-white shadow-2xl flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">
            Configurar Faixas
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Band list */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {draft.map((band) => (
            <div
              key={band.id}
              data-band-id={band.id}
              className="border border-gray-200 rounded-lg p-3 space-y-2"
            >
              <div className="flex items-start gap-2">
                <input
                  type="text"
                  value={band.name}
                  onChange={(e) => updateBand(band.id, { name: e.target.value })}
                  className="flex-1 text-base font-medium border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                  placeholder="Nome da faixa"
                />
                {confirmDelete === band.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => deleteBand(band.id)}
                      className="px-2 py-2 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                      Sim
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="px-2 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Nao
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(band.id)}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                    aria-label="Excluir faixa"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Multiplicador
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={band.multiplier}
                    onChange={(e) =>
                      updateBand(band.id, {
                        multiplier: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full text-base border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Categoria
                  </label>
                  <select
                    value={band.category}
                    onChange={(e) =>
                      updateBand(band.id, {
                        category: e.target.value as BandCategory,
                      })
                    }
                    className="w-full text-base border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="border-t border-gray-200 px-4 py-4 space-y-3">
          <div className="flex gap-2">
            <button
              onClick={addBand}
              className="flex-1 py-2.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              + Adicionar Faixa
            </button>
            <button
              onClick={handleReset}
              className="py-2.5 px-4 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Restaurar
            </button>
          </div>
          <button
            onClick={handleSave}
            className="w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
