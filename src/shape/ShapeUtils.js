import {
    AmbientLight,
    Scene,
    PerspectiveCamera,
    SpotLight,
    WebGLRenderer,
} from 'three'

export function getRenderer(canvas) {
    const renderer = new WebGLRenderer({ canvas })
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.shadowMapEnabled = true
    return renderer
}

export function getScene(mesh) {
    const scene = new Scene()
    scene.add(mesh)
    const ambient = new AmbientLight(0x2f4f4f)
    scene.add(ambient)
    const spotlight = new SpotLight(0xf5fffa)
    scene.add(spotlight)
    spotlight.position.set(-30, 60, 60)
    spotlight.castShadow = true
    scene.add(spotlight)
    return scene
}

export function getCamera(canvas) {
    const camera = new PerspectiveCamera(
        75,
        canvas.offsetWidth / canvas.offsetHeight,
        0.1,
        1000,
    )
    camera.position.z = 20
    return camera
}
