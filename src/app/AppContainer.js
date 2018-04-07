import { connect } from 'react-redux'
import App from './AppComponent'

const mapStateToProps = ({ app }) => ({
    status: app.status,
})

export default connect(mapStateToProps)(App)
