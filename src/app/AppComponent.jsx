import React from 'react'
import { string } from 'prop-types'
import Pyramid from '../components/Pyramid'

const App = ({ status }) => (
    <div className="app" data-status={status}>
        <Pyramid />
    </div>
)

App.propTypes = {
    status: string.isRequired,
}

export default App
