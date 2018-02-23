import React from 'react'
import { instanceOf } from 'prop-types'
import {
    Geometry,
    Material,
    Mesh,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from 'three'

export default class Shape extends React.Component {
    componentDidMount() {
        const { canvas, geometry, material } = this.props
        this.renderer = new WebGLRenderer({ canvas })
        this.scene = new Scene()
        this.mesh = new Mesh(geometry, material)
        this.scene.add(this.mesh)
        this.camera = new PerspectiveCamera(
            75,
            canvas.offsetWidth / canvas.offsetHeight,
            0.1,
            1000,
        )
    }

    render() {
        return (
            <div
                className="shape-container"
                ref={(containerNode) => { containerNode.appendChild(this.props.canvas) }}
            />
        )
    }
}

Shape.propTypes = {
    canvas: instanceOf(HTMLCanvasElement).isRequired,
    geometry: instanceOf(Geometry).isRequired,
    material: instanceOf(Material).isRequired,
}
