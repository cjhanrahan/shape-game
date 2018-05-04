import { expect } from 'chai'
import {
    SphereGeometry,
    TetrahedronBufferGeometry,
} from 'three'
import {
    makeGetThreeGeometries,
} from '../../src/shape/shapeSelectors'

describe('shapeSelector', function () {
    describe('makeGetThreeGeometries', function () {
        it('Returns the left and right selectors', function () {
            const shapeMap = new Map([
                [
                    'sphere',
                    {
                        dimensions: [{ name: 'foo' }],
                        getAbsoluteDimensions: this.sinon.stub(),
                        getThreeGeometry: this.sinon.stub(),
                    },
                ],
                [
                    'tetrahedron',
                    {
                        dimensions: [{ name: 'bar' }],
                        getAbsoluteDimensions: this.sinon.stub(),
                        getThreeGeometry: this.sinon.stub(),
                    },
                ],
            ])
            const leftShapeConfiguration = {
                shape: 'sphere',
                volume: 3.4,
                relativeDimensions: { foo: 21.9 },
            }
            const fakeSphere = new SphereGeometry()
            const fakeTetrahedron = new TetrahedronBufferGeometry()
            shapeMap.get('sphere').getAbsoluteDimensions
                .withArgs(3.4, { foo: 21.9 })
                .returns({ foo: 1.3 })
            shapeMap.get('sphere').getThreeGeometry
                .withArgs({ foo: 1.3 })
                .returns(fakeSphere)
            const rightShapeConfiguration = {
                shape: 'tetrahedron',
                volume: 7.9,
                relativeDimensions: { bar: 9 },
            }
            shapeMap.get('tetrahedron').getAbsoluteDimensions
                .withArgs(7.9, { bar: 9 })
                .returns({ bar: 3 })
            shapeMap.get('tetrahedron').getThreeGeometry
                .withArgs({ bar: 3 })
                .returns(fakeTetrahedron)

            const state = {
                shapes: { leftShapeConfiguration, rightShapeConfiguration }
            }
            const props = { shapeMap }
            const getThreeGeometries = makeGetThreeGeometries()
            const { leftGeometry, rightGeometry } = getThreeGeometries(state, props)
            expect(leftGeometry).to.equal(fakeSphere)
            expect(rightGeometry).to.equal(fakeTetrahedron)
        })
    })
})
