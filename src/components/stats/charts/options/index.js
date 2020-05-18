import { KIERAN_GREY } from 'styles'

export const CHART_OPTIONS = {
    animation: {
        startup: true,
        easing: 'linear',
        duration: 1000,
    },
    backgroundColor: '#fff',
    colors: [KIERAN_GREY],
    hAxis: {
        textStyle: {
            color: '#4a4947',
        },
        format: '0',
        gridlines: { count: 7 },
        maxValue: 7,
        minValue: 0,
    },
    legend: { position: 'none' },
    title: 'Continents by visits',
    titleTextStyle: { color: '#4a4947', fontSize: 20 },
    vAxis: {
        format: '0',
        maxValue: 10,
        minValue: 0,
        gridlines: { count: 7 },
        textStyle: {
            color: '#4a4947',
        },
    },
}
