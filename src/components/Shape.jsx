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
        this.scene.add(new Mesh(geometry, material))
    }

    render() {
        return <div />
    }
}

Shape.propTypes = {
    canvas: instanceOf(HTMLCanvasElement).isRequired,
    geometry: instanceOf(Geometry).isRequired, 
    material: instanceOf(Material).isRequired,
}
