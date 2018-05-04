import { connect } from 'react-redux'
import App from './AppComponent'
import { makeGetThreeGeometries } from '../shape/shapeSelectors'
import { shapeMap } from './constants'

const getMapStateToProps = () => {
    const getThreeGeometries = makeGetThreeGeometries()
    return (state) => {
        const { leftGeometry, rightGeometry } = getThreeGeometries(state, { shapeMap })
        return {
            status: state.app.status,
            leftGeometry,
            rightGeometry,
        }
    }
}

export default connect(getMapStateToProps)(App)
