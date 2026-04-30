import { CONFIG } from '../config';

export function Footer() {
  return (
    <footer className="text-center py-6 px-4 border-t border-gray-200 mt-auto">
      <p className="text-xs text-gray-500">
        {/* Cálculos baseados na CLT (Consolidação das Leis do Trabalho). */}
        {/* Divisor utilizado: <strong>{CONFIG.horasMensais}h/mês</strong>. */}
      </p>
      <p className="text-xs text-gray-400 mt-1">
        {/* A faixa de 75% depende de convenção coletiva. Consulte seu sindicato. */}
      </p>
    </footer>
  );
}
