/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'PlusJakartaSans-Bold': ['PlusJakartaSans-Bold', 'system-ui'],
        'PlusJakartaSans-Medium': ['PlusJakartaSans-Medium', 'system-ui'],
        'PlusJakartaSans-Regular': ['PlusJakartaSans-Regular', 'system-ui'],
      },
    },
  },
  plugins: [],
};
