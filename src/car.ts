import {
    Color3,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Vector3,
} from '@babylonjs/core'
export const LEFT_X = -0.2
export const Z_INDEX_OF_FLAT_SIDE = -0.2
export const STRAIGHT_LINE_TO_ARC_TRANSITION_POINT_X = 0
export const RADIUS_OF_ARC = 0.2
export const DEPTH = 0.1
export const CAR_SEGMENTS = 20
export const WHEEL_RADIUS = 0.05
export const WHEEL_THICKNESS = 0.03
export const CAR_EDGE_TO_WHEEL_EDGE = 0.04

const lengthFromFlatToArc = STRAIGHT_LINE_TO_ARC_TRANSITION_POINT_X - LEFT_X
const rightX = lengthFromFlatToArc + RADIUS_OF_ARC

export const makeCarBody = ({ scene }: { scene: Scene }) => {
    const outline = [
        new Vector3(LEFT_X, 0, Z_INDEX_OF_FLAT_SIDE),
        new Vector3(
            STRAIGHT_LINE_TO_ARC_TRANSITION_POINT_X,
            0,
            Z_INDEX_OF_FLAT_SIDE,
        ),
    ]
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
    return car
}

export const makeWheels = ({
    carBody,
    scene,
}: {
    carBody: Mesh
    scene: Scene
}) => {
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
    wheelBackRight.position.x = LEFT_X + CAR_EDGE_TO_WHEEL_EDGE + WHEEL_RADIUS
    wheelBackRight.position.y = WHEEL_THICKNESS / 2
    wheelBackRight.position.z = Z_INDEX_OF_FLAT_SIDE
    wheelBackRight.parent = carBody
    const wheelBackLeft = wheelBackRight.clone('wheelBackLeft')
    wheelBackLeft.position.y = -DEPTH - WHEEL_THICKNESS / 2
    const wheelFrontRight = wheelBackRight.clone('wheelFrontRight')
    wheelFrontRight.position.x = rightX - WHEEL_RADIUS - CAR_EDGE_TO_WHEEL_EDGE
    const wheelFrontLeft = wheelBackLeft.clone('wheelFrontLeft')
    wheelFrontLeft.position.x = rightX - WHEEL_RADIUS - CAR_EDGE_TO_WHEEL_EDGE
}

export const makeCar = ({ scene }: { scene: Scene }) => {
    const carBody = makeCarBody({ scene })
    makeWheels({ carBody, scene })
    console.log({
        LEFT_X,
        lengthFromFlatToArc,
        RADIUS_OF_ARC,
        rightX,
        STRAIGHT_LINE_TO_ARC_TRANSITION_POINT_X,
    })
    return carBody
}
