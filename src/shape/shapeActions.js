import { makeActionCreator } from '../app/appUtils'

export const updateShapeConfiguration = makeActionCreator(
    'UPDATE_SHAPE_CONFIGURATION',
    ['id', 'shape', 'volume', 'relativeDimensions'],
)
