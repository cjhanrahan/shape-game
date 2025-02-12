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

export interface GameState {
    leftColor: number
    leftShape: ShapeType
    leftVolume: number
    rightColor: number
    rightVolume: number
    rightShape: ShapeType
    guess: AnswerSide | null
    result: boolean | null
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
    }
}

export type AnswerSide = 'left' | 'right'

export interface AnswerAction {
    type: 'ANSWER'
    side: AnswerSide
}

export function answerAction(side: AnswerSide): AnswerAction {
    return {
        type: 'ANSWER',
        side,
    }
}

export interface NewQuestionAction {
    type: 'NEW_QUESTION'
    seed: number
}

export function newQuestionAction(seed?: number): NewQuestionAction {
    return {
        type: 'NEW_QUESTION',
        seed: seed || Math.random(),
    }
}

export type ActionType = AnswerAction | NewQuestionAction

export function gameReducer(state: GameState, action: ActionType): GameState {
    switch (action.type) {
        case 'ANSWER':
            const leftWins = state.leftVolume > state.rightVolume
            const correct = action.side === 'left' ? leftWins : !leftWins
            return {
                ...state,
                guess: action.side,
                result: correct,
            }
        case 'NEW_QUESTION':
            const generator = makeSeededGenerator(action.seed)
            const options = {
                ...getOptions(),
                generator,
            }
            return getInitialState(options)
        default:
            return state
    }
}
