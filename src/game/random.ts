'use client'

import { Random } from 'random'
import { allShapes, ShapeType } from '@/graphics/geometry'
import { Config } from '@/app/config'

export function getRandomShape(seed: number) {
    const random = new Random(seed)
    return random.choice(allShapes) as ShapeType
}

export function getRandomLeftVolume(seed: number) {
    const random = new Random(seed)
    return random.int(10, 100)
}

export function getRandomRightVolume(seed: number, leftVolume: number) {
    const random = new Random(seed)

    // Areas within this range are too close to the left volume
    const smallestDistanceFromLeftVolume = Config.minAnswerDelta * leftVolume
    const deadZoneAroundLeftVolumeMin = Math.max(
        Config.minVolume, 
        Math.floor(leftVolume - smallestDistanceFromLeftVolume)
    )
    const deadZoneAroundLeftVolumeMax = Math.min(
        Config.maxVolume, 
        Math.ceil(leftVolume + smallestDistanceFromLeftVolume)
    )
   
    // These are as far as we can go from the left volume
    const biggestDistanceFromLeftVolume = Config.maxAnswerDelta * leftVolume
    const lowestPossibleVolume = Math.max(
        Config.minVolume, 
        Math.ceil(leftVolume - biggestDistanceFromLeftVolume)
    )
    const highestPossibleVolume = Math.min(
        Config.maxVolume, 
        Math.floor(leftVolume + biggestDistanceFromLeftVolume)
    )

    // The number must follow within these ranges
    const leftRange = [lowestPossibleVolume, deadZoneAroundLeftVolumeMin]
    const rightRange = [deadZoneAroundLeftVolumeMax, highestPossibleVolume]
    
    // We will pick a random number from the combined ranges,
    // then pick an index in either leftRange or rightRange
    const leftRangeLength = leftRange[1] - leftRange[0] + 1
    const rightRangeLength = rightRange[1] - rightRange[0] + 1
    const combinedRangeLength = leftRangeLength + rightRangeLength
    const indexInCombinedRange = random.int(0, combinedRangeLength - 1)
    if (indexInCombinedRange < leftRangeLength) {
        return leftRange[0] + indexInCombinedRange
    } else {
        return rightRange[0] + indexInCombinedRange - leftRangeLength
    }
}