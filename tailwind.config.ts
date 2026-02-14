import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        santor: {
          DEFAULT: "hsl(var(--santor-primary))",
          foreground: "hsl(var(--santor-primary-foreground))",
          secondary: "hsl(var(--santor-secondary))",
          accent: "hsl(var(--santor-accent))",
        },
        restory: {
          DEFAULT: "hsl(var(--restory-primary))",
          foreground: "hsl(var(--restory-primary-foreground))",
          secondary: "hsl(var(--restory-secondary))",
          accent: "hsl(var(--restory-accent))",
          background: "hsl(var(--restory-background))",
        },
        nirvana: {
          DEFAULT: "hsl(var(--nirvana-primary))",
          foreground: "hsl(var(--nirvana-primary-foreground))",
          accent: "hsl(var(--nirvana-accent))",
          secondary: "hsl(var(--nirvana-secondary))",
          background: "hsl(var(--nirvana-background))",
        },
        smoody: {
          DEFAULT: "hsl(var(--smoody-primary))",
          foreground: "hsl(var(--smoody-primary-foreground))",
          secondary: "hsl(var(--smoody-secondary))",
          accent: "hsl(var(--smoody-accent))",
          background: "hsl(var(--smoody-background))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'gradient-santor': 'var(--gradient-santor)',
        'gradient-restory': 'var(--gradient-restory)',
        'gradient-nirvana': 'var(--gradient-nirvana)',
        'gradient-smoody': 'var(--gradient-smoody)',
      },
      boxShadow: {
        'elegant': 'var(--shadow-elegant)',
        'card': 'var(--shadow-card)',
        'modal': 'var(--shadow-modal)',
      },
      transitionTimingFunction: {
        'smooth': 'var(--transition-smooth)',
        'bounce': 'var(--transition-bounce)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "basket-expand": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" },
        },
        "fly-to-basket": {
          "0%": { 
            transform: "translate(0, 0) scale(1)",
            opacity: "1",
            filter: "blur(0px)"
          },
          "24%": {
            transform: "translate(calc(var(--fly-x, 0) * 0.18), calc(var(--fly-y, 200px) * 0.18)) scale(0.9)",
            opacity: "0.98",
            filter: "blur(0.35px)"
          },
          "62%": {
            transform: "translate(calc(var(--fly-x, 0) * 0.66), calc(var(--fly-y, 200px) * 0.66)) scale(0.62)",
            opacity: "0.9",
            filter: "blur(0.9px)"
          },
          "84%": {
            transform: "translate(calc(var(--fly-x, 0) * 0.88), calc(var(--fly-y, 200px) * 0.88)) scale(0.38)",
            opacity: "0.78",
            filter: "blur(1.8px)"
          },
          "100%": { 
            transform: "translate(var(--fly-x, 0), var(--fly-y, 200px)) scale(0.12)",
            opacity: "0",
            filter: "blur(2.8px)"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "basket-expand": "basket-expand 0.33s ease-out",
        "fly-to-basket": "fly-to-basket 0.9s cubic-bezier(0.16, 0.74, 0.22, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
