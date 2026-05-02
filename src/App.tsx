import { useState, useMemo, useEffect } from 'react';
import { DEFAULT_BANDS, HORAS_MENSAIS } from './config';
import { calculateAllBands } from './utils/calculations';
import type { Band } from './types';
import { Header } from './components/Header';
import { SalaryInput } from './components/SalaryInput';
import { ResultsGrid } from './components/ResultsGrid';
import { HoursCalculator } from './components/HoursCalculator';
import { BandEditor } from './components/BandEditor';
import { Footer } from './components/Footer';

function App() {
  const [salary, setSalary] = useState(() => {
    const saved = localStorage.getItem('salary');
    return saved ? Number(saved) : 0;
  });

  const [bands, setBands] = useState<Band[]>(() => {
    const saved = localStorage.getItem('bands');
    return saved ? JSON.parse(saved) : DEFAULT_BANDS;
  });

  const [editorOpen, setEditorOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header onOpenEditor={() => setEditorOpen(true)} />
      <SalaryInput salary={salary} onChange={setSalary} />
      <ResultsGrid results={results} />
      <HoursCalculator results={results} />
      <Footer />
      {editorOpen && (
        <BandEditor
          bands={bands}
          onChange={setBands}
          onClose={() => setEditorOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
