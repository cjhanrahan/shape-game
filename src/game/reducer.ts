'use client'

import { ShapeType } from '@/graphics/geometry'
import { 
    getRandomShape, 
    getRandomLeftVolume, 
    getRandomRightVolume, 
    getRandomColor,
    makeSeededGenerator,
    RandomGenerator
} from './random'


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


export function getInitialState(
    generator: RandomGenerator,
    otherGenerator: RandomGenerator,
): GameState {
    const initialLeftVolume = getRandomLeftVolume(generator)
    return {
        leftColor: getRandomColor(generator),
        leftVolume: initialLeftVolume,
        leftShape: getRandomShape(generator),
        rightColor: getRandomColor(otherGenerator),
        rightVolume: getRandomRightVolume(otherGenerator, initialLeftVolume),
        rightShape: getRandomShape(otherGenerator),
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

export function gameReducer(
    state: GameState, 
    action: ActionType
): GameState {
    switch (action.type) {
        case 'ANSWER':
            const leftWins = state.leftVolume > state.rightVolume
            const correct = action.side === 'left' 
                ? leftWins 
                : !leftWins
            return {
                ...state,
                guess: action.side,
                result: correct,
            }
        case 'NEW_QUESTION':
            const generator = makeSeededGenerator(action.seed)
            const otherGenerator = makeSeededGenerator(action.seed + 1)
            const leftVolume = getRandomLeftVolume(generator)
            return {
                ...state,
                leftColor: getRandomColor(generator),
                leftVolume,
                leftShape: getRandomShape(generator),
                rightColor: getRandomColor(otherGenerator),
                rightVolume: getRandomRightVolume(otherGenerator, leftVolume),
                rightShape: getRandomShape(otherGenerator),
                guess: null,
                result: null,
            }
        default:
            return state
    }
}