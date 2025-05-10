import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CellValue } from '../../types/game';

interface CellProps {
  value: CellValue;
  onPress: () => void;
  disabled: boolean;
  testID?: string;
}

// A simplified mock of the Cell component for testing
const Cell: React.FC<CellProps> = ({ value, onPress, disabled, testID }) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={disabled || value !== null}
    >
      <Text>{value || 'empty'}</Text>
    </TouchableOpacity>
  );
};

export default Cell;