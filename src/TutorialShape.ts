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
        3,
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
        diameter: 0.01,
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
    return houses
}

const makeCar = ({ scene }: { scene: Scene }) => {
    const LEFT_X = -0.2
    const Z_INDEX_OF_FLAT_SIDE = -0.2
    const STRAIGHT_LINE_TO_ARC_TRANSITION_POINT_X = 0
    const RADIUS_OF_ARC = 0.2
    const DEPTH = 0.1
    const CAR_SEGMENTS = 20
    const WHEEL_RADIUS = 0.05
    const WHEEL_THICKNESS = 0.03
    const CAR_EDGE_TO_WHEEL_EDGE = 0.04
    const outline = [
        new Vector3(LEFT_X, 0, Z_INDEX_OF_FLAT_SIDE),
        new Vector3(
            STRAIGHT_LINE_TO_ARC_TRANSITION_POINT_X,
            0,
            Z_INDEX_OF_FLAT_SIDE,
        ),
    ]
    const lengthFromFlatToArc = STRAIGHT_LINE_TO_ARC_TRANSITION_POINT_X - LEFT_X
    const rightX = lengthFromFlatToArc + RADIUS_OF_ARC
    const angleDelta = Math.PI / 2 / CAR_SEGMENTS
    for (let i = 0; i < CAR_SEGMENTS; i += 1) {
        const angle = i * angleDelta
        const newPoint = new Vector3(
            RADIUS_OF_ARC * Math.cos(angle) + lengthFromFlatToArc,
            0,
            RADIUS_OF_ARC * Math.sin(angle) + Z_INDEX_OF_FLAT_SIDE,
        )
        outline.push(newPoint)
    }
    outline.push(new Vector3(LEFT_X, 0, Z_INDEX_OF_FLAT_SIDE + RADIUS_OF_ARC))
    const car = MeshBuilder.ExtrudePolygon(
        'car',
        {
            shape: outline,
            depth: DEPTH,
        },
        scene,
    )
    const carMaterial = new StandardMaterial('carMaterial', scene)
    carMaterial.diffuseColor = new Color3(0.7, 0, 0)
    car.material = carMaterial
    const wheelBackRight = MeshBuilder.CreateCylinder(
        'wheelBackRight',
        {
            diameter: 2 * WHEEL_RADIUS,
            height: WHEEL_THICKNESS,
        },
        scene,
    )
    const wheelMaterial = new StandardMaterial('wheelMaterial', scene)
    wheelMaterial.diffuseColor = new Color3(0.1, 0.11, 0.1)
    wheelBackRight.material = wheelMaterial
    wheelBackRight.parent = car
    wheelBackRight.position.x = LEFT_X + CAR_EDGE_TO_WHEEL_EDGE + WHEEL_RADIUS
    wheelBackRight.position.y = WHEEL_THICKNESS / 2
    wheelBackRight.position.z = Z_INDEX_OF_FLAT_SIDE
    const wheelBackLeft = wheelBackRight.clone('wheelBackLeft')
    wheelBackLeft.position.y = -DEPTH - WHEEL_THICKNESS / 2
    const wheelFrontRight = wheelBackRight.clone('wheelFrontRight')
    wheelFrontRight.position.x = rightX - WHEEL_RADIUS - CAR_EDGE_TO_WHEEL_EDGE
    const wheelFrontLeft = wheelBackLeft.clone('wheelFrontLeft')
    wheelFrontLeft.position.x = rightX - WHEEL_RADIUS - CAR_EDGE_TO_WHEEL_EDGE
    console.log({
        LEFT_X,
        lengthFromFlatToArc,
        RADIUS_OF_ARC,
        rightX,
        STRAIGHT_LINE_TO_ARC_TRANSITION_POINT_X,
    })
    return car
}

export const main = () => {
    const canvas = getCanvas()
    const engine = new Engine(canvas, true)
    const scene = new Scene(engine)
    setupCamera({ canvas, scene })
    makeAxes()
    // makeGround({ scene })
    makeCar({ scene })
    // makeCircleOfHouses({ numberOfHouses: 18, radius: 10, scene })
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
