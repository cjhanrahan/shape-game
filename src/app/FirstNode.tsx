'use client'

import NodeContainer from '@/graphics/NodeContainer'

export default function FirstNode() {
    return (
        <NodeContainer 
            height={window.innerHeight} 
            width={window.innerWidth} 
        />
    )
}