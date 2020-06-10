import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import ChatPage from "./components/pages/ChatPage";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.css";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/chatpage" component={ChatPage} /> */}
      </Switch>
    </Router>
  );
}

export default App;
