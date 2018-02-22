import React from 'react'
import { instanceOf } from 'prop-types'
import {
    Geometry,
    Material,
    Mesh,
    Scene,
    WebGLRenderer,
} from 'three'

export default class Shape extends React.Component {
    componentDidMount() {
        const { geometry, material } = this.props
        this.renderer = new WebGLRenderer({ canvas: this.props.canvas })
        this.scene = new Scene()
        this.mesh = new Mesh(geometry, material)
        this.scene.add(this.mesh)
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
