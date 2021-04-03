import test from 'ava'
import { getCanvas } from '../renderUtils'

test("getCanvas: looks up a canvas by id and returns it if it's there", t => {
    const fakeDocument = new Document()
    const correctCanvas = fakeDocument.createElement('canvas')
    correctCanvas.classList.add('foo')
    correctCanvas.dataset.position = '1'
    const wrongCanvas = fakeDocument.createElement('canvas')
    wrongCanvas.dataset.position = '2'
    fakeDocument.appendChild(correctCanvas)
    fakeDocument.appendChild(wrongCanvas)
    const result = getCanvas({ position: 1, _document: fakeDocument })
    t.false(result.classList.contains('foo'))
})
