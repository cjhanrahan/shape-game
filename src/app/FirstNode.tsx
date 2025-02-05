'use client'

import NodeContainer from "@/graphics/NodeContainer"
import { getRendererNode } from "@/graphics/threeTutorial"

export default function FirstNode() {
    return <NodeContainer node={getRendererNode()} />
}