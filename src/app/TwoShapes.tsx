'use client'

import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
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
import { SceneConfig } from '@/graphics/scene'
import { makeSeededGenerator, RandomGenerator } from '@/game/random'

export default function TwoShapes({
    generator,
}: {
    generator?: RandomGenerator
}) {
    const gen = useRef(generator || makeSeededGenerator(Math.random())).current

    const [mounted, setHasMounted] = useState(false)

    const initialState = getInitialState(gen)
    const [state, dispatch] = useReducer(gameReducer, initialState)
    const pickLeft = () => dispatch(answerAction('left'))
    const pickRight = () => dispatch(answerAction('right'))
    const newQuestion = () => dispatch(newQuestionAction())

    const overlayClass = classnames(styles.resultOverlay, {
        [styles.hiddenOverlay]: state.result === null,
    })
    const leftSceneConfig: SceneConfig = useMemo(
        () => ({
            type: state.leftShape,
            volume: state.leftVolume,
            color: state.leftColor,
            generator: gen,
        }),
        [state.leftShape, state.leftVolume, state.leftColor, gen],
    )
    const rightSceneConfig: SceneConfig = useMemo(
        () => ({
            type: state.rightShape,
            volume: state.rightVolume,
            color: state.rightColor,
            generator: gen,
        }),
        [state.rightShape, state.rightVolume, state.rightColor, gen],
    )

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
                            sceneConfig={leftSceneConfig}
                            onPick={pickLeft}
                        />
                        <Shape
                            sceneConfig={rightSceneConfig}
                            onPick={pickRight}
                        />
                    </>
                )}
            </div>
        </div>
    )
}
