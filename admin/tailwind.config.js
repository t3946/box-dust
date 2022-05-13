const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },

            colors: {
                white: '#ffffff',
                black: '#000000',
                yellow: '#faee0f',
                vk: '#44678d',
                vkDark: '#365270',

                text: {
                    white: '#ffffff',
                    black: '#000000',
                },
            },
        },
    },

    variants: {
        extend: {
            opacity: ['disabled'],
            backgroundColor: ['hover', 'active'],
        },
    },

    plugins: [require('@tailwindcss/forms')],

    corePlugins: {
        extend: [
            'borderOpacity',
            'textColor',
        ],
    }
};
