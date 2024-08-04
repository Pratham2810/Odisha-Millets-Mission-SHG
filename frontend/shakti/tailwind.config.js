/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-primary': '#84D187',
        'primary': '#00B207',
        'hard-primary': '#2C742F',
        'warning': '#FF8A00',
        'danger': '#EA4B48'
      },
    },
  },
  plugins: [],
};
