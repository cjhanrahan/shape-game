import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
} from 'three'

export function getRenderer(canvas) {
    const renderer = new WebGLRenderer({ canvas })
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    return renderer
}

export function getScene(mesh) {
    const scene = new Scene()
    scene.add(mesh)
    return scene
}

export function getCamera(canvas) {
    const camera = new PerspectiveCamera(
        75,
        canvas.offsetWidth / canvas.offsetHeight,
        0.1,
        1000,
    )
    return camera
}
