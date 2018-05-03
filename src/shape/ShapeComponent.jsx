import React, { createRef } from 'react'
import { instanceOf, oneOfType } from 'prop-types'
import {
    BufferGeometry,
    Geometry,
    Material,
    Mesh,
} from 'three'
import {
    getCamera,
    getScene,
    getRenderer,
} from '../shape/ShapeUtils'

export default class Shape extends React.Component {
    constructor(props) {
        super(props)
        this.containerNode = createRef()
        this.boundAnimate = this.animate.bind(this)
    }

    componentDidMount() {
        const {
            canvas,
            geometry,
            material,
        } = this.props
        this.containerNode.current.appendChild(canvas)
        this.renderer = getRenderer(canvas)
        this.mesh = new Mesh(geometry, material)
        this.scene = getScene(this.mesh)
        this.camera = getCamera(canvas)
        this.startAnimation()
        this.boundAnimate()
    }

    onAnimationTick() {
        this.mesh.rotation.y += 0.01
    }

    startAnimation() {
        this.animationShouldRun = true
    }

    animate() {
        if (this.animationShouldRun) {
            this.animationRequestId = requestAnimationFrame(this.boundAnimate)
            this.onAnimationTick()
            this.renderer.render(this.scene, this.camera)
        }
    }

    stopAnimation() {
        cancelAnimationFrame(this.animationRequestId)
        this.animationRequestId = null
        this.animationShouldRun = false
    }

    render() {
        return (
            <div
                className="shape-container"
                ref={this.containerNode}
            />
        )
    }
}

Shape.propTypes = {
    canvas: instanceOf(HTMLCanvasElement).isRequired,
    geometry: oneOfType([
        instanceOf(Geometry),
        instanceOf(BufferGeometry),
    ]).isRequired,
    material: instanceOf(Material).isRequired,
}
