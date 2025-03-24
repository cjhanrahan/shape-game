import { MaterialType } from '@/graphics/materials'

export interface Settings {
    materialType: MaterialType
    minAnswerDelta: number
    minVolume: number
    maxAnswerDelta: number
    maxVolume: number
    plane: boolean
    debug: boolean
}

export const defaultSettings: Settings = {
    materialType: MaterialType.GRADIENT,
    minAnswerDelta: 0.1,
    minVolume: 10,
    maxAnswerDelta: 0.5,
    maxVolume: 100,
    plane: false,
    debug: false,
}
