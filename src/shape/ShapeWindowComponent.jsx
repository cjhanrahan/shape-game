import React from 'react'
import { element, number } from 'prop-types'

const ShapeWindowComponent = ({ children, volume }) => (
    <div className="shape-window">
        {children}
        <div className="stats">
            <span className="volume">{volume}</span>
        </div>
    </div>
)

ShapeWindowComponent.propTypes = {
    volume: number.isRequired,
    children: element.isRequired,
}

export default ShapeWindowComponent
