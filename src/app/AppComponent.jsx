import React from 'react'
import { Geometry, BufferGeometry, MeshBasicMaterial } from 'three'
import { func, instanceOf, oneOfType, string } from 'prop-types'
import Shape from '../shape/ShapeComponent'
import './app.scss'

const getRealCanvas = () => document.createElement('canvas')

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
            material={new MeshBasicMaterial({ color: 0x9475f5 })}
        />
        <Shape
            canvas={getCanvas()}
            geometry={rightGeometry}
            material={new MeshBasicMaterial({ color: 0x9475f5 })}
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
