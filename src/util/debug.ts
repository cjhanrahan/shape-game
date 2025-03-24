// eslint-disable-next-line @typescript-eslint/no-explicit-any
const windowAny = window as any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveGlobal = (name: string, data: any) => {
    windowAny[name] = data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveInGlobalArray = (name: string, data: any) => {
    if (!windowAny[name]) {
        windowAny[name] = []
    }
    windowAny[name].push(data)
}
