module.exports = {
    content: ["./index.html', './src/**/*.{vue,js,ts,jsx,tsx}"],
    purge: false,
    theme: {
        extend: {
            colors: {
                offwhite: '#f3f3f3',
                offblack: '#262626',
                success: '#008B38',
                success_light: '#B3FFD1',
                success_dark: '#006428',
                danger: '#BE2540',
                danger_light: '#FFB3C0',
                danger_dark: '#941D32',
                warning: '#C68300',
                warning_light: '#FFE5B3',
                warning_dark: '#A36C00',
                info: '#30A2C8',
                info_light: '#B3ECFF',
                info_dark: '#2782A1',
                primary: '#262626',
                primary_dark: '#000000',
                secondary: '#f3f3f3',
                secondary_dark: '#ffffff',
                text: '#262626',
                text_hover: '#000000',
                text_white: '#f3f3f3',
                text_white_hover: '#ffffff',
                navbar_hover: '#CCCCCC',

            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
