import { describe, it, expect } from 'vitest'
import { getRandomSideLength } from '../geometry'
import { makeRandomMock } from '@/test-utils/randomMock'


describe('getShape', () => {
    it('should generate random side lengths', () => {
        const sideLength = getRandomSideLength(makeRandomMock())
        expect(sideLength).toBeGreaterThanOrEqual(1)
        expect(sideLength).toBeLessThanOrEqual(5)
    })    
})