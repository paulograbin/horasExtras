import { render, screen, act } from '@testing-library/react';
import { BandCard } from './BandCard';
import type { CalculationResult } from '../types';

const mockResult: CalculationResult = {
  band: { id: 'extra50', name: 'Extra 50%', multiplier: 1.5, category: 'overtime' },
  valorHoraBase: 20,
  valorHora: 30,
};

describe('BandCard', () => {
  it('renders band name', () => {
    render(<BandCard result={mockResult} onLongPress={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Extra 50%')).toBeDefined();
  });

  it('renders formatted hourly value', () => {
    render(<BandCard result={mockResult} onLongPress={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/R\$\s*30,00/)).toBeDefined();
  });

  it('renders multiplier', () => {
    render(<BandCard result={mockResult} onLongPress={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/base × 1\.5/)).toBeDefined();
  });

  it('applies overtime category border color', () => {
    const { container } = render(<BandCard result={mockResult} onLongPress={() => {}} />);
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain('border-blue-300');
  });

  it('fires onLongPress after 500ms hold', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const { container } = render(<BandCard result={mockResult} onLongPress={onLongPress} onDelete={() => {}} />);
    const card = container.firstElementChild as HTMLElement;

    card.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 0, clientY: 0 }));
    act(() => { vi.advanceTimersByTime(500); });

    expect(onLongPress).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('does NOT fire onLongPress on short tap', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const { container } = render(<BandCard result={mockResult} onLongPress={onLongPress} onDelete={() => {}} />);
    const card = container.firstElementChild as HTMLElement;

    card.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 0, clientY: 0 }));
    act(() => { vi.advanceTimersByTime(200); });
    card.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    act(() => { vi.advanceTimersByTime(500); });

    expect(onLongPress).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('cancels long-press if pointer moves > 10px', () => {
    vi.useFakeTimers();
    const onLongPress = vi.fn();
    const { container } = render(<BandCard result={mockResult} onLongPress={onLongPress} onDelete={() => {}} />);
    const card = container.firstElementChild as HTMLElement;

    card.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 0, clientY: 0 }));
    act(() => { vi.advanceTimersByTime(100); });
    card.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 20, clientY: 0 }));
    act(() => { vi.advanceTimersByTime(500); });

    expect(onLongPress).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
