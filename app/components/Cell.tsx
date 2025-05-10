import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import { CellValue } from '../types/game';
import { useTheme } from '../context/ThemeContext';

interface CellProps {
  value: CellValue;
  onPress: () => void;
  disabled: boolean;
  testID?: string;
}

const Cell: React.FC<CellProps> = ({ value, onPress, disabled, testID }) => {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value) {
      // Animate when a cell gets a value
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animation values
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);
    }
  }, [value, scaleAnim, opacityAnim]);

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {
          backgroundColor: colors.cellBackground,
          borderColor: colors.cellBorder,
          shadowColor: colors.shadowColor,
        },
        styles.cellRadius,
        value === 'X' && {
          backgroundColor: colors.xCell,
          shadowColor: colors.xText,
        },
        value === 'O' && {
          backgroundColor: colors.oCell,
          shadowColor: colors.oText,
        },
        !value && !disabled && styles.emptyCellHover,
      ]}
      onPress={onPress}
      disabled={disabled || value !== null}
      testID={testID}
      activeOpacity={0.6}
      pressRetentionOffset={{ top: 10, left: 10, bottom: 10, right: 10 }}
    >
      {value === 'X' && (
        <Animated.View
          style={[
            styles.marker,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={[styles.xLine, { backgroundColor: colors.xText }]} />
          <View style={[styles.xLine, styles.xLine2, { backgroundColor: colors.xText }]} />
        </Animated.View>
      )}

      {value === 'O' && (
        <Animated.View
          style={[
            styles.oCircle,
            {
              borderColor: colors.oText,
              backgroundColor: colors.transparentColor,
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 98, // Precisely calculated to fit the board (320 - 8 padding - 12 margin between cells) / 3
    height: 98,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    margin: 2, // Even margin all around
  },
  emptyCellHover: {
    opacity: 0.9,
  },
  marker: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  xLine: {
    position: 'absolute',
    width: 10,
    height: 60,
    borderRadius: 5,
    transform: [{ rotate: '45deg' }],
  },
  xLine2: {
    transform: [{ rotate: '-45deg' }],
  },
  oCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 10,
    // backgroundColor will be set dynamically
  },
  cellRadius: {
    borderRadius: 12,
  },
});

export default Cell;
