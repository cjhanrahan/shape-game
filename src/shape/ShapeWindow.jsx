import React from 'react'
import {
    BufferGeometry,
    Geometry,
    MeshLambertMaterial,
} from 'three'
import { round } from 'mathjs'
import { func, instanceOf, oneOfType, number } from 'prop-types'
import Shape from './Shape'
import './shapeWindow.scss'

const getRealCanvas = () => document.createElement('canvas')
const material = new MeshLambertMaterial({ color: 0xdb7093 })

const ShapeWindowComponent = ({ getCanvas = getRealCanvas, geometry, volume }) => (
    <div styleName="shape-window">
        <Shape
            canvas={getCanvas()}
            geometry={geometry}
            material={material}
        />
        <div styleName="stats">
            <span className="volume">{round(volume, 2)}</span>
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
