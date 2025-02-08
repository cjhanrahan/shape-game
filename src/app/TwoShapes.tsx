'use client'

import { useReducer } from 'react'
import styles from './TwoShapes.module.css'
import Shape from '@/graphics/Shape'
import classnames from 'classnames'
import { answerAction, gameReducer, getInitialState } from '@/game/reducer'
import Result from './Result'

const initialState = getInitialState()

export default function TwoShapes() {
    const [state, dispatch] = useReducer(gameReducer, initialState)
    const pickLeft = () => dispatch(answerAction('left'))
    const pickRight = () => dispatch(answerAction('right'))
    const overlayClass = classnames(
        styles.resultOverlay, 
        { [styles.hiddenOverlay]: state.result === null }
    )
    return (
        <div className={styles.twoShapesAndOverlay}>
            <div className={overlayClass}>
                <Result state={state} />
            </div>
            <div className={styles.twoShapes}>
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
            </div>
        </div>
    )
}