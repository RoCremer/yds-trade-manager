// Text constants
const monoFont = 'Roboto Mono, monospace';
const sansSerifFont = `"Graphik", -apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
  "Segoe UI Emoji", "Segoe UI Symbol"`;
const fontWeights = {
  light: 300,
  regular: 400,
  semiBold: 600,
  bold: 800,
};

// Transition
const transition = '0.2s';

// Animations
const fadeInDown = {
  from: {
    opacity: 0,
    transform: 'translateY(-20%)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
};

export default {
  monoFont,
  sansSerifFont,
  fontWeights,
  transition,
  fadeInDown,
};
