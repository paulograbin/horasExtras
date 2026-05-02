import { logEvent } from '../utils/logger';

interface SalaryInputProps {
  salary: number;
  onChange: (value: number) => void;
}

export function SalaryInput({ salary, onChange }: SalaryInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const value = Number(raw) / 100;
    logEvent('salary_changed', { salary: value });
    onChange(value);
  };

  const displayValue = salary.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="max-w-md mx-auto px-4 mb-6 sm:mb-8">
      <label
        htmlFor="salary"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Salário Mensal Bruto
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">
          R$
        </span>
        <input
          id="salary"
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          placeholder="0,00"
          className="w-full pl-12 pr-4 py-3.5 sm:py-4 text-xl sm:text-2xl font-semibold text-gray-900 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        />
      </div>
    </div>
  );
}
