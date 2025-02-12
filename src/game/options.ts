import { MaterialType } from '@/graphics/materials'

export interface Options {
    antialiasing: boolean
    materialType: MaterialType
    minAnswerDelta: number
    minVolume: number
    maxAnswerDelta: number
    maxVolume: number
    plane: boolean
}

export const defaultOptions: Options = {
    antialiasing: true,
    materialType: MaterialType.GRADIENT,
    minAnswerDelta: 0.1,
    minVolume: 10,
    maxAnswerDelta: 0.5,
    maxVolume: 100,
    plane: false,
}

export function getOptions() {
    return defaultOptions
}
