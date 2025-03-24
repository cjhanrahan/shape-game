import { StateContext } from '@/app/AppContext'
import { AnswerSide } from '@/game/state'
import { useContext } from 'react'

export function DebugDisplay(props: { side: AnswerSide }) {
    const state = useContext(StateContext)
    const debugData = state.game[props.side].debug
    const showDebug = state.settings.debug && debugData
    return (
        showDebug && (
            <div>
                <div>x: {debugData.rotationX.toFixed(2)}</div>
                <div>y: {debugData.rotationY.toFixed(2)}</div>
                <div>z: {debugData.rotationZ.toFixed(2)}</div>
            </div>
        )
    )
}
