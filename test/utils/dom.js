export function setElementReadOnlyProperty(element, propertyName, value) {
    Object.defineProperty(element, propertyName, { value, writable: true })
}

export function setOffsetDimensions(element, offsetWidth, offsetHeight) {
    setElementReadOnlyProperty(element, 'offsetWidth', offsetWidth)
    setElementReadOnlyProperty(element, 'offsetHeight', offsetHeight)
}
