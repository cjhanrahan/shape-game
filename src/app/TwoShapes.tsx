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


export default function TwoShapes() {
    const [mounted, setHasMounted] = useState(false)
    const initialState = getInitialState(Math.random())
    const [state, dispatch] = useReducer(gameReducer, initialState)
    const pickLeft = () => dispatch(answerAction('left'))
    const pickRight = () => dispatch(answerAction('right'))
    const newQuestion = () => dispatch(newQuestionAction())
    const overlayClass = classnames(
        styles.resultOverlay, 
        { [styles.hiddenOverlay]: state.result === null }
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
                            type={state.leftShape} 
                            volume={state.leftVolume} 
                            onPick={pickLeft} 
                            side="left"
                        />
                        <Shape 
                            type={state.rightShape} 
                            volume={state.rightVolume} 
                            onPick={pickRight} 
                            side="right"
                        />
                    </>
                )}
            </div>
        </div>
    )
}