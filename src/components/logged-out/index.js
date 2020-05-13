import React from 'react'
import { Link } from 'react-router-dom'

export const LoggedOut = () => {
    return (
        <div>
            You are logged out please click <Link to="/login">here</Link> to log in
        </div>
    )
}
