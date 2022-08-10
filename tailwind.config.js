module.exports = {
    darkMode: 'class',
    content: ["./index.html', './src/**/*.{vue,js,ts,jsx,tsx}"],
    purge: false,
    theme: {
        extend: {
            colors: {
                accent: '#30A2C8',
                accent_light: '#B3ECFF',
                accent_dark: '#2782A1',
            },
        },
        animation: {
            bounce: 'bounce 1s infinite',
            spin: 'spin 2s linear infinite',
            wave: 'wave 2s linear infinite',
            neon: "neon 10s infinite"
        },
        keyframes: {
            bounce: {
                '50%': {
                    transform: 'translateY(-15%)',
                    'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
                },
                '0%, 100%': {
                    transform: 'translateY(5%)',
                    'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
                }
            },
            spin: {
                from: {
                    transform: 'rotate(0deg)'
                },
                to: {
                    transform: 'rotate(360deg)'
                }
            },
            wave: {
                '75%': {
                    transform: 'rotate(-5deg)',
                },
                '25%': {
                    transform: 'rotate(5deg)',
                },
                '0%, 50%, 100%': {
                    transform: 'rotate(0deg)',
                }
            },
            neon: {
                '0%': {
                    'background-color': 'inherit'
                },
                '25%': {
                    'background-color': 'yellow'
                },
                '50%': {
                    'background-color': 'blue'
                },
                '75%': {
                    'background-color': 'red'
                },
                '100%': {
                    'background-color': 'green'
                }
            }
        },
    },
    variants: {
        extend: {
            animation: ['hover', 'group-hover']
        },
    },
    plugins: [],
};
