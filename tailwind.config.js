/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-text":
          "linear-gradient(to right, #144EE3, #EB568E, #A353AA, #144EE3)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".bg-clip-text": {
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
