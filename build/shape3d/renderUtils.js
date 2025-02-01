"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCamera = exports.makeScene = exports.makeEngine = exports.getCanvas = void 0;
const core_1 = require("@babylonjs/core");
const getCanvas = ({ position, _document = document, }) => {
    const canvas = _document.querySelector(`canvas[data-position="${position}"]`);
    if (!canvas) {
        throw new Error('canvas returned null');
    }
    return canvas;
};
exports.getCanvas = getCanvas;
const makeEngine = ({ canvas }) => new core_1.Engine(canvas, true);
exports.makeEngine = makeEngine;
const makeScene = ({ engine }) => new core_1.Scene(engine);
exports.makeScene = makeScene;
const makeCamera = ({ canvas, scene, }) => {
    const camera = new core_1.ArcRotateCamera('Camera', -Math.PI / 2, Math.PI / 2.5, 3, core_1.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
};
exports.makeCamera = makeCamera;
//# sourceMappingURL=renderUtils.js.map