'use client'

import { useEffect, useRef } from 'react'
import styles from './Shape.module.css'
import { appendSceneToNode, ShapeConfig, ThreeJsConfig } from './scene'

export default function Shape(props: {
    sceneConfig: ShapeConfig
    onPick: () => void
    showVolume: boolean
}) {
    const { sceneConfig, onPick, showVolume } = props
    const ref = useRef<HTMLDivElement>(null)
    const clickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        onPick()
    }
    useEffect(() => {
        if (ref.current) {
            while (ref.current.firstChild) {
                ref.current.removeChild(ref.current.firstChild)
            }
            const threeJsConfig: ThreeJsConfig = {
                width: ref.current.clientWidth,
                height: ref.current.clientHeight,
            }
            appendSceneToNode(sceneConfig, threeJsConfig, ref.current)
        }
    }, [sceneConfig])

    return (
        <div className={styles.shapeContainer}>
            <div className={styles.shape}>
                <div className={styles.shapeThreeJsContainer} ref={ref} />
                <div className={styles.overlay}>
                    <div className={styles.upperOverlay}>
                        Shape: {sceneConfig.type.toString()}
                    </div>
                    <div className={styles.lowerOverlay}>
                        {showVolume && <div>Volume: {sceneConfig.volume}</div>}
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
