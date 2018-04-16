import { makeActionCreator } from '../app/appUtils'

export const updateShapeConfiguration = makeActionCreator(
    'UPDATE_SHAPE_CONFIGURATION',
    ['side', 'shape', 'volume', 'relativeDimensions'],
)
