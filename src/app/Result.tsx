'use client'

import classnames from 'classnames'
import styles from './Result.module.css'
import { GameState } from '@/game/reducer'

export default function Result({ state }: { state: GameState }) {
    const resultString = state.result === true ? 'CORRECT' : 'WRONG'
    const resultModalClass = classnames(styles.resultModal, {
        [styles.correct]: state.result === true,
    })

    return (
        <>
            {state.result !== null && (
                <div className={resultModalClass}>
                    <h1>{resultString}</h1>
                    <div>Left volume was {state.leftVolume}</div>
                    <div>Right volume was {state.rightVolume}</div>
                </div>
            )}
        </>
    )
}
