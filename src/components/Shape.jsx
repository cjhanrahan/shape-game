import React from 'react'
import { instanceOf } from 'prop-types'
import {
    Geometry,
    Material,
    Mesh,
} from 'three'
import {
    getCamera,
    getScene,
    getRenderer,
} from '../render/Shape'

export default class Shape extends React.Component {
    componentDidMount() {
        const {
            canvas,
            geometry,
            material,
        } = this.props
        this.renderer = getRenderer(canvas)
        this.mesh = new Mesh(geometry, material)
        this.scene = getScene(this.mesh)
        this.camera = getCamera(canvas)
        this.boundStartAnimation = this.startAnimation.bind(this)
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
}
