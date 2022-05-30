import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ProfilePage from "./components/dashboard/ProfilePage";
import MatchPage from "./components/dashboard/MatchPage";
import PreferencePage from "./components/dashboard/PreferencePage";
import ChatPage from "./components/dashboard/ChatPage";

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/match" component={MatchPage} />
            <Route exact path="/preference" component={PreferencePage} />
            <Route exact path="/chat" component={ChatPage} />
          </div>
        </Router>
    );
  }
}

export default App;