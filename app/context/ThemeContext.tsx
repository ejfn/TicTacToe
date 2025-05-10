import React, { createContext, useState, useContext, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: typeof darkColors; // Using darkColors as the base for type
}

interface ThemeProviderProps {
  children: ReactNode;
}

// Define color schemes for light and dark modes
export const lightColors = {
  // Base colors
  background: '#f8fafc', // Lighter, more consistent background
  text: '#334155',

  // Board elements
  boardBackground: '#e2e8f0',
  cellBackground: '#ffffff',
  cellBorder: '#cbd5e1',

  // X elements - blue theme
  xCell: '#ebf8ff',
  xText: '#0284c7',
  xTurnBackground: '#bae6fd',

  // O elements - green theme
  oCell: '#ecfdf5',
  oText: '#059669',
  oTurnBackground: '#a7f3d0',

  // UI elements
  buttonBackground: '#0ea5e9',
  buttonText: '#ffffff',
  buttonShadow: 'rgba(14, 165, 233, 0.5)',

  // Status elements
  drawText: '#9333ea',
  statusBackground: '#e2e8f0', // Matches boardBackground exactly
  turnLabelText: '#64748b',

  // Other
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  transparentColor: 'transparent',
  borderRadius: 16,
};

export const darkColors = {
  // Base colors
  background: '#111827', // Slightly lighter for better contrast
  text: '#f1f5f9',

  // Board elements
  boardBackground: '#1e293b',
  cellBackground: '#334155',
  cellBorder: '#475569',

  // X elements - blue theme
  xCell: '#172554',
  xText: '#38bdf8',
  xTurnBackground: '#0c4a6e',

  // O elements - green theme
  oCell: '#14532d',
  oText: '#34d399',
  oTurnBackground: '#065f46',

  // UI elements
  buttonBackground: '#0284c7',
  buttonText: '#f0f9ff',
  buttonShadow: 'rgba(2, 132, 199, 0.4)',

  // Status elements
  drawText: '#c084fc',
  statusBackground: '#1e293b', // Now matches boardBackground exactly
  turnLabelText: '#94a3b8',

  // Other
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  transparentColor: 'transparent',
  borderRadius: 16,
};

// Define theme-specific colors and commonly used values
export const themeColors = {
  darkButton: '#2c3e50',
  darkSun: '#f1c40f',
  lightButton: '#bae6fd',
  lightMoon: '#0369a1',
};

// Create the theme context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark', // Default to dark theme
  toggleTheme: () => {},
  colors: darkColors,
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('dark'); // Default to dark theme

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Get colors based on current theme
  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>{children}</ThemeContext.Provider>
  );
};
