import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

const getConfigs = state => state.shapes.shapeConfigurationsById
const getShapeId = (__, props) => props.shapeId
const getShapeModulesByName = (__, props) => props.shapeModulesByName

export const getAllShapeIds = createSelector(
    [getConfigs],
    configs => Object.keys(configs).sort()
)

export const getConfigByShapeId = createCachedSelector(
    [getConfigs, getShapeId],
    (configs, shapeId) => configs[shapeId],
)(
    getShapeId,
)

export const getModuleByShapeId = createCachedSelector(
    [getConfigByShapeId, getShapeModulesByName],
    (config, modules) => modules[config.shape]
)(
    getShapeId,
)

export const getGeometryByShapeId = createCachedSelector(
    [getConfigByShapeId, getModuleByShapeId],
    (config, shapeMod) => {
        const { getAbsoluteDimensions, getThreeGeometry } = shapeMod
        const absoluteDimensions = getAbsoluteDimensions(config.volume, config.relativeDimensions)
        return getThreeGeometry(absoluteDimensions)
    }
)(
    getShapeId,
)

export const getVolumeByShapeId = createCachedSelector(
    [getConfigByShapeId],
    config => config.volume
)(
    getShapeId,
)
