"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const renderUtils_1 = require("../renderUtils");
ava_1.default("getCanvas: looks up a canvas by id and returns it if it's there", t => {
    const fakeDocument = new Document();
    const correctCanvas = fakeDocument.createElement('canvas');
    correctCanvas.classList.add('foo');
    correctCanvas.dataset.position = '1';
    const wrongCanvas = fakeDocument.createElement('canvas');
    wrongCanvas.dataset.position = '2';
    fakeDocument.appendChild(correctCanvas);
    fakeDocument.appendChild(wrongCanvas);
    const result = renderUtils_1.getCanvas({ position: 1, _document: fakeDocument });
    t.false(result.classList.contains('foo'));
});
//# sourceMappingURL=renderUtilsTest.js.map