import React from 'react'
import { Geometry, BufferGeometry, MeshLambertMaterial } from 'three'
import { func, instanceOf, oneOfType, string } from 'prop-types'
import Shape from '../shape/ShapeComponent'
import './app.scss'

const getRealCanvas = () => document.createElement('canvas')
const material = new MeshLambertMaterial({ color: 0x9475f5 })

const App = ({
    status,
    leftGeometry,
    rightGeometry,
    getCanvas,
}) => (
    <div className="app" data-status={status}>
        <Shape
            canvas={getCanvas()}
            geometry={leftGeometry}
            material={material}
        />
        <Shape
            canvas={getCanvas()}
            geometry={rightGeometry}
            material={material}
        />
        <div className="loading"><span>loading...</span></div>
    </div>
)

App.propTypes = {
    status: string.isRequired,
    leftGeometry: oneOfType([
        instanceOf(Geometry),
        instanceOf(BufferGeometry),
    ]).isRequired,
    rightGeometry: oneOfType([
        instanceOf(Geometry),
        instanceOf(BufferGeometry),
    ]).isRequired,
    getCanvas: func,
}

App.defaultProps = {
    getCanvas: getRealCanvas,
}


export default App
