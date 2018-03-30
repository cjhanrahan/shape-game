import {
    Scene,
    WebGLRenderer,
} from 'three'

export function getRenderer(canvas) {
    const renderer = new WebGLRenderer({ canvas })
    renderer.setSize(canvas.offSetWidth, canvas.offsetHeight)
    return renderer
}

export function getScene(mesh) {
    const scene = new Scene()
    scene.add(mesh)
}

// export function getCamear(can
