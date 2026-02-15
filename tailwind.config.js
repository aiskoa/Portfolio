
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // ... (keep if needed, but remove if relying on v4 defaults)
      },
      width: {
        'custom-card': '400px',
      },
      height: {
        'custom-image': '250px',
      },
      backgroundImage: {
        'tv': "url('https://i.makeagif.com/media/4-05-2022/22uZbY.gif')",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};