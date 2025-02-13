'use client'

import { useEffect, useReducer, useRef, useState } from 'react'
import styles from './TwoShapes.module.css'
import Shape from '@/graphics/Shape'
import classnames from 'classnames'
import {
    answerAction,
    gameReducer,
    getInitialState,
    newQuestionAction,
} from '@/game/reducer'
import Result from './Result'
import { makeSeededGenerator, RandomGenerator } from '@/game/random'
import { getOptions } from '@/game/options'

export default function TwoShapes({
    generator,
}: {
    generator?: RandomGenerator
}) {
    const gen = useRef(
        generator || makeSeededGenerator({ seed: Math.random() }),
    ).current

    const [mounted, setHasMounted] = useState(false)

    const initialState = getInitialState({
        ...getOptions(),
        generator: gen,
    })
    const [state, dispatch] = useReducer(gameReducer, initialState)
    const pickLeft = () => dispatch(answerAction({ side: 'left' }))
    const pickRight = () => dispatch(answerAction({ side: 'right' }))
    const newQuestion = () => dispatch(newQuestionAction())

    const overlayClass = classnames(styles.resultOverlay, {
        [styles.hiddenOverlay]: state.result === null,
    })
    const leftData = {
        type: state.leftShape,
        volume: state.leftVolume,
        color: state.leftColor,
    }
    const rightData = {
        type: state.rightShape,
        volume: state.rightVolume,
        color: state.rightColor,
    }
    useEffect(() => {
        setHasMounted(true)
    }, [])
    return (
        <div className={styles.twoShapesAndOverlay}>
            <div className={overlayClass} onClick={newQuestion}>
                <Result state={state} />
            </div>
            <div className={styles.twoShapes}>
                {mounted && (
                    <>
                        <Shape
                            {...leftData}
                            generator={gen}
                            onPick={pickLeft}
                            showVolume={state.result !== null}
                        />
                        <Shape
                            {...rightData}
                            generator={gen}
                            onPick={pickRight}
                            showVolume={state.result !== null}
                        />
                    </>
                )}
            </div>
        </div>
    )
}
