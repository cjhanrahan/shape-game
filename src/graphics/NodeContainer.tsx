'use client'

import { useEffect, useRef } from 'react'
import { 
    appendSceneToNode,
} from './scene'

export default function NodeContainer(
    { width, height }: { width: number, height: number }
) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current) {
            appendSceneToNode(ref.current, height, width)
        }
    })

    return (
        <div className="node-container" ref={ref} />
    )
}