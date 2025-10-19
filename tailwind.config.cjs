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
        'athletic-brand-violet': '#8b5cf6',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1536px',
        'section': '1600px',
      },
      minHeight: {
        'section': '70vh',
        'card': '300px',
      },
    },
  },
  plugins: [],
};