import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Cell from '../components/Cell'; // This will be automatically mocked

describe('Cell Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('should render empty cell correctly', () => {
    const { getByTestId } = render(
      <Cell value={null} onPress={mockOnPress} disabled={false} testID="cell" />
    );

    const cell = getByTestId('cell');
    expect(cell).toBeDefined();
  });

  it('should render X correctly', () => {
    const { getByTestId } = render(
      <Cell value="X" onPress={mockOnPress} disabled={false} testID="cell" />
    );

    const cell = getByTestId('cell');
    expect(cell).toBeDefined();
  });

  it('should render O correctly', () => {
    const { getByTestId } = render(
      <Cell value="O" onPress={mockOnPress} disabled={false} testID="cell" />
    );

    const cell = getByTestId('cell');
    expect(cell).toBeDefined();
  });

  it('should call onPress when pressed on empty cell', () => {
    const { getByTestId } = render(
      <Cell value={null} onPress={mockOnPress} disabled={false} testID="cell" />
    );

    const cell = getByTestId('cell');
    fireEvent.press(cell);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when cell is filled', () => {
    const { getByTestId } = render(
      <Cell value="X" onPress={mockOnPress} disabled={false} testID="cell" />
    );

    const cell = getByTestId('cell');
    fireEvent.press(cell);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should not call onPress when disabled', () => {
    const { getByTestId } = render(
      <Cell value={null} onPress={mockOnPress} disabled={true} testID="cell" />
    );

    const cell = getByTestId('cell');
    fireEvent.press(cell);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
