/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/react");


module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'shamrock': {
          '50': '#effef4',
          '100': '#dafee7',
          '200': '#b7fbd0',
          '300': '#80f5ac',
          '400': '#40e780',
          '500': '#18cf5e',
          '600': '#0dac4b',
          '700': '#0e873d',
          '800': '#116a35',
          '900': '#10572d',
      },
      'rhino': {
        '50': '#f5f6fa',
        '100': '#e9ecf5',
        '200': '#cfd8e8',
        '300': '#a4b4d5',
        '400': '#738dbd',
        '500': '#526fa5',
        '600': '#3f578a',
        '700': '#344770',
        '800': '#2e3d5e',
        '900': '#2a3550',
      },
      'scooter': {
        '50': '#edfcfe',
        '100': '#d3f4fa',
        '200': '#ace8f5',
        '300': '#72d5ee',
        '400': '#2bb7dd',
        '500': '#169dc4',
        '600': '#157da5',
        '700': '#186586',
        '800': '#1c536e',
        '900': '#1c465d',
      },
      'elm': {
        '50': '#f2fbfa',
        '100': '#d4f3f0',
        '200': '#a8e7e1',
        '300': '#75d3cd',
        '400': '#48b9b5',
        '500': '#2f9d9b',
        '600': '#237e7e',
        '700': '#216869',
        '800': '#1e4f51',
        '900': '#1d4244',
      },
      'smoke': {
        '50': '#fcfdfd',
        '100': '#e1e2e6',
        '200': '#c2c3cd',
        '300': '#9b9dad',
        '400': '#50515e',
        '500': '#464a59',
        '600': '#30303b',
        '700': '#25252d',
        '800': '#1a1a1e',
        '900': '#0c0c0e',
      },
      }
    },
  },
   darkMode: "class",
  plugins: [nextui()],

}
