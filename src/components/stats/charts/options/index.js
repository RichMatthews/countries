import { KIERAN_GREY } from 'styles'

export const CHART_OPTIONS = {
    animation: {
        startup: true,
        easing: 'linear',
        duration: 1000,
    },
    backgroundColor: '#fff',
    colors: [KIERAN_GREY],
    chartArea: {
        backgroundColor: {
            fill: KIERAN_GREY,
            opacity: 1,
        },
    },
    chartArea: { width: '60%' },
    hAxis: {
        textStyle: {
            color: '#4a4947',
        },
        minValue: 0,
    },
    legend: { position: 'none' },
    title: 'Continents by visits',
    titleTextStyle: { color: '#4a4947', fontSize: 20 },
    vAxis: {
        textStyle: {
            color: '#4a4947',
        },
    },
}
