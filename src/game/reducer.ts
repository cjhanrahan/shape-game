import { ShapeType } from '@/graphics/geometry'


export interface GameState {
    randomSeed: number
    leftVolume: number
    leftShape: ShapeType
    rightVolume: number
    rightShape: ShapeType
    lastResult: boolean | null
}

const initialState: GameState = {
    randomSeed: Math.random(),
    leftVolume: 1,
    leftShape: ShapeType.CUBE,
    rightVolume: 1.5,
    rightShape: ShapeType.PRISM,
    lastResult: null,
}

export type AnswerSide = 'left' | 'right'

export interface AnswerAction {
    type: 'ANSWER'
    payload: {
        side: AnswerSide
        newSeed: number
    }
}

export type ActionType = AnswerAction

export function answerAction(side: AnswerSide): AnswerAction {
    return {
        type: 'ANSWER',
        payload: {
            side,
            newSeed: Math.random(),
        }
    }
}

export function gameReducer(
    state: GameState = initialState, 
    action: ActionType
): GameState {
    switch (action.type) {
        case 'ANSWER':
            const leftWins = state.leftVolume > state.rightVolume
            const correct = action.payload.side === 'left' 
                ? leftWins 
                : !leftWins
            return {
                ...state,
                randomSeed: action.payload.newSeed,
                lastResult: correct,
            }
        default:
            return state
    }
}