import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            animation: {
                "fade-in-down": "fade-in-down 0.5s ease-in-out",
                "fade-in-right": "fade-in-right 0.5s ease-in-out",
            },
        },
        keyframes: {
            "fade-in-down": {
                "0%": {
                    opacity: 0,
                    transform: "translateY(-10px)",
                },
                "100%": {
                    opacity: 1,
                    transform: "translateY(0)",
                },
            },
            "fade-in-right": {
                "0%": {
                    opacity: 0,
                    transform: "translateX(-10px)",
                },
                "100%": {
                    opacity: 1,
                    transform: "translateX(0)",
                },
            },
        },
    },

    plugins: [forms],
};
