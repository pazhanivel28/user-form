import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import UserForm from "./UserForm";
import LoadingContent from "./LoadingContent";
import MCQpage from "./MCQpage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <Router>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/UserForm">USER FORM</NavLink>
            </li>
            <li>
              <NavLink to="/MCQpage">MCQ Qestion</NavLink>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={LoadingContent} />
            <Route path="/UserForm" component={UserForm} />
            <Route path="/MCQpage" component={MCQpage} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
