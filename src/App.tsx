import { useState, useMemo, useEffect } from 'react';
import { CONFIG } from './config';
import { calculateAllBands } from './utils/calculations';
import { Header } from './components/Header';
import { SalaryInput } from './components/SalaryInput';
import { ResultsGrid } from './components/ResultsGrid';
import { HoursCalculator } from './components/HoursCalculator';
import { Footer } from './components/Footer';

function App() {
  const [salary, setSalary] = useState(() => {
    const saved = localStorage.getItem('salary');
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('salary', String(salary));
  }, [salary]);

  const results = useMemo(
    () => calculateAllBands(salary, CONFIG),
    [salary]
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <SalaryInput salary={salary} onChange={setSalary} />
      <ResultsGrid results={results} />
      <HoursCalculator results={results} />
      <Footer />
    </div>
  );
}

export default App;
