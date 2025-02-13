import { Random } from 'random'
import { describe, expect, it } from 'vitest'
import {
    getPossibleValuesHigherThanLeftVolume,
    getPossibleValuesLowerThanLeftVolume,
    makeSeededGenerator,
    pickRandomValueInTwoRanges,
    RangeResult,
} from '../random'
import { makeRandomMock } from '@/test-utils/randomMock'

const TEST_SEED = 0.5

describe('random', () => {
    it('should create seeded genreators for use in application code', () => {
        // This random should match the behavior of the generator's
        // random since they have the same seed
        const random = new Random(TEST_SEED)
        const generator = makeSeededGenerator({ seed: TEST_SEED })
        // choice
        const sampleArrayForChoice = [1, 2, 3]
        const ourRandomChoice = random.choice(sampleArrayForChoice)
        const generatorRandomChoice = generator.choice(sampleArrayForChoice)
        expect(ourRandomChoice).toBe(generatorRandomChoice)
        // int
        const ourRandomInt = random.int(0, 10)
        const generatorRandomInt = generator.int(0, 10)
        expect(ourRandomInt).toBe(generatorRandomInt)
        // float
        const ourRandomFloat = random.float(0, 10)
        const generatorRandomFloat = generator.float(0, 10)
        expect(ourRandomFloat).toBe(generatorRandomFloat)
    })

    describe('computes random right volumes based on left volumes', () => {
        it('should return possible values lower than the left volume', () => {
            const testCases = [
                // use the answer delta
                {
                    leftVolume: 50,
                    minVolume: 10,
                    minAnswerDelta: 0.1,
                    maxAnswerDelta: 0.5,
                    expectedValue: [25, 45],
                },
                // answer delta is too large, using min delta
                {
                    leftVolume: 18,
                    minVolume: 13,
                    minAnswerDelta: 0.1,
                    maxAnswerDelta: 1,
                    expectedValue: [13, 16],
                },
                // min delta already exceeds min volume
                {
                    leftVolume: 20,
                    minVolume: 10,
                    minAnswerDelta: 0.8,
                    maxAnswerDelta: 1,
                    expectedValue: null,
                },
            ]
            for (const testCase of testCases) {
                const result = getPossibleValuesLowerThanLeftVolume(testCase)
                expect(result).toEqual(testCase.expectedValue)
            }
        })
    })

    it('should return possible values higher than the left volume', () => {
        const testCases = [
            // use the answer delta
            {
                leftVolume: 50,
                maxVolume: 1000,
                minAnswerDelta: 0.1,
                maxAnswerDelta: 0.5,
                expectedValue: [55, 75],
            },
            // answer delta is too large, using min delta
            {
                leftVolume: 18,
                maxVolume: 20,
                minAnswerDelta: 0.01,
                maxAnswerDelta: 1,
                expectedValue: [19, 20],
            },
            // min delta already exceeds max volume
            {
                leftVolume: 88,
                maxVolume: 90,
                minAnswerDelta: 0.1,
                maxAnswerDelta: 1,
                expectedValue: null,
            },
        ]
        for (const testCase of testCases) {
            const result = getPossibleValuesHigherThanLeftVolume(testCase)
            expect(result).toEqual(testCase.expectedValue)
        }
    })

    it('generates a random elemnt out of the two bounds', () => {
        const testCases = [
            // first arg has index
            {
                lowerRange: [1, 5],
                higherRange: [10, 15],
                expectedGenArgs: [0, 10],
                generatedIndex: 3,
                expectedValue: 4,
            },
            // second arg has index
            {
                lowerRange: [1, 3],
                higherRange: [10, 12],
                expectedGenArgs: [0, 5],
                generatedIndex: 3,
                expectedValue: 10,
            },
            // first range is null
            {
                lowerRange: null,
                higherRange: [10, 15],
                expectedGenArgs: [0, 5],
                generatedIndex: 1,
                expectedValue: 11,
            },
            // second range is null
            {
                lowerRange: [1, 5],
                higherRange: null,
                expectedGenArgs: [0, 4],
                generatedIndex: 3,
                expectedValue: 4,
            },
        ]
        for (const testCase of testCases) {
            const generator = makeRandomMock()
            generator.intMock.mockReturnValue(testCase.generatedIndex)
            const result = pickRandomValueInTwoRanges({
                lowerRange: testCase.lowerRange as RangeResult,
                higherRange: testCase.higherRange as RangeResult,
                generator,
            })
            expect(generator.int).toHaveBeenCalledWith(
                ...testCase.expectedGenArgs,
            )
            expect(result).toBe(testCase.expectedValue)
        }
    })
})
