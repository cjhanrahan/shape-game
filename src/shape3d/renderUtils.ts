import { ArcRotateCamera, Engine, Scene, Vector3 } from '@babylonjs/core'

export const getCanvas = ({
    position,
    _document = document,
}: {
    position: number
    _document: Document
}) => {
    const canvas = _document.querySelector(
        `canvas[data-position="${position}"]`,
    )
    if (!canvas) {
        throw new Error('canvas returned null')
    }
    return canvas
}

export const makeEngine = ({ canvas }: { canvas: HTMLCanvasElement }) =>
    new Engine(canvas, true)

export const makeScene = ({ engine }: { engine: Engine }) => new Scene(engine)

export const makeCamera = ({
    canvas,
    scene,
}: {
    canvas: HTMLCanvasElement
    scene: Scene
}) => {
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
