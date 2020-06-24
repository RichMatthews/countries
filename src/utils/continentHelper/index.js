export const continentHelper = (country) => {
    if (country.region === 'Americas') {
        if (country.subregion === 'South America') {
            return 'South America'
        } else {
            return 'North America'
        }
    }
    return country.region
}
