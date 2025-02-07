import './page.module.css'
import NodeContainer from '@/graphics/NodeContainer'

export default function Home() {
    return (
        <div id="container">
            {/* <h1>Shape Game!</h1> */}
            <NodeContainer />
            <NodeContainer />
        </div>
    )
}
