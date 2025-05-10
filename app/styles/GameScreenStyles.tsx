import { StyleSheet } from 'react-native';

export const scoreItemStyles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  flexEnd: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

// Shadow styles to avoid color literals
export const shadowStyles = StyleSheet.create({
  normalShadow: {
    // shadowColor applied via dynamic prop
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonShadow: {
    // shadowColor applied via dynamic prop
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  // transparentBg needs to be applied from context colors
  transparentBg: {
    // backgroundColor will be set in components
  },
  textShadow: {
    // textShadowColor applied via dynamic prop
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

// Badge opacity styles
export const opacityStyles = StyleSheet.create({
  normal: {
    opacity: 1,
  },
  faded: {
    opacity: 0.2,
  },
});

// Button styles
export const buttonStyles = StyleSheet.create({
  blueButton: {
    // backgroundColor applied via dynamic prop
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    // color applied via dynamic prop
  },
});
