'use client'

import { useEffect, useRef } from 'react'
import styles from './Shape.module.css'
import { appendSceneToNode } from './scene'
import { ShapeType } from './geometry'
import { RandomGenerator } from '@/game/random'
import { ColorObject } from './colors'

export default function Shape(props: {
    color: ColorObject
    type: ShapeType
    volume: number
    generator: RandomGenerator
    onPick: () => void
    showVolume: boolean
}) {
    const { onPick, showVolume, color, type, generator, volume } = props
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
            const cleanUpFunction = appendSceneToNode({
                generator,
                volume,
                color,
                type,
                node: ref.current,
            })
            return cleanUpFunction
        }
    }, [generator, color, type, volume])

    return (
        <div className={styles.shapeContainer}>
            <div className={styles.shape}>
                <div className={styles.shapeThreeJsContainer} ref={ref} />
                <div className={styles.overlay}>
                    <div className={styles.upperOverlay}>
                        <div>Shape: {type.toString()}</div>
                        <div>Color: {color.name}</div>
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
