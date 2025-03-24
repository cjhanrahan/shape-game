'use client'

import { useCallback, useContext, useEffect, useRef } from 'react'
import styles from './Shape.module.css'
import { ShapeType } from './geometry'
import { ColorObject } from './colors'
import { DispatchContext, GeneratorContext } from '@/app/AppContext'
import { MaterialType } from './materials'
import { DebugData, SceneManager } from './SceneManager'
import { AnswerSide } from '@/game/state'
import { setDebugDataAction } from '@/game/actions'
import { DebugDisplay } from './DebugDisplay'
import { saveInGlobalArray } from '@/util/debug'

export default function Shape(props: {
    side: AnswerSide
    color: ColorObject
    type: ShapeType
    volume: number
    materialType: MaterialType
    onPick: () => void
    showVolume: boolean
}) {
    const generator = useContext(GeneratorContext)
    const dispatch = useContext(DispatchContext)
    const { onPick, showVolume, color, type, volume, materialType, side } =
        props
    const ref = useRef<HTMLDivElement>(null)
    const clickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        onPick()
    }
    const debugFunction = useCallback(
        (debug: DebugData) => {
            dispatch(setDebugDataAction({ side, debug }))
        },
        [dispatch, side],
    )
    useEffect(() => {
        if (ref.current) {
            while (ref.current.firstChild) {
                ref.current.removeChild(ref.current.firstChild)
            }
            const sceneManager = new SceneManager({
                side,
                node: ref.current,
                volume,
                color,
                type,
                generator,
                materialType,
                debugFunction,
            })
            saveInGlobalArray('sceneManagers_' + side, {
                sceneManager,
                generator,
                side,
                color,
                type,
                volume,
                materialType,
                debugFunction,
            })
            return sceneManager.cleanUpScene
        }
    }, [generator, side, color, type, volume, materialType, debugFunction])

    return (
        <div className={styles.shapeContainer}>
            <div className={styles.shape}>
                <div className={styles.shapeThreeJsContainer} ref={ref} />
                <div className={styles.overlay}>
                    <div className={styles.upperOverlay}>
                        <div>Shape: {type.toString()}</div>
                        <div>Color: {color.name}</div>
                        <DebugDisplay side={side} />
                    </div>
                    <div className={styles.lowerOverlay}>
                        {showVolume && <div>Volume: {volume}</div>}
                    </div>
                </div>
            </div>
            <div className={styles.controls}>
                <div className={styles.button} onClick={clickHandler}>
                    Choose shape
                </div>
            </div>
        </div>
    )
}
