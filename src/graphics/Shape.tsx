'use client'

import { useContext, useEffect, useRef } from 'react'
import styles from './Shape.module.css'
import { appendSceneToNode } from './scene'
import { ShapeType } from './geometry'
import { ColorObject } from './colors'
import { GeneratorContext } from '@/app/AppContext'
import { MaterialType } from './materials'

export default function Shape(props: {
    color: ColorObject
    type: ShapeType
    volume: number
    materialType: MaterialType
    onPick: () => void
    showVolume: boolean
}) {
    const generator = useContext(GeneratorContext)
    const { onPick, showVolume, color, type, volume, materialType } = props
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
                materialType,
                color,
                type,
                node: ref.current,
            })
            return cleanUpFunction
        }
    }, [generator, color, type, volume, materialType])

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
