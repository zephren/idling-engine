import ReactDOM from "react-dom";
import App from "./App";
import "./styles/style.css";
import * as craftjs from "@craftjs/core";
import * as core from "./core";

(window as any)["idlingEngineCore"] = core;
(window as any)["craftjs"] = craftjs;

ReactDOM.render(<App />, document.getElementById("root"));

// import reportWebVitals from "./reportWebVitals";
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
