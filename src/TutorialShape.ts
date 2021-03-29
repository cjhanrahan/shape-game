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
export const ROOF_DIAMETER = 1
export const TESSELATIONS = 3

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

export const makeAxis = ({ name }: { name: string }) =>
    MeshBuilder.CreateCylinder(name, {
        diameter: 0.03,
        height: 5,
        tessellation: 5,
    })

export const makeAxes = () => {
    const x = makeAxis({ name: 'x' })
    x.rotation.z = Math.PI / 2
    const y = makeAxis({ name: 'y' })
    const z = makeAxis({ name: 'z' })
    z.rotation.x = Math.PI / 2
    return [x, y, z]
}

export const getRoofXOffset = () => {
    if (TESSELATIONS % 2 === 0) {
        return 0
    }
    const angle = (2 * Math.PI) / TESSELATIONS
    const slicesPerSide = Math.floor(TESSELATIONS / 2)
    const angleOfLeftmostPoint = slicesPerSide * angle
    const xValueOfLeftmostPoint =
        Math.cos(-angleOfLeftmostPoint) * (ROOF_DIAMETER / 2)
    const xAxisLength = ROOF_DIAMETER / 2 - xValueOfLeftmostPoint
    const offset = (ROOF_DIAMETER - xAxisLength) / 2
    console.log({ xValueOfLeftmostPoint, xAxisLength, offset })
    return offset
}

export const makeRoof = () => {
    const roof = MeshBuilder.CreateCylinder('roof', {
        diameter: ROOF_DIAMETER,
        height: ROOF_HEIGHT,
        tessellation: TESSELATIONS,
    })
    roof.position.x = -getRoofXOffset()
    roof.position.y = BOX_HEIGHT + ROOF_HEIGHT / 2
    // roof.rotation.z = Math.PI / 2
    return roof
}

export const main = () => {
    const canvas = getCanvas()
    const engine = new Engine(canvas, true)
    const scene = new Scene(engine)
    setupCamera({ canvas, scene })
    makeAxes()
    makeBox({ scene })
    makeGround()
    const roof = makeRoof()
    getRoofXOffset()
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
