import { vi } from 'vitest'
import { RandomGenerator } from '@/game/random'

export function makeRandomMock(): RandomGenerator {
    return {
        choice: vi.fn(),
        int: vi.fn(),
        float: vi.fn()
    }
}