import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const bankCoreLightTheme = {
    dark: false,
    colors: {
        'primary': '#5e2e87',
        'primary-darken-1': '#4a2269',
        'primary-lighten-1': '#8b55b8',
        'secondary': '#f3eefa',
        'accent': '#e2d0f5',
        'background': '#FFFFFF00',
        'surface': '#ffffff',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#2e7dd1',
        'success': '#22c55e',
        'on-primary': '#ffffff',
        'on-secondary': '#5e2e87',
        'on-surface': '#1a1a1a',
        'on-background': '#1a1a1a',
    },
}

export const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'bankCoreLightTheme',
        themes: {
            bankCoreLightTheme,
        },
    },
    defaults: {
        VCard: {
            elevation: 0,
            border: true,
            rounded: 'lg',
        },
        VBtn: {
            rounded: 'lg',
            variant: 'flat',
        },
        VTextField: {
            variant: 'outlined',
            density: 'comfortable',
            hideDetails: 'auto',
        },
        VSelect: {
            variant: 'outlined',
            density: 'comfortable',
            hideDetails: 'auto',
        },
        VSlider: {
            color: 'primary',
            trackColor: 'grey-lighten-3',
            thumbColor: 'primary',
            hideDetails: 'auto',
        },
    },
})
