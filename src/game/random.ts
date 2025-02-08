'use client'

import { Random } from 'random'
import { allShapes, ShapeType } from '@/graphics/geometry'

export function getRandomShape(seed: number) {
    const random = new Random(seed)
    return random.choice(allShapes) as ShapeType
}

export function getRandomVolume(seed: number, notEqual?: number) {
    const random = new Random(seed)
    let volume = random.int(10, 100)
    while (notEqual && volume === notEqual) {
        volume = random.int(10, 100)
    }
    return volume
}