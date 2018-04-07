import React, { createRef } from 'react'
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
        this.containerRef = createRef()
        this.boundAnimate = this.animate.bind(this)
    }

    componentDidMount() {
        this.containerRef.current.appendChild(this.canvas)
        this.scene = new Scene()
        this.camera = new PerspectiveCamera(
            75,
            this.canvas.offsetWidth / this.canvas.offsetHeight,
            0.1,
            1000,
        )
        this.renderer = new WebGLRenderer({ canvas: this.canvas })
        this.renderer.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight)
        this.addShape()
        this.camera.position.z = 5
        this.boundAnimate()
    }

    addShape() {
        this.geometry = new CylinderGeometry(0, 1, 4, 4)
        this.material = new MeshBasicMaterial({ color: 0x00ff00 })
        this.mesh = new Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    animate() {
        requestAnimationFrame(this.boundAnimate)
        this.mesh.rotation.x += 0.1
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div
                className="shape-container pyramid"
                ref={this.containerRef}
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
