'use client'

import { makeSeededGenerator, RandomGenerator } from '@/game/random'
import { ActionType, gameReducer } from '@/game/reducer'
import {
    loadStateFromLocalStorageIfPresent,
    State,
    storeStateInLocalStorage,
} from '@/game/state'
import dynamic from 'next/dynamic'
import { createContext, Dispatch, useEffect, useReducer, useRef } from 'react'

export const StateContext = createContext<State>({} as State)
export const DispatchContext = createContext<Dispatch<ActionType>>(
    {} as Dispatch<ActionType>,
)
export const GeneratorContext = createContext<RandomGenerator>(
    {} as RandomGenerator,
)

export function AppContextImpl({ children }: { children: React.ReactNode }) {
    const generator = useRef(
        makeSeededGenerator({ seed: Math.random() }),
    ).current
    const initialState = loadStateFromLocalStorageIfPresent({
        generator,
    })
    const [state, dispatch] = useReducer(gameReducer, initialState)
    useEffect(() => {
        storeStateInLocalStorage({ state })
    }, [state])
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <GeneratorContext.Provider value={generator}>
                    {children}
                </GeneratorContext.Provider>
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

// Don't use SSR since this component needs a new random seed on
// each refresh of the page
export const AppContext = dynamic(() => Promise.resolve(AppContextImpl), {
    ssr: false,
})
