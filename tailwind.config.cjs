module.exports = {
  content: [
    './src/**/*.{svelte,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0a0a0f',
        'brand-violet': '#8b5cf6',
        'brand-light': '#f0f0f5',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};