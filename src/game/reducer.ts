import { ShapeType } from '@/graphics/geometry'
import { getRandomShape, getRandomVolume } from './random'


export interface GameState {
    leftVolume: number
    leftShape: ShapeType
    rightVolume: number
    rightShape: ShapeType
    guess: 'left' | 'right' | null
    result: boolean | null
}

const initialSeed = Math.random()
const initialLeftVolume = getRandomVolume(initialSeed)

const initialState: GameState = {
    leftVolume: initialLeftVolume,
    leftShape: getRandomShape(initialSeed),
    rightVolume: getRandomVolume(initialSeed + 1, initialLeftVolume),
    rightShape: getRandomShape(initialSeed + 1),
    guess: null,
    result: null,
}

export type AnswerSide = 'left' | 'right'

export interface AnswerAction {
    type: 'ANSWER'
    side: AnswerSide
}

export type ActionType = AnswerAction

export function answerAction(side: AnswerSide): AnswerAction {
    return {
        type: 'ANSWER',
        side,
    }
}

export function gameReducer(
    state: GameState = initialState, 
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
        default:
            return state
    }
}