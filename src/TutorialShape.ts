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

export interface MakeBoxArgs {
    scene: Scene
}
export const makeBox = ({ scene }: MakeBoxArgs) => {
    const box = MeshBuilder.CreateBox(
        'box',
        {
            height: BOX_HEIGHT,
        },
        scene
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

export const main = () => {
    const canvas = document.querySelector('canvas')
    const engine = new Engine(canvas, true)
    const scene = new Scene(engine)
    const camera = new ArcRotateCamera(
        'Camera',
        -Math.PI / 2,
        Math.PI / 2.5,
        3,
        Vector3.Zero(),
        scene
    )
    camera.attachControl(canvas, true)
    makeBox({ scene })
    makeGround()
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
