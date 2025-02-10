'use client'

import { useEffect, useRef } from 'react'
import styles from './Shape.module.css'
import { appendSceneToNode, SceneConfig, ThreeJsConfig } from './scene'

export default function Shape({
    sceneConfig,
    onPick,
}: {
    sceneConfig: SceneConfig
    onPick: () => void
}) {
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
        <div className={styles.shapeAndOverlay}>
            <div className={styles.overlay}>
                <div>{sceneConfig.type.toString()}</div>
            </div>
            <div className={styles.shape}>
                <div className={styles.shapeThreeJsContainer} ref={ref} />
                <div className={styles.controls}>
                    <input
                        type="button"
                        value="Choose shape"
                        onClick={clickHandler}
                    />
                </div>
            </div>
        </div>
    )
}
