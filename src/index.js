import React from "react";

import ReactDOM from "react-dom";

import App from "./components/App/App.js";

var div = document.createElement("div")
div.setAttribute("id", "myDiv")
document.body.appendChild(div)

ReactDOM.render(<App />,div);
