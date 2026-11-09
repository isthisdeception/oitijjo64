/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          deep: 'var(--color-deep-forest, #173D32)',
          primary: 'var(--color-primary-green, #2F6B50)',
          paper: 'var(--color-warm-paper, #F7F4EC)',
          card: 'var(--color-card-white, #FFFEFA)',
          terracotta: 'var(--color-terracotta, #B85C43)',
          gold: 'var(--color-muted-gold, #C6A15B)',
          text: 'var(--color-main-text, #202B25)',
          muted: 'var(--color-secondary-text, #68736B)',
          border: 'var(--color-border, #E7E1D5)',
        },
      },
      fontFamily: {
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

