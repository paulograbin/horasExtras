import { render, screen, fireEvent } from '@testing-library/react';
import { SalaryInput } from './SalaryInput';

describe('SalaryInput', () => {
  it('renders current salary formatted as BRL', () => {
    render(<SalaryInput salary={3500.5} onChange={() => {}} />);
    expect(screen.getByDisplayValue('3.500,50')).toBeDefined();
  });

  it('renders zero as 0,00', () => {
    render(<SalaryInput salary={0} onChange={() => {}} />);
    expect(screen.getByDisplayValue('0,00')).toBeDefined();
  });

  it('calls onChange with numeric value when digits are typed', () => {
    const onChange = vi.fn();
    render(<SalaryInput salary={0} onChange={onChange} />);
    const input = screen.getByDisplayValue('0,00');

    fireEvent.change(input, { target: { value: '350000' } });
    // 350000 (raw digits) / 100 = 3500
    expect(onChange).toHaveBeenCalledWith(3500);
  });

  it('strips non-numeric characters', () => {
    const onChange = vi.fn();
    render(<SalaryInput salary={0} onChange={onChange} />);
    const input = screen.getByDisplayValue('0,00');

    fireEvent.change(input, { target: { value: 'R$ 1.234,56' } });
    // strips to '123456' / 100 = 1234.56
    expect(onChange).toHaveBeenCalledWith(1234.56);
  });

  it('displays the R$ prefix', () => {
    render(<SalaryInput salary={1000} onChange={() => {}} />);
    expect(screen.getByText('R$')).toBeDefined();
  });
});
