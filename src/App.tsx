import { useState, useMemo, useEffect } from 'react';
import { DEFAULT_BANDS, HORAS_MENSAIS } from './config';
import { calculateAllBands } from './utils/calculations';
import type { Band } from './types';
import { Header } from './components/Header';
import { SalaryInput } from './components/SalaryInput';
import { ResultsGrid } from './components/ResultsGrid';
import { HoursCalculator } from './components/HoursCalculator';
import { logEvent } from './utils/logger';

function App() {
  const [salary, setSalary] = useState(() => {
    const saved = localStorage.getItem('salary');
    return saved ? Number(saved) : 0;
  });

  const [bands, setBands] = useState<Band[]>(() => {
    const saved = localStorage.getItem('bands');
    return saved ? JSON.parse(saved) : DEFAULT_BANDS;
  });

  useEffect(() => {
    localStorage.setItem('salary', String(salary));
  }, [salary]);

  useEffect(() => {
    localStorage.setItem('bands', JSON.stringify(bands));
  }, [bands]);

  const results = useMemo(
    () => calculateAllBands(salary, { horasMensais: HORAS_MENSAIS, bands }),
    [salary, bands]
  );

  const deleteBand = (bandId: string) => {
    const band = bands.find((b) => b.id === bandId);
    logEvent('band_deleted', { bandId, bandName: band?.name });
    setBands((prev) => prev.filter((b) => b.id !== bandId));
  };

  const addBand = (name: string, multiplier: number) => {
    const newBand: Band = {
      id: `band_${Date.now()}`,
      name,
      multiplier,
      category: 'overtime',
    };
    logEvent('band_added', { bandId: newBand.id, bandName: name });
    setBands((prev) => [...prev, newBand]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <SalaryInput salary={salary} onChange={setSalary} />
      <ResultsGrid
        results={results}
        onDeleteBand={deleteBand}
        onAddBand={addBand}
      />
      <HoursCalculator results={results} />
    </div>
  );
}

export default App;
