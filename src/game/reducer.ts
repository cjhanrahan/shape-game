'use client'

import { ShapeType } from '@/graphics/geometry'
import { 
    getRandomShape, 
    getRandomLeftVolume, 
    getRandomRightVolume 
} from './random'


export interface GameState {
    leftVolume: number
    leftShape: ShapeType
    rightVolume: number
    rightShape: ShapeType
    guess: AnswerSide | null
    result: boolean | null
}


export function getInitialState(initialSeed: number): GameState {
    const initialLeftVolume = getRandomLeftVolume(initialSeed)
    return {
        leftVolume: initialLeftVolume,
        leftShape: getRandomShape(initialSeed),
        rightVolume: getRandomRightVolume(initialSeed + 1, initialLeftVolume),
        rightShape: getRandomShape(initialSeed + 1),
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
            const leftVolume = getRandomLeftVolume(action.seed)
            return {
                ...state,
                leftVolume,
                leftShape: getRandomShape(action.seed),
                rightVolume: getRandomRightVolume(action.seed + 1, leftVolume),
                rightShape: getRandomShape(action.seed + 1),
                guess: null,
                result: null,
            }
        default:
            return state
    }
}