'use client'

import { ShapeType } from '@/graphics/geometry'
import {
    getRandomShape,
    getRandomLeftVolume,
    getRandomRightVolume,
    getRandomColor,
    makeSeededGenerator,
    RandomGenerator,
} from './random'
import { getOptions } from './options'
import { ColorObject } from '@/graphics/colors'

export interface GameState {
    leftColor: ColorObject
    leftShape: ShapeType
    leftVolume: number
    rightColor: ColorObject
    rightVolume: number
    rightShape: ShapeType
    guess: AnswerSide | null
    result: boolean | null
    streak: number
}

export function getInitialState(options: {
    generator: RandomGenerator
    minVolume: number
    maxVolume: number
    minAnswerDelta: number
    maxAnswerDelta: number
}): GameState {
    const leftVolume = getRandomLeftVolume(options)
    return {
        leftColor: getRandomColor(options),
        leftVolume: leftVolume,
        leftShape: getRandomShape(options),
        rightColor: getRandomColor(options),
        rightVolume: getRandomRightVolume({
            ...options,
            leftVolume,
        }),
        rightShape: getRandomShape(options),
        guess: null,
        result: null,
        streak: 0,
    }
}

export type AnswerSide = 'left' | 'right'

export interface AnswerAction {
    type: 'ANSWER'
    side: AnswerSide
}

export function answerAction(options: { side: AnswerSide }): AnswerAction {
    return {
        type: 'ANSWER',
        side: options.side,
    }
}

export interface NewQuestionAction {
    type: 'NEW_QUESTION'
    seed: number
}

export function newQuestionAction(
    options: {
        seed?: number
    } = {},
): NewQuestionAction {
    return {
        type: 'NEW_QUESTION',
        seed: options.seed || Math.random(),
    }
}

export type ActionType = AnswerAction | NewQuestionAction

export function gameReducer(state: GameState, action: ActionType): GameState {
    switch (action.type) {
        case 'ANSWER':
            const leftWins = state.leftVolume > state.rightVolume
            const correct = action.side === 'left' ? leftWins : !leftWins
            const streak = correct ? state.streak + 1 : 0
            return {
                ...state,
                guess: action.side,
                result: correct,
                streak,
            }
        case 'NEW_QUESTION':
            const generator = makeSeededGenerator(action)
            const options = {
                ...getOptions(),
                generator,
            }
            return { ...getInitialState(options), streak: state.streak }
        default:
            return state
    }
}
