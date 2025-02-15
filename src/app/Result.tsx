'use client'

import classnames from 'classnames'
import styles from './Result.module.css'
import { GameState } from '@/game/reducer'

export default function Result({ state }: { state: GameState }) {
    const resultString = state.result === true ? 'CORRECT' : 'WRONG'
    const resultModalClass = classnames(styles.resultModal, {
        [styles.correct]: state.result === true,
    })
    console.log('state', state)
    return (
        <>
            {state.result !== null && (
                <div className={resultModalClass}>
                    <h1 className={styles.resultTitle}>{resultString}</h1>
                    <p className={styles.streak}>
                        {state.streak ? `Streak: ${state.streak}` : null}
                    </p>
                    <p className={styles.continue}>Click to continue</p>
                </div>
            )}
        </>
    )
}
