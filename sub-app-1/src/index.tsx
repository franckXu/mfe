import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import * as serviceWorker from "./serviceWorker";

if ((window as any).__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  console.log(
    (window as any).__webpack_public_path__,
    (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  );
  (window as any).__webpack_public_path__ = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  console.log(
    (window as any).__webpack_public_path__,
    (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  );
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("sub app 1 bootstrap");
}

export async function mount() {
  render();
}

export async function unmount() {
  console.log("unomout in subApp1");
  const el = document.querySelector("#root");
  el && ReactDOM.unmountComponentAtNode(el);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
