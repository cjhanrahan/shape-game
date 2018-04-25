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
        this.animationRequestId = null
        cancelAnimationFrame(this.animationRequestId)
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
