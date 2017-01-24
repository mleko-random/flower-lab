import * as React from "react";
import * as ReactDOM from "react-dom";
import {Storage} from "./src/component/Storage";

// Render a simple React component into the body.
let element = document.createElement("div");
document.getElementsByTagName("body")[0].appendChild(element);
ReactDOM.render(<Storage storageSize={6}/>, element);
