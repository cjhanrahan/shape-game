import React from 'react'
import { string } from 'prop-types'
import Pyramid from '../components/Pyramid'
import './app.scss'

const App = ({ status }) => (
    <div className="app" data-status={status}>
        <Pyramid />
        <div className="loading"><span>loading...</span></div>
    </div>
)

App.propTypes = {
    status: string.isRequired,
}

export default App
