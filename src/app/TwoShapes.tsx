'use client'

import { useCallback, useContext } from 'react'
import styles from './TwoShapes.module.css'
import Shape from '@/graphics/Shape'
import classnames from 'classnames'
import { answerAction, newQuestionAction } from '@/game/reducer'
import Result from './Result'
import { DispatchContext, GeneratorContext, StateContext } from './AppContext'
import { MaterialType } from '@/graphics/materials'

export default function TwoShapes() {
    const state = useContext(StateContext)
    const dispatch = useContext(DispatchContext)
    const generator = useContext(GeneratorContext)
    const pickLeft = useCallback(
        () => dispatch(answerAction({ side: 'left' })),
        [dispatch],
    )
    const pickRight = useCallback(
        () => dispatch(answerAction({ side: 'right' })),
        [dispatch],
    )
    const newQuestion = useCallback(
        () => dispatch(newQuestionAction({ generator })),
        [dispatch, generator],
    )

    const overlayClass = classnames(styles.resultOverlay, {
        [styles.hiddenOverlay]: state.game.result === null,
    })
    return (
        <div className={styles.twoShapesAndOverlay}>
            <div className={overlayClass} onClick={newQuestion}>
                <Result />
            </div>
            <div className={styles.twoShapes}>
                <Shape
                    {...state.game.left}
                    onPick={pickLeft}
                    showVolume={state.game.result !== null}
                    materialType={MaterialType.GRADIENT}
                />
                <Shape
                    {...state.game.right}
                    onPick={pickRight}
                    showVolume={state.game.result !== null}
                    materialType={MaterialType.GRADIENT}
                />
            </div>
        </div>
    )
}
