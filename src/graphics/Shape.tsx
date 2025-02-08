'use client'

import { useEffect, useRef } from 'react'
import styles from './Shape.module.css'
import { 
    appendSceneToNode,
} from './scene'
import { ShapeType } from './geometry'
import { AnswerSide } from '@/game/reducer'


export default function Shape(
    { 
        type, 
        side,
        volume, 
        color,
        onPick 
    }: { 
        type: ShapeType, 
        color: number
        side: AnswerSide,
        volume: number, 
        onPick: () => void 
    }
) {
    const ref = useRef<HTMLDivElement>(null)
    const clickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        onPick()
    }
    console.log({ type, side, volume })
    useEffect(() => {
        if (ref.current) {
            while (ref.current.firstChild) {
                ref.current.removeChild(ref.current.firstChild)
            }
            appendSceneToNode(ref.current, type, volume, color)
        }
    }, [type, volume, color])

    return (
        <div className={styles.shapeAndOverlay}>
            <div className={styles.overlay}>
                <div>{type.toString()}</div>
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