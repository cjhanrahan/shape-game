import React from 'react'
import { number } from 'prop-types'
import Shape from './ShapeComponent'
import { componentPropType } from '../../test/utils/react'

const ShapeWindowComponent = ({ shape, volume }) => (
    <div className="shape-window">
        {shape}
        <div className="stats">
            <span className="volume">{volume}</span>
        </div>
    </div>
)

ShapeWindowComponent.propTypes = {
    volume: number.isRequired,
    shape: componentPropType(Shape).isRequired,
}

export default ShapeWindowComponent
