export const countryNameConverter = (country) => {
    if (country.toLowerCase().includes('united states')) {
        return 'United States'
    }
    if (country.toLowerCase().includes('britain')) {
        return 'United Kingdom'
    }
    if (country.toLowerCase().includes('bolivia')) {
        return 'Bolivia'
    }
    if (country.toLowerCase().includes('russia')) {
        return 'Russia'
    }
    if (country.toLowerCase().includes('islamic')) {
        return 'Iran'
    }
    if (country.toLowerCase().includes('macedonia')) {
        return 'Macedonia'
    }
    if (country.toLowerCase().includes('viet nam')) {
        return 'Vietnam'
    }
    if (country.toLowerCase().includes('moldova')) {
        return 'Moldova'
    }
    if (country.toLowerCase().includes('korea (D')) {
        return 'North Korea'
    }
    if (country.toLowerCase().includes('venezuela')) {
        return 'Venezuela'
    }

    return country
}
