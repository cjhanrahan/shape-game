import React from 'react'
import PropTypes from 'prop-types'
import { WebGLRenderer } from 'three'

export default class Shape extends React.Component {
    componentDidMount() {
        this.renderer = new WebGLRenderer({ canvas: this.props.canvas })
    }

    render() {
        return <div />
    }
}

Shape.propTypes = {
    canvas: PropTypes.instanceOf(HTMLCanvasElement).isRequired,
}
