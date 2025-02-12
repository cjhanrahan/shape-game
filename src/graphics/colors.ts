export interface Color {
    hex: number
    name: string
    usedForSphere: boolean
}

export const Colors = {
    BISQUE: { hex: 0xffe4c4, name: 'Bisque', usedForSphere: true },
    BLACK: { hex: 0x000000, name: 'Black', usedForSphere: false },
    DARK_SLATE_GRAY: {
        hex: 0x2f4f4f,
        name: 'Dark Slate Gray',
        usedForSphere: false,
    },
    DARK_BLUE: { hex: 0x00008b, name: 'Dark Blue', usedForSphere: true },
    FOREST_GREEN: {
        hex: 0x228b22,
        name: 'Forest Green',
        usedForSphere: true,
    },
    LEMON_CHIFFON: {
        hex: 0xfffacd,
        name: 'Lemon Chiffon',
        usedForSphere: false,
    },
    LIGHT_SKY_BLUE: {
        hex: 0x87cefa,
        name: 'Light Sky Blue',
        usedForSphere: true,
    },
    LIGHT_YELLOW: {
        hex: 0xffffe0,
        name: 'Light Yellow',
        usedForSphere: false,
    },
    MEDIUM_SLATE_BLUE: {
        hex: 0x7b68ee,
        name: 'Medium Slate Blue',
        usedForSphere: true,
    },
    REBECCA_PURPLE: {
        hex: 0x663399,
        name: 'Rebecca Purple',
        usedForSphere: true,
    },
    SALMON: { hex: 0xfa8072, name: 'Salmon', usedForSphere: true },
    SEA_GREEN: { hex: 0x2e8b57, name: 'Sea Green', usedForSphere: true },
    TEAL: { hex: 0x008080, name: 'Teal', usedForSphere: true },
    TOMATO: { hex: 0xff6347, name: 'Tomato', usedForSphere: false },
    WHITE: { hex: 0xffffff, name: 'White', usedForSphere: false },
}

export type ColorName = keyof typeof Colors

export const sphereColors = Object.values(Colors).filter(
    (color) => color.usedForSphere,
)
