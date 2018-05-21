import { connect } from 'react-redux'
import ShapeWindow from './ShapeWindowComponent'
import {
    getGeometryByShapeId,
    getVolumeByShapeId,
} from './shapeSelectors'

const mapStateToProps = (state, props) => ({
    geometry: getGeometryByShapeId(state, props),
    volume: getVolumeByShapeId(state, props)
})

export default connect(mapStateToProps)(ShapeWindow)
