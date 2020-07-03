import React from 'react'

import { MobileNavContainer } from './mobile'

export const Nav = ({ logUserOut }) => {
    return <MobileNavContainer logUserOut={logUserOut} />
}

export const CONNECTED_Nav = Nav
