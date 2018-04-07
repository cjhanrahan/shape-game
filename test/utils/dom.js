import indexString from '../../index.html'

const parser = new DOMParser()

export function setElementReadOnlyProperty(element, propertyName, value) {
    Object.defineProperty(element, propertyName, { value, writable: true })
}

export function setOffsetDimensions(element, offsetWidth, offsetHeight) {
    setElementReadOnlyProperty(element, 'offsetWidth', offsetWidth)
    setElementReadOnlyProperty(element, 'offsetHeight', offsetHeight)
}

export function getFakeDocument() {
    return parser.parseFromString(indexString, 'text/html')
}

export function getFakeWindow(sinon) {
    return {
        document: getFakeDocument(),
        addEventListener: sinon.spy(),
    }
}
