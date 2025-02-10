import { vi, Mock } from 'vitest'
import { RandomGenerator } from '@/game/random'

export interface MockRandomGenerator extends RandomGenerator {
    choiceMock: Mock
    intMock: Mock
    floatMock: Mock
}

export function makeRandomMock(): MockRandomGenerator {
    const choiceMock = vi.fn()
    const intMock = vi.fn()
    const floatMock = vi.fn()
    return {
        choice: choiceMock,
        int: intMock,
        float: floatMock,
        // use different types in tests and app code
        choiceMock,
        intMock,
        floatMock,
    }
}