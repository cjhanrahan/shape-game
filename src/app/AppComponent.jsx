import React from 'react'
import { string } from 'prop-types'
import { MeshBasicMaterial } from 'three'
import Shape from '../shape/ShapeComponent'
import { getThreeGeometry } from '../shape/box'
import './app.scss'

const boxGeometry = getThreeGeometry({ width: 4, height: 5, depth: 7 })
const boxShape = (
    <Shape
        canvas={document.createElement('canvas')}
        geometry={boxGeometry}
        material={new MeshBasicMaterial({ color: 0x9475f5 })}
    />
)

const App = ({ status }) => (
    <div className="app" data-status={status}>
        {boxShape}
        <div className="loading"><span>loading...</span></div>
    </div>
)

App.propTypes = {
    status: string.isRequired,
}

export default App
