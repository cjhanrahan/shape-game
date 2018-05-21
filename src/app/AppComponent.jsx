import React from 'react'
// import { Geometry, BufferGeometry, MeshLambertMaterial } from 'three'
import { arrayOf, string } from 'prop-types'
import ShapeWindowContainer from '../shape/ShapeWindowContainer'
import './app.scss'

// const getRealCanvas = () => document.createElement('canvas')
// const material = new MeshLambertMaterial({ color: 0x9475f5 })

const App = ({
    status,
    shapeIds,
}) => (
    <div className="app" data-status={status}>
        {shapeIds.map(id => <ShapeWindowContainer shapeId={id} key={id} />)}
        <div className="loading"><span>loading...</span></div>
    </div>
)

App.propTypes = {
    status: string.isRequired,
    shapeIds: arrayOf(string).isRequired,
}


export default App
