import fetch from "isomorphic-fetch";
import React from "react";
import ReactDOM from "react-dom";
import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  start
} from "qiankun";
import Framework from "./Framework";

function render({ appContent, loading }) {
  const container = document.getElementById("container");
  ReactDOM.render(
    <Framework loading={loading} content={appContent} />,
    container
  );
}

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}

render({ loading: true });

// support custom fetch see: https://github.com/kuitos/import-html-entry/blob/91d542e936a74408c6c8cd1c9eebc5a9f83a8dc0/src/index.js#L163
const request = url =>
  fetch(url, {
    referrerPolicy: "origin-when-cross-origin"
  });

registerMicroApps(
  [
    {
      name: "react app",
      entry: "//localhost:1024",
      render,
      activeRule: genActiveRule("/react")
    },
    {
      name: "sub app 2",
      entry: "//localhost:1025",
      render,
      activeRule: genActiveRule("/subApp2")
    }
  ],
  {
    beforeLoad: [
      app => {
        console.log("before load", app);
      }
    ],
    beforeMount: [
      app => {
        console.log("before mount", app);
      }
    ],
    afterUnmount: [
      app => {
        console.log("after unload", app);
      }
    ]
  },
  {
    fetch: request
  }
);

setDefaultMountApp("/react");
runAfterFirstMounted(() => console.info("first app mounted"));

start({ prefetch: false, fetch: request });
