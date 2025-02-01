"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const earcut_1 = __importDefault(require("earcut"));
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
require("../styles.css");
const App_1 = require("./app/App");
// @ts-ignore
window.earcut = earcut_1.default;
document.addEventListener('DOMContentLoaded', () => { });
react_dom_1.default.render(react_1.default.createElement(App_1.App, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map