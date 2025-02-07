import { Random } from 'random'
import { allShapes } from '@/graphics/geometry'

export function getRandomShape(seed: number) {
    const random = new Random(seed)
    return random.choice(allShapes)
}

export function getRandomVolume(seed: number) {
    const random = new Random(seed)
    return random.float(1, 5)
}