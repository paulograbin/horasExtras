import { render, screen, fireEvent } from '@testing-library/react';
import { BandEditor } from './BandEditor';
import type { Band } from '../types';
import { DEFAULT_BANDS } from '../config';

const testBands: Band[] = [
  { id: 'hourly', name: 'Hora Normal', multiplier: 1.0, category: 'base' },
  { id: 'extra50', name: 'Extra 50%', multiplier: 1.5, category: 'overtime' },
];

describe('BandEditor', () => {
  it('renders all bands', () => {
    render(<BandEditor bands={testBands} onChange={() => {}} onClose={() => {}} />);
    expect(screen.getByDisplayValue('Hora Normal')).toBeDefined();
    expect(screen.getByDisplayValue('Extra 50%')).toBeDefined();
  });

  it('editing a band name updates the input', () => {
    render(<BandEditor bands={testBands} onChange={() => {}} onClose={() => {}} />);
    const input = screen.getByDisplayValue('Hora Normal');
    fireEvent.change(input, { target: { value: 'Base Editada' } });
    expect(screen.getByDisplayValue('Base Editada')).toBeDefined();
  });

  it('editing multiplier updates the input', () => {
    render(<BandEditor bands={testBands} onChange={() => {}} onClose={() => {}} />);
    const input = screen.getByDisplayValue('1.5');
    fireEvent.change(input, { target: { value: '2.5' } });
    expect(screen.getByDisplayValue('2.5')).toBeDefined();
  });

  it('adding a band increases the list', () => {
    render(<BandEditor bands={testBands} onChange={() => {}} onClose={() => {}} />);
    const addBtn = screen.getByText(/Adicionar Faixa/);
    fireEvent.click(addBtn);
    expect(screen.getByDisplayValue('Nova Faixa')).toBeDefined();
  });

  it('deleting a band requires confirmation', () => {
    render(<BandEditor bands={testBands} onChange={() => {}} onClose={() => {}} />);
    const deleteButtons = screen.getAllByLabelText('Excluir faixa');
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText('Sim')).toBeDefined();
    expect(screen.getByText('Nao')).toBeDefined();
  });

  it('confirming delete removes the band', () => {
    render(<BandEditor bands={testBands} onChange={() => {}} onClose={() => {}} />);
    const deleteButtons = screen.getAllByLabelText('Excluir faixa');
    fireEvent.click(deleteButtons[0]);
    fireEvent.click(screen.getByText('Sim'));

    expect(screen.queryByDisplayValue('Hora Normal')).toBeNull();
  });

  it('cancelling delete keeps the band', () => {
    render(<BandEditor bands={testBands} onChange={() => {}} onClose={() => {}} />);
    const deleteButtons = screen.getAllByLabelText('Excluir faixa');
    fireEvent.click(deleteButtons[0]);
    fireEvent.click(screen.getByText('Nao'));

    expect(screen.getByDisplayValue('Hora Normal')).toBeDefined();
  });

  it('save calls onChange with updated bands', () => {
    const onChange = vi.fn();
    render(<BandEditor bands={testBands} onChange={onChange} onClose={() => {}} />);

    const input = screen.getByDisplayValue('Hora Normal');
    fireEvent.change(input, { target: { value: 'Modified' } });
    fireEvent.click(screen.getByText('Salvar'));

    expect(onChange).toHaveBeenCalledTimes(1);
    const saved = onChange.mock.calls[0][0];
    expect(saved[0].name).toBe('Modified');
  });

  it('reset restores default bands', () => {
    render(<BandEditor bands={testBands} onChange={() => {}} onClose={() => {}} />);
    fireEvent.click(screen.getByText('Restaurar'));

    expect(screen.getByDisplayValue(DEFAULT_BANDS[0].name)).toBeDefined();
  });

  it('backdrop click calls onClose', () => {
    const onClose = vi.fn();
    const { container } = render(<BandEditor bands={testBands} onChange={() => {}} onClose={onClose} />);

    const backdrop = container.querySelector('.backdrop-blur-sm') as HTMLElement;
    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
