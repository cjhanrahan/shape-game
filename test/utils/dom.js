import indexString from '../../index.html'

const parser = new DOMParser()

export function setElementReadOnlyProperty(element, propertyName, value) {
    Object.defineProperty(element, propertyName, { value, writable: true })
}

export function setOffsetDimensions(element, offsetWidth, offsetHeight) {
    setElementReadOnlyProperty(element, 'offsetWidth', offsetWidth)
    setElementReadOnlyProperty(element, 'offsetHeight', offsetHeight)
}

export function getHtmlFragment(string) {
    const template = document.createElement('template')
    template.innerHTML = string.trim()
    return template.content.firstChild
}

export function getIndexFragment() {
    return getHtmlFragment(indexString)
}

export function getFakeDocument() {
    // const indexFragment = getIndexFragment()
    // return {
    //     body: indexFragment.querySelector('body'),
    //     querySelector: indexFragment.querySelector.bind(indexFragment),
    // }
    return parser.parseFromString(indexString, 'text/html')
}

export function getFakeWindow(sinon) {
    return {
        document: getFakeDocument(),
        addEventListener: sinon.spy(),
    }
}
