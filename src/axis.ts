import { MeshBuilder } from '@babylonjs/core'

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
