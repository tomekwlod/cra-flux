import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from './HomePage';
import AboutPage from './AboutPage';
import CoursesPage from './CoursesPage';
import PageNotFound from './PageNotFound';

import Header from "./common/Header";

function App() {

  return (
    <div className="container-fluid">
      <Header />
      
      <Switch>
        <Route path="/" exact  component={HomePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/about"   component={AboutPage} />

        <Redirect from="/about-us" to="/about" />

        <Route                 component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;