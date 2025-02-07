'use client'

import { useEffect, useRef } from 'react'
import styles from './Shape.module.css'
import { 
    appendSceneToNode,
} from './scene'
import { ShapeType } from './geometry'


export default function Shape(
    { type, volume }: { type: ShapeType, volume: number }
) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current) {
            while (ref.current.firstChild) {
                ref.current.removeChild(ref.current.firstChild)
            }
            appendSceneToNode(ref.current, type, volume)
        }
    }, [type, volume])

    return (
        <div className={styles.shape}>
            <div className={styles.shapeThreeJsContainer} ref={ref} />
            <div className={styles.controls}>
                <input type="button" value="Choose shape" />
            </div>
        </div>
    )
}