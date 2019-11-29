import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Home = lazy(() => import("./components/home"));
const About = lazy(() => import("./components/about"));

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router
      basename={(window as any).__POWERED_BY_QIANKUN__ ? "/subApp2" : "/"}
    >
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <div
              onClick={() => window.history.pushState({}, "react", "/react")}
            >
              react
            </div>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
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

// You can think of these components as "pages"
// in your app.

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
