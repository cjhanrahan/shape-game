import React from 'react'
import { instanceOf, number } from 'prop-types'
import { BoxGeometry, MeshBasicMaterial } from 'three'
import Shape from './Shape'

const Cube = ({ sideLength, canvas }) => {
    const geometry = new BoxGeometry(sideLength, sideLength, sideLength)
    const material = new MeshBasicMaterial({ color: 0xba55d3 })
    return (
        <Shape
            canvas={canvas}
            geometry={geometry}
            material={material}
        />
    )
}

Cube.propTypes = {
    canvas: instanceOf(HTMLCanvasElement).isRequired,
    sideLength: number.isRequired,
}

export default Cube
