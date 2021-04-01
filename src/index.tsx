import earcut from 'earcut'
import React from 'react'
import ReactDOM from 'react-dom'
import '../styles.css'
import { App } from './app/App'

// @ts-ignore
window.earcut = earcut

document.addEventListener('DOMContentLoaded', () => {})

ReactDOM.render(<App />, document.getElementById('root'))
