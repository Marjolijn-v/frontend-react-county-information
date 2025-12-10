function coloredRegionName(region) {

    switch (region) {
        case 'Europe':
            return 'region-europe'

        case 'Americas':
            return 'region-americas'

        case 'Africa':
            return 'region-africa'

        case 'Asia':
            return 'region-asia'

        case 'Oceania':
            return 'region-oceania'

        default:
            return 'region-default'
    }
}

export default coloredRegionName