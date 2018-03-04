import React from 'react'
import { bool, instanceOf } from 'prop-types'
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
        const {
            canvas,
            geometry,
            material,
            startAnimationOnMount
        } = this.props
        this.renderer = new WebGLRenderer({ canvas })
        this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
        this.scene = new Scene()
        this.mesh = new Mesh(geometry, material)
        this.scene.add(this.mesh)
        this.camera = new PerspectiveCamera(
            75,
            canvas.offsetWidth / canvas.offsetHeight,
            0.1,
            1000,
        )
        this.boundStartAnimation = this.startAnimation.bind(this)
        if (startAnimationOnMount) {
            this.startAnimation()
        }
    }

    onAnimationTick() {
        this.mesh.rotation.y += 0.1
    }

    startAnimation() {
        this.animationRequestId = requestAnimationFrame(this.boundStartAnimation)
        this.onAnimationTick()
        this.renderer.render(this.scene, this.camera)
    }

    stopAnimation() {
        cancelAnimationFrame(this.animationRequestId)
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
    startAnimationOnMount: bool.isRequired,
}
