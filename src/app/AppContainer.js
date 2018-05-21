import { connect } from 'react-redux'
import App from './AppComponent'
import { getAllShapeIds } from '../shape/shapeSelectors'

const mapStateToProps = state => ({
    status: state.app.status,
    shapeIds: getAllShapeIds(state),
})

export default connect(mapStateToProps)(App)
