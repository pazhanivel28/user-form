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
import SetTimerCount from "./SetTimerCount";
import Comments from "./Comments";

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
            <li>
              <NavLink to="/SetTimerCount">Set Timer Count</NavLink>
            </li>
            <li>
              <NavLink to="/Comments">Nested Comments</NavLink>
            </li>
          </ul>
          <Switch>
            <Route exact path="/" component={LoadingContent} />
            <Route path="/UserForm" component={UserForm} />
            <Route path="/MCQpage" component={MCQpage} />
            <Route path="/SetTimerCount" component={SetTimerCount} />
            <Route path="/Comments" component={Comments} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
