import React from 'react'
import Modal from 'react-modal'
import { keyframes } from 'styled-components'

export const ReactModalAdapter = ({ className, modalClassName, ...props }) => {
    const contentClassName = `${className}__content`
    const overlayClassName = `${className}__overlay`
    return (
        <Modal
            className={contentClassName}
            overlayClassName={overlayClassName}
            portalClassName={className}
            {...props}
        />
    )
}

export const fadeIn = keyframes`
    from {
       opacity: 0;
    }
    to {
        opacity: 1;
    }
`
