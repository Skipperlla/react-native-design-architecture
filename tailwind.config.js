/** @type {import('tailwindcss').Config} */

const numbers = [...Array(500).keys()].map((number) => number / 2);

function handleNumbers() {
  let numberObject = {};

  numbers.forEach(function (number) {
    numberObject = { ...numberObject, [number]: `${number * 4}px` };
  });

  return { ...numberObject };
}

const sizes = handleNumbers();

function withNegative(object) {
  let negatives = {};

  Object.keys(object).forEach(function (key) {
    if (object.hasOwnProperty(key)) {
      negatives = { ...negatives, [`-${key}`]: `-${object[key]}` };
    }
  });

  return { ...negatives, ...object };
}

module.exports = {
  darkMode: 'selector',
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/navigation/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppinsBold: ['Poppins-Bold'],
      },
      colors: {},
      margin: sizes,
      padding: sizes,
      width: sizes,
      height: sizes,
      minWidth: sizes,
      minHeight: sizes,
      fontSize: sizes,
      spacing: withNegative(sizes),
      borderRadius: sizes,
      gap: sizes,
    },
  },
  plugins: [],
};
