import { expect } from 'chai'
import {
    SphereGeometry,
    TetrahedronBufferGeometry,
} from 'three'
import {
    getAllShapeIds,
    getConfigByShapeId,
    getModuleByShapeId,
    getGeometryByShapeId,
    getVolumeByShapeId,
} from '../../src/shape/shapeSelectors'
import setupTest from '../utils/mocha'

describe('shapeSelectors', function () {
    setupTest()

    let state
    let shapeModulesByName
    let fakeSphere
    let fakeTetrahedron


    beforeEach(function () {
        shapeModulesByName = {
            sphere: {
                dimensions: [{ name: 'foo' }],
                getAbsoluteDimensions: this.sinon.stub(),
                getThreeGeometry: this.sinon.stub(),
            },
            tetrahedron: {
                dimensions: [{ name: 'bar' }],
                getAbsoluteDimensions: this.sinon.stub(),
                getThreeGeometry: this.sinon.stub(),
            },
        }
        const shapeConfiguration1 = {
            shape: 'sphere',
            volume: 3.4,
            relativeDimensions: { foo: 21.9 },
        }
        const shapeConfiguration2 = {
            shape: 'tetrahedron',
            volume: 7.9,
            relativeDimensions: { bar: 9 },
        }
        state = {
            shapes: {
                shapeConfigurationsById: {
                    foo: shapeConfiguration1,
                    bar: shapeConfiguration2,
                }
            }
        }
        fakeSphere = new SphereGeometry()
        fakeTetrahedron = new TetrahedronBufferGeometry()
        shapeModulesByName.sphere.getAbsoluteDimensions
            .withArgs(3.4, { foo: 21.9 })
            .returns({ foo: 1.3 })
        shapeModulesByName.sphere.getThreeGeometry
            .withArgs({ foo: 1.3 })
            .returns(fakeSphere)
        shapeModulesByName.tetrahedron.getAbsoluteDimensions
            .withArgs(7.9, { bar: 9 })
            .returns({ bar: 3 })
        shapeModulesByName.tetrahedron.getThreeGeometry
            .withArgs({ bar: 3 })
            .returns(fakeTetrahedron)
    })

    describe('getConfigByShapeId', function () {
        it('gets the config by shape id', function () {
            expect(getConfigByShapeId(state, { shapeId: 'foo' }))
                .to.equal(state.shapes.shapeConfigurationsById.foo)
        })
    })

    describe('getModuleByShapeId', function () {
        it('returns the shape module corresponding with the shape config', function () {
            const module = getModuleByShapeId(state, {
                shapeModulesByName,
                shapeId: 'bar',
            })
            expect(module).to.equal(shapeModulesByName.tetrahedron)
        })
    })

    describe('getGeometryByShapeId', function () {
        it('Returns the left and right shapes', function () {
            const props = {
                shapeModulesByName,
                shapeId: 'foo',
            }
            const geometry = getGeometryByShapeId(state, props)
            expect(geometry).to.equal(fakeSphere)
        })
    })

    describe('getAllShapeIds', function () {
        it('returns the sorted ids from the config object', function () {
            expect(getAllShapeIds(state)).to.deep.equal(['bar', 'foo'])
        })
    })

    describe('getVolumeByShapeId', function () {
        it('returns the right volume', function () {
            expect(getVolumeByShapeId(state, { shapeId: 'bar' })).to.equal(7.9)
        })
    })
})
