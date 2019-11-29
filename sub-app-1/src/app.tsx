import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Home = lazy(() => import("./components/home"));
const About = lazy(() => import("./components/about"));

export default function BasicExample() {
  return (
    <Router basename={(window as any).__POWERED_BY_QIANKUN__ ? "/react" : "/"}>
      <div>
        <ul>
          <li>
            <Link to="/">app1 Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <div
              onClick={() => {
                window.history.pushState({}, "subApp2", "/subApp2");
              }}
            >
              subApp2
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                window.history.pushState({}, "subApp2", "/subApp2/about");
              }}
            >
              subApp2
            </div>
          </li>
        </ul>

        <hr />
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/" component={Home} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
