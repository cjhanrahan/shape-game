'use client'

import { useEffect, useReducer, useState } from 'react'
import styles from './TwoShapes.module.css'
import Shape from '@/graphics/Shape'
import classnames from 'classnames'
import { 
    answerAction, 
    gameReducer, 
    getInitialState, 
    newQuestionAction 
} from '@/game/reducer'
import Result from './Result'
import { SceneConfig } from '@/graphics/scene'
import { makeSeededGenerator, RandomGenerator } from '@/game/random'


export default function TwoShapes({
    generator,
}: {
    generator?: RandomGenerator,
}) {
    const gen = generator || makeSeededGenerator(Math.random())

    const [mounted, setHasMounted] = useState(false)

    const initialState = getInitialState(gen)
    const [state, dispatch] = useReducer(gameReducer, initialState)
    const pickLeft = () => dispatch(answerAction('left'))
    const pickRight = () => dispatch(answerAction('right'))
    const newQuestion = () => dispatch(newQuestionAction())

    const overlayClass = classnames(
        styles.resultOverlay, 
        { [styles.hiddenOverlay]: state.result === null }
    )
    const leftSceneConfig: SceneConfig = {
        type: state.leftShape,
        volume: state.leftVolume,
        color: state.leftColor,
        generator: gen,
    }
    const rightSceneConfig: SceneConfig = {
        type: state.rightShape,
        volume: state.rightVolume,
        color: state.rightColor,
        generator: gen,
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