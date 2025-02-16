'use client'

import { RandomGenerator } from './random'
import {
    AnswerSide,
    getNewShapes,
    loadStateFromLocalStorageIfPresent,
    State,
} from './state'

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
    generator: RandomGenerator
}

export function newQuestionAction(options: {
    generator: RandomGenerator
}): NewQuestionAction {
    return {
        type: 'NEW_QUESTION',
        generator: options.generator,
    }
}

export interface InitializeStateAction {
    type: 'INITIALIZE_STATE'
    state: State
}

export function initializeStateAction(options: {
    generator: RandomGenerator
}): InitializeStateAction {
    const state = loadStateFromLocalStorageIfPresent(options)
    return {
        type: 'INITIALIZE_STATE',
        state,
    }
}

export type ActionType =
    | AnswerAction
    | NewQuestionAction
    | InitializeStateAction

export function gameReducer(state: State, action: ActionType): State {
    switch (action.type) {
        case 'ANSWER':
            const leftWins = state.game.left.volume > state.game.right.volume
            const correct = action.side === 'left' ? leftWins : !leftWins
            const streak = correct ? state.game.streak + 1 : 0
            return {
                ...state,
                game: {
                    ...state.game,
                    guess: action.side,
                    result: correct,
                    streak,
                },
            }
        case 'NEW_QUESTION':
            return {
                ...state,
                game: {
                    ...state.game,
                    ...getNewShapes({
                        generator: action.generator,
                        ...state.settings,
                    }),
                    result: null,
                },
            }
        default:
            return state
    }
}
