export type ThemeType = {
  colors: typeof lightColors;
  spacing: typeof spacing;
  fonts: typeof fonts;
};


export const lightColors = {
  primary: '#4F8EF7',
  secondary: '#FFB300',
  background: '#F5F6FA',
  text: '#222B45',
  border: '#E4E9F2',
  error: '#FF3D71',
  success: '#00E096',
  layer: '#FFFFFF',
};

export const darkColors = {
  primary: '#4F8EF7',
  secondary: '#FFB300',
  background: '#181A20',
  text: '#F5F6FA',
  border: '#222B45',
  error: '#FF3D71',
  success: '#00E096',
    layer: '#1C1E24',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const fonts = {
  regular: 'SpaceMono-Regular',
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
};

export const lightTheme = {
  colors: lightColors,
  spacing,
  fonts,
};

export const darkTheme = {
  colors: darkColors,
  spacing,
  fonts,
};
