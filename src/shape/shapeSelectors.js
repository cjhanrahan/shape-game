import { createSelector } from 'reselect'

const getLeftConfig = state => state.shapes.leftShapeConfiguration
const getRightConfig = state => state.shapes.rightShapeConfiguration
const getShapeMap = (__, props) => props.shapeMap

const makeGeometry = (config, map) => {
    const { getAbsoluteDimensions, getThreeGeometry } = map.get(config.shape)
    const absoluteDimensions = getAbsoluteDimensions(config.volume, config.relativeDimensions)
    return getThreeGeometry(absoluteDimensions)
}

const getLeftGeometrySelector = createSelector(
    [getLeftConfig, getShapeMap],
    (config, map) => makeGeometry(config, map)
)

const getRightGeometrySelector = createSelector(
    [getRightConfig, getShapeMap],
    (config, map) => makeGeometry(config, map)
)

export const makeGetThreeGeometries = () =>
    createSelector(
        [getLeftGeometrySelector, getRightGeometrySelector],
        (leftGeometry, rightGeometry) => ({ leftGeometry, rightGeometry })
    )
