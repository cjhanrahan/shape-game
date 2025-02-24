'use client'

import classnames from 'classnames'
import styles from './Result.module.css'
import { useContext } from 'react'
import { StateContext } from './AppContext'

export default function Result() {
    const state = useContext(StateContext)
    const resultString = state.game.result === true ? 'Correct' : 'Wrong'
    const resultModalClass = classnames(styles.resultModal, {
        [styles.correct]: state.game.result === true,
    })
    return (
        <>
            {state.game.result !== null && (
                <div className={resultModalClass}>
                    <h1 className={styles.resultTitle}>{resultString}</h1>
                    <p className={styles.streak}>
                        {state.game.streak
                            ? `Streak: ${state.game.streak}`
                            : null}
                    </p>
                    <p className={styles.continue}>Click to continue</p>
                </div>
            )}
        </>
    )
}
