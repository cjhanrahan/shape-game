import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    // HemisphericLight,
    MeshBuilder,
    Scene,
    Vector3,
} from '@babylonjs/core'

export const BOX_HEIGHT = 1
export const ROOF_HEIGHT = 1

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
        6,
        Vector3.Zero(),
        scene,
    )
    camera.attachControl(canvas, true)
}

export interface MakeBoxArgs {
    scene: Scene
}
export const makeBox = ({ scene }: MakeBoxArgs) => {
    const box = MeshBuilder.CreateBox(
        'box',
        {
            height: BOX_HEIGHT,
            width: 1,
            depth: 1,
        },
        scene,
    )
    box.position.y = BOX_HEIGHT / 2
}

export const makeGround = () => {
    const ground = MeshBuilder.CreateGround('ground', {
        width: 2,
        height: 3,
    })
    return ground
}

export const makeRoof = () => {
    const roof = MeshBuilder.CreateCylinder('roof', {
        diameter: 1,
        height: ROOF_HEIGHT,
        tessellation: 3,
    })
    roof.position.y = BOX_HEIGHT + ROOF_HEIGHT / 2
    // roof.rotation.z = Math.PI / 2
    return roof
}

export const main = () => {
    const canvas = getCanvas()
    const engine = new Engine(canvas, true)
    const scene = new Scene(engine)
    setupCamera({ canvas, scene })
    makeBox({ scene })
    makeGround()
    makeRoof()
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
    })

    window.addEventListener('resize', () => {
        engine.resize()
    })
}
