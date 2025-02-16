import { ColorObject } from '@/graphics/colors'
import { ShapeType } from '@/graphics/geometry'
import { defaultSettings, Settings } from './settings'
import {
    getRandomColor,
    getRandomLeftVolume,
    getRandomRightVolume,
    getRandomShape,
    RandomGenerator,
} from './random'

export interface ShapeState {
    color: ColorObject
    type: ShapeType
    volume: number
}

export function getDefaultShapeState(options: {
    generator: RandomGenerator
    leftVolume?: number
    minVolume: number
    maxVolume: number
    minAnswerDelta: number
    maxAnswerDelta: number
}): ShapeState {
    const { leftVolume, minVolume, maxVolume } = options
    return {
        color: getRandomColor(options),
        type: getRandomShape(options),
        volume: leftVolume
            ? getRandomRightVolume({
                  ...options,
                  leftVolume: leftVolume as number,
                  minVolume,
                  maxVolume,
              })
            : getRandomLeftVolume(options),
    }
}

export type AnswerSide = 'left' | 'right'

export interface GameState {
    left: ShapeState
    right: ShapeState
    guess: AnswerSide | null
    result: boolean | null
    streak: number
}

export interface State {
    game: GameState
    settings: Settings
}

export const getNewShapes = (options: {
    generator: RandomGenerator
    minVolume: number
    maxVolume: number
    minAnswerDelta: number
    maxAnswerDelta: number
}): { left: ShapeState; right: ShapeState } => {
    const left = getDefaultShapeState({
        generator: options.generator,
        minVolume: options.minVolume,
        maxVolume: options.maxVolume,
        minAnswerDelta: options.minAnswerDelta,
        maxAnswerDelta: options.maxAnswerDelta,
    })
    const right = getDefaultShapeState({
        generator: options.generator,
        leftVolume: left.volume,
        minVolume: options.minVolume,
        maxVolume: options.maxVolume,
        minAnswerDelta: options.minAnswerDelta,
        maxAnswerDelta: options.maxAnswerDelta,
    })
    return { left, right }
}

export const getDefaultGameState = (options: {
    generator: RandomGenerator
    minVolume: number
    maxVolume: number
    minAnswerDelta: number
    maxAnswerDelta: number
}): GameState => {
    return {
        ...getNewShapes(options),
        guess: null,
        result: null,
        streak: 0,
    }
}

export function getDefaultState(options: {
    generator: RandomGenerator
}): State {
    const settings = defaultSettings
    return {
        game: getDefaultGameState({
            generator: options.generator,
            minVolume: settings.minVolume,
            maxVolume: settings.maxVolume,
            minAnswerDelta: settings.minAnswerDelta,
            maxAnswerDelta: settings.maxAnswerDelta,
        }),
        settings,
    }
}

export function storeStateInLocalStorage(options: {
    state: State
    storage?: Storage
}) {
    const storage = options.storage || localStorage
    storage.setItem('state', JSON.stringify(options.state))
}

export function loadStateFromLocalStorageIfPresent(options: {
    generator: RandomGenerator
    storage?: Storage
}): State {
    const storage = options.storage || localStorage
    const state = storage.getItem('state')
    if (state) {
        return JSON.parse(state)
    }
    return getDefaultState(options)
}
