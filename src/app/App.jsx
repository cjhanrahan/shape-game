import React from 'react'
import { arrayOf, func, object, objectOf, shape, string } from 'prop-types'
import ShapeWindowContainer from '../shape/ShapeWindowContainer'
import { shapeModulesByName as shapeModulesByNameFromConstants } from './constants'
import './app.scss'


const App = ({
    status,
    shapeIds,
    shapeModulesByName,
}) => (
    <div styleName="app" data-status={status}>
        {shapeIds.map(
            id => (
                <ShapeWindowContainer
                    shapeModulesByName={shapeModulesByName}
                    shapeId={id}
                    key={id}
                />
            )
        )}
        <div styleName="loading"><span>loading...</span></div>
    </div>
)

App.propTypes = {
    status: string.isRequired,
    shapeIds: arrayOf(string).isRequired,
    shapeModulesByName: objectOf(shape({
        dimensions: arrayOf(object).isRequired,
        getAbsoluteDimensions: func,
        getThreeGeometry: func.isRequired,
    })),
}

App.defaultProps = {
    shapeModulesByName: shapeModulesByNameFromConstants,
}

export default App
