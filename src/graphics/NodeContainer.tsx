'use client'

import { useEffect, useRef } from "react";

export default function NodeContainer({
    node,
}: Readonly<{
  node: Node;
}>) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.appendChild(node)
        }
    })

    return (
        <div className="node-container" ref={ref} />
    )
}