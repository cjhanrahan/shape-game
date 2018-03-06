import React from 'react'
import { BoxGeometry } from 'three'
// import { createSandbox } from 'sinon'
import Shape from '../../src/components/Shape'
import Cube from '../../src/components/Cube'
import { shallow } from '../utils/enzyme'

// const sandbox = createSandbox()

describe('Cube', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(
            <Cube
                sideLength={500}
                canvas={document.createElement('canvas')}
            />
        )
    })

    it('it\'s geometry is a Box with the given side length', () => {
        const geometry = wrapper.find(Shape).prop('geometry')
    }) 
})
