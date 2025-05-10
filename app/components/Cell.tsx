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

  // Define reusable style objects to avoid inline styles
  const xGlowStyle = {
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  };

  const oGlowStyle = {
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  };

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
          {/* Enhanced X with glow effect */}
          <View style={styles.xContainer}>
            <View
              style={[
                styles.xLine,
                {
                  backgroundColor: colors.xText,
                  shadowColor: colors.xText,
                  shadowOffset: { width: 0, height: 0 },
                  ...xGlowStyle
                }
              ]}
            />
            <View
              style={[
                styles.xLine,
                styles.xLine2,
                {
                  backgroundColor: colors.xText,
                  shadowColor: colors.xText,
                  shadowOffset: { width: 0, height: 0 },
                  ...xGlowStyle
                }
              ]}
            />
          </View>
        </Animated.View>
      )}

      {value === 'O' && (
        <Animated.View
          style={[
            styles.oWrapper,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Enhanced O with inner shadow and glow */}
          <View
            style={[
              styles.oCircle,
              {
                borderColor: colors.oText,
                backgroundColor: colors.transparentColor,
                shadowColor: colors.oText,
                shadowOffset: { width: 0, height: 0 },
                ...oGlowStyle
              },
            ]}
          />
          <View
            style={[
              styles.oInner,
              {
                borderColor: colors.oCell,
                backgroundColor: colors.transparentColor,
              },
            ]}
          />
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 88, // Reduced to fit the smaller board
    height: 88, // Reduced to fit the smaller board
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
  xContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '0deg' }],
  },
  xLine: {
    position: 'absolute',
    width: 10,
    height: 50,
    borderRadius: 5,
    transform: [{ rotate: '45deg' }],
  },
  xLine2: {
    transform: [{ rotate: '-45deg' }],
  },
  oWrapper: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  oCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 8,
    position: 'absolute',
  },
  oInner: {
    width: 26,
    height: 26,
    borderRadius: 13,
    position: 'absolute',
    borderWidth: 2,
  },
  cellRadius: {
    borderRadius: 16,
  },
});

export default Cell;
