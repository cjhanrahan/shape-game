import { vectorPoints } from './dataScratch'

export const realPoints = vectorPoints.filter(coords => {
    return coords[0] !== 0
})

const distanceFormula = ({ pt1, pt2 }: { pt1: number[]; pt2: number[] }) => {
    let sum = 0
    pt1.forEach((__, i) => {
        sum += pt1[i] ** 2 - pt2[i] ** 2
    })
    return Math.sqrt(sum)
}

const distanceToOrigin = ({ coords }: { coords: number[] }) =>
    distanceFormula({ pt1: coords, pt2: [0, 0, 0] })

export const distanceFromYAxis = ({ coords }: { coords: number[] }) =>
    distanceFormula({ pt1: coords, pt2: [coords[0], 0, coords[2]] })

export const mappedData = ({ points }: { points: number[][] }) =>
    points.map(coords => ({
        distanceFromCenter: distanceFromYAxis({ coords }),
        coords,
    }))

export const main = () => {
    console.log(mappedData({ points: realPoints }))
}
