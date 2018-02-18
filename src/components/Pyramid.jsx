import React from 'react'
import PropTypes from 'prop-types'
import {
    CylinderGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from 'three'

export default class Pyramid extends React.Component {
    constructor(props) {
        super(props)
        this.canvas = this.props.canvas
        this.canvas.classList.add('shape')
    }

    componentDidMount() {
        this.scene = new Scene()
        this.camera = new PerspectiveCamera(
            75,
            this.canvas.offsetWidth / this.canvas.offsetHeight,
            1,
            1000,
        )
        this.renderer = new WebGLRenderer({ canvas: this.canvas })
        this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight)
        this.addShape()
    }

    addShape() {
        this.geometry = new CylinderGeometry(1, 1, 4)
        this.material = new MeshBasicMaterial({ color: 0x4286f4 })
        this.mesh = new Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    render() {
        return (
            <div
                className="pyramid"
                ref={(containerNode) => { containerNode.appendChild(this.canvas) }}
            />
        )
    }
}

Pyramid.propTypes = {
    canvas: PropTypes.instanceOf(HTMLCanvasElement),
}

Pyramid.defaultProps = {
    canvas: document.createElement('canvas'),
}
