import {
    ArcRotateCamera,
    Color3,
    Engine,
    HemisphericLight,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Vector3,
} from '@babylonjs/core'
import * as axis from './axis'
import * as car from './car'
// import * as house from './house'

export interface SetupCameraArgs {
    canvas: HTMLCanvasElement
    scene: Scene
}

const getCanvas = () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) {
        throw new Error('canvas returned null')
    }
    return canvas
}

const setupCamera = ({ canvas, scene }: SetupCameraArgs) => {
    const camera = new ArcRotateCamera(
        'Camera',
        -Math.PI / 2,
        Math.PI / 2.5,
        3,
        Vector3.Zero(),
        scene,
    )
    camera.attachControl(canvas, true)
}

export const makeGround = ({ scene }: { scene: Scene }) => {
    const ground = MeshBuilder.CreateGround('ground', {
        width: 30,
        height: 30,
    })
    const material = new StandardMaterial('groundMat', scene)
    material.diffuseColor = new Color3(0, 0.5, 0)
    ground.material = material
    return ground
}

export const main = () => {
    const canvas = getCanvas()
    const engine = new Engine(canvas, true)
    const scene = new Scene(engine)
    setupCamera({ canvas, scene })
    axis.makeAxes()
    car.makeCar({ scene })
    new HemisphericLight('light1', new Vector3(1, 1, 0), scene)
    window.addEventListener('keydown', e => {
        if (e.keyCode === 73) {
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide()
            } else {
                scene.debugLayer.show()
            }
        }
    })

    engine.runRenderLoop(() => {
        scene.render()
        // roof.rotation.z += 0.01
    })

    window.addEventListener('resize', () => {
        engine.resize()
    })
}
