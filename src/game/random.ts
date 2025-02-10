'use client'

import { Random } from 'random'
import { allShapes, ShapeType } from '@/graphics/geometry'
import { Config } from '@/app/config'
import { sphereColors } from '@/graphics/colors'


export enum SeedOffset {
    LEFT = 0,
    RIGHT = 1,
}

export interface RandomGenerator {
    choice<T>(array: T[]): T
    int(min: number, max: number): number
    float(min: number, max: number): number
}

export function makeSeededGenerator(seed: number): RandomGenerator {
    const random = new Random(seed)
    return {
        choice<T>(array: T[]) {
            if (!array.length) {
                throw new Error('Cannot choose from an empty array')
            }
            return random.choice(array) as T
        },
        int(min: number, max: number) {
            return random.int(min, max)
        },
        float(min: number, max: number) {
            return random.float(min, max)
        },
    }
}

export function getRandomShape(generator: RandomGenerator) {
    return generator.choice(allShapes) as ShapeType
}

export function getRandomColor(generator: RandomGenerator) {
    return generator.choice(sphereColors) as number
}

export function getRandomLeftVolume(generator: RandomGenerator) {
    return generator.int(10, 100)
}

export function getRandomRightVolume(
    generator: RandomGenerator,
    leftVolume: number,
) {
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
    const indexInCombinedRange = generator.int(0, combinedRangeLength - 1)
    console.log({
        smallestDistanceFromLeftVolume,
        deadZoneAroundLeftVolumeMin,
        deadZoneAroundLeftVolumeMax,
        leftVolume,
    })
    if (indexInCombinedRange < leftRangeLength) {
        console.log('result', leftRange[0] + indexInCombinedRange)
        return leftRange[0] + indexInCombinedRange
    } else {
        console.log(
            'result', 
            rightRange[0] + indexInCombinedRange - leftRangeLength
        )
        return rightRange[0] + indexInCombinedRange - leftRangeLength
    }
}