import * as React from "react";
import * as ReactDOM from "react-dom";

import "es6-shim";

import {Game} from "./src/component/Game";
import {GameContainer} from "./src/container/GameContainer/index";

// Render a simple React component into the body.
let element = document.createElement("div");
document.getElementsByTagName("body")[0].appendChild(element);
ReactDOM.render(<GameContainer/>, element);
