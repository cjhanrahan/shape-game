import {
    WebGLRenderer,
} from 'three'

export function getRenderer(canvas) {
    const renderer = new WebGLRenderer({ canvas })
    renderer.setSize(canvas.offSetWidth, canvas.offsetHeight)
    return renderer
}
