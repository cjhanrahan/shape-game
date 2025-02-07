'use client'

import { useEffect, useRef } from 'react'
import { 
    appendSceneToNode,
} from './scene'

export default function NodeContainer(
) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current) {
            appendSceneToNode(ref.current)
        }
    })

    return (
        <div className="node-container" ref={ref} />
    )
}