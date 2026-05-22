import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E30613",
        surface: "#F5F6F7",
        border: "#E5E7EB",
        text: "#111827"
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.06)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
} satisfies Config;

