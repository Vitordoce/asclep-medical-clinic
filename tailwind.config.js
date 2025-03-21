/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--blue-500)',
        'primary-dark': 'var(--blue-700)',
        'primary-light': 'var(--blue-300)',
        success: 'var(--success-500)',
        danger: 'var(--danger-500)',
        attention: 'var(--attention-500)',
      },
      backgroundColor: {
        primary: 'var(--blue-500)',
        'primary-dark': 'var(--blue-700)',
        'primary-light': 'var(--blue-300)',
        success: 'var(--success-500)',
        danger: 'var(--danger-500)',
        attention: 'var(--attention-500)',
      },
      textColor: {
        primary: 'var(--blue-500)',
        'primary-dark': 'var(--blue-700)',
        'primary-light': 'var(--blue-300)',
        success: 'var(--success-500)',
        danger: 'var(--danger-500)',
        attention: 'var(--attention-500)',
      },
      borderColor: {
        primary: 'var(--blue-500)',
        'primary-dark': 'var(--blue-700)',
        'primary-light': 'var(--blue-300)',
        success: 'var(--success-500)',
        danger: 'var(--danger-500)',
        attention: 'var(--attention-500)',
      },
    },
  },
  plugins: [],
}

