import {
    ArcRotateCamera,
    Color3,
    Engine,
    HemisphericLight,
    Mesh,
    // HemisphericLight,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Texture,
    Vector3,
    Vector4,
} from '@babylonjs/core'

export const BOX_HEIGHT = 1
export const ROOF_CYL_HEIGHT = 1.2
export const ROOF_DIAMETER = 1.2
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
        30,
        Vector3.Zero(),
        scene,
    )
    camera.attachControl(canvas, true)
}

export interface MakeBoxArgs {
    scene: Scene
}
export const makeBox = ({ scene }: MakeBoxArgs) => {
    const faceUV = [
        new Vector4(0.5, 0, 0.75, 1),
        new Vector4(0, 0, 0.25, 1),
        new Vector4(0.25, 0, 0.5, 1),
        new Vector4(0.75, 0, 1, 1),
    ]
    const box = MeshBuilder.CreateBox(
        'box',
        {
            depth: 1,
            faceUV,
            height: BOX_HEIGHT,
            width: 1,
            wrap: true,
        },
        scene,
    )
    const material = new StandardMaterial('boxMat', scene)
    material.diffuseTexture = new Texture('assets/cubehouse.webp', scene)
    box.material = material
    box.position.y = BOX_HEIGHT / 2
    return box
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

export const makeAxis = ({ name }: { name: string }) =>
    MeshBuilder.CreateCylinder(name, {
        diameter: 0.03,
        height: 50,
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

export const getRoofXAxisLength = () => {
    const angle = (2 * Math.PI) / TESSELATIONS
    const slicesPerSide = Math.floor(TESSELATIONS / 2)
    const angleOfLeftmostPoint = slicesPerSide * angle
    const xValueOfLeftmostPoint =
        Math.cos(-angleOfLeftmostPoint) * (ROOF_DIAMETER / 2)
    const xAxisLength = ROOF_DIAMETER / 2 - xValueOfLeftmostPoint
    return xAxisLength
}

export const getRoofXOffset = () => (ROOF_DIAMETER - getRoofXAxisLength()) / 2

export const getFlippedRoofPosition = () => {}

export const makeRoof = ({ scene }: { scene: Scene }) => {
    const roof = MeshBuilder.CreateCylinder('roof', {
        diameter: ROOF_DIAMETER,
        height: ROOF_CYL_HEIGHT,
        tessellation: TESSELATIONS,
    })
    // roof.position.x = -getRoofXOffset()
    roof.position.y = BOX_HEIGHT + getRoofXOffset() * 2
    roof.rotation.z = Math.PI / 2
    const material = new StandardMaterial('roofMat', scene)
    material.diffuseTexture = new Texture(
        'https://api.creativecommons.engineering/v1/thumbs/b1c25412-203c-4219-9249-3b2336fbac44',
        scene,
    )
    roof.material = material
    return roof
}

export const makeHouse = ({ scene }: { scene: Scene }) => {
    const box = makeBox({ scene })
    const roof = makeRoof({ scene })
    const combined = Mesh.MergeMeshes(
        [box, roof],
        true,
        false,
        undefined,
        false,
        true,
    )
    if (!combined) {
        throw new Error("Couldn't combine roof and box")
    }
    return combined
}

export const makeCircleOfHouses = ({
    numberOfHouses,
    radius,
    scene,
}: {
    numberOfHouses: number
    radius: number
    scene: Scene
}) => {
    const initialHouse = makeHouse({ scene })
    const houses = [initialHouse]
    const angleDelta = (2 * Math.PI) / numberOfHouses
    for (let i = 0; i < numberOfHouses; i += 1) {
        const currentAngle = angleDelta * i
        const house = initialHouse.clone(`clonedHouse: ${i}`)
        house.position.x = Math.cos(currentAngle) * radius
        house.position.z = Math.sin(currentAngle) * radius
        house.rotation.y = -currentAngle
        console.log({ i, currentAngle, angleDelta, pos: house.position })
        houses.push(house)
    }
    // @ts-ignore
    window.houses = houses
    return houses
}

export const main = () => {
    const canvas = getCanvas()
    const engine = new Engine(canvas, true)
    const scene = new Scene(engine)
    setupCamera({ canvas, scene })
    makeAxes()
    makeGround({ scene })
    makeCircleOfHouses({ numberOfHouses: 18, radius: 10, scene })
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
