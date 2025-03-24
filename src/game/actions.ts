import { DebugData } from '@/graphics/SceneManager'
import { RandomGenerator } from './random'
import { AnswerSide, loadStateFromLocalStorageIfPresent, State } from './state'

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

export interface SetDebugDataAction {
    type: 'SET_DEBUG_DATA'
    side: AnswerSide
    debug: DebugData
}

export function setDebugDataAction(options: {
    side: AnswerSide
    debug: DebugData
}): SetDebugDataAction {
    return {
        type: 'SET_DEBUG_DATA',
        ...options,
    }
}

export interface SetDebugModeAction {
    type: 'SET_DEBUG_MODE'
    debugMode: boolean
}

export function setDebugModeAction(options: {
    debugMode: boolean
}): SetDebugModeAction {
    return {
        type: 'SET_DEBUG_MODE',
        debugMode: options.debugMode,
    }
}

export type ActionType =
    | AnswerAction
    | NewQuestionAction
    | InitializeStateAction
    | SetDebugDataAction
    | SetDebugModeAction
