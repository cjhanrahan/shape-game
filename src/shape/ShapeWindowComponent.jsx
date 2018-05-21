import React from 'react'
import {
    BufferGeometry,
    Geometry,
    MeshLambertMaterial,
} from 'three'
import { func, instanceOf, oneOfType, number } from 'prop-types'
import Shape from './ShapeComponent'

const getRealCanvas = () => document.createElement('canvas')
const material = new MeshLambertMaterial({ color: 0xdb7093 })

const ShapeWindowComponent = ({ getCanvas = getRealCanvas, geometry, volume }) => (
    <div className="shape-window">
        <div className="stats">
            <Shape
                canvas={getCanvas()}
                geometry={geometry}
                material={material}
            />
            <span className="volume">{volume}</span>
        </div>
    </div>
)

ShapeWindowComponent.propTypes = {
    volume: number.isRequired,
    getCanvas: func,
    geometry: oneOfType([
        instanceOf(Geometry),
        instanceOf(BufferGeometry),
    ]).isRequired,
}

ShapeWindowComponent.defaultProps = {
    getCanvas: getRealCanvas,
}

export default ShapeWindowComponent
