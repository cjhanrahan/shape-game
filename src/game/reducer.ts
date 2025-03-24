'use client'

import { ActionType } from './actions'
import { getNewShapes, State } from './state'

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
        case 'SET_DEBUG_DATA':
            return {
                ...state,
                game: {
                    ...state.game,
                    [action.side]: {
                        ...state.game[action.side],
                        debug: action.debug,
                    },
                },
            }
        case 'SET_DEBUG_MODE':
            return {
                ...state,
                settings: {
                    ...state.settings,
                    debug: action.debugMode,
                },
            }
        default:
            return state
    }
}
