'use client'

import { Random } from 'random'
import { allShapes, ShapeType } from '@/graphics/geometry'
import { Color, sphereColors } from '@/graphics/colors'

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

export function getRandomShape(options: { generator: RandomGenerator }) {
    return options.generator.choice(allShapes) as ShapeType
}

export function getRandomColor(options: { generator: RandomGenerator }) {
    const color = options.generator.choice(sphereColors) as Color
    return color
}

export type RangeResult = [number, number] | null

export function getRandomLeftVolume(options: {
    minVolume: number
    maxVolume: number
    generator: RandomGenerator
}) {
    const { minVolume, maxVolume, generator } = options
    return generator.int(minVolume, maxVolume)
}

// Get the set os possible right volumes which are lower than th
export function getPossibleValuesLowerThanLeftVolume(options: {
    leftVolume: number
    minVolume: number
    minAnswerDelta: number
    maxAnswerDelta: number
}): RangeResult {
    const { leftVolume, minVolume, minAnswerDelta, maxAnswerDelta } = options

    // based on hard limit for any volume at all
    const minVolFromConfig = minVolume
    // based on max percentage distance away from the left volume
    const minVolByAnswerDelta = Math.ceil(
        leftVolume - leftVolume * maxAnswerDelta,
    )
    const lowerBound = Math.max(minVolFromConfig, minVolByAnswerDelta)
    const upperBound = Math.floor(leftVolume - leftVolume * minAnswerDelta)
    return lowerBound < upperBound ? [lowerBound, upperBound] : null
}

export function getPossibleValuesHigherThanLeftVolume(options: {
    leftVolume: number
    maxVolume: number
    minAnswerDelta: number
    maxAnswerDelta: number
}): RangeResult {
    const { leftVolume, maxVolume, minAnswerDelta, maxAnswerDelta } = options

    // based on hard limit for any volume at all
    const maxVolFromConfig = maxVolume
    // based on max percentage distance away from the left volume
    const maxVolByAnswerDelta = Math.floor(
        leftVolume + leftVolume * maxAnswerDelta,
    )
    const lowerBound = Math.ceil(leftVolume + leftVolume * minAnswerDelta)
    const upperBound = Math.min(maxVolFromConfig, maxVolByAnswerDelta)
    return lowerBound < upperBound ? [lowerBound, upperBound] : null
}

export function pickRandomValueInTwoRanges(options: {
    lowerRange: RangeResult
    higherRange: RangeResult
    generator: RandomGenerator
}): number {
    const { lowerRange, higherRange, generator } = options
    const lowerRangeLength = lowerRange ? lowerRange[1] - lowerRange[0] + 1 : 0
    const higherRangeLength = higherRange
        ? higherRange[1] - higherRange[0] + 1
        : 0
    const totalIndicies = lowerRangeLength + higherRangeLength
    const randomIndex = generator.int(0, totalIndicies - 1)
    if (!lowerRange && !higherRange) {
        throw new Error('both ranges are null')
    }
    if (randomIndex < lowerRangeLength) {
        return lowerRange![0] + randomIndex
    } else {
        return higherRange![0] + randomIndex - lowerRangeLength
    }
}

export function getRandomRightVolume(options: {
    generator: RandomGenerator
    leftVolume: number
    minAnswerDelta: number
    maxAnswerDelta: number
    minVolume: number
    maxVolume: number
}) {
    const rangeBelowLeftVolume = getPossibleValuesLowerThanLeftVolume(options)
    const rangeAboveLeftVolume = getPossibleValuesHigherThanLeftVolume(options)
    return pickRandomValueInTwoRanges({
        lowerRange: rangeBelowLeftVolume,
        higherRange: rangeAboveLeftVolume,
        generator: options.generator,
    })
}
