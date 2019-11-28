import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// import { loadUser } from "./actions/auth-actions";
import PublicRoute from "./components/routing-components/public-route";
// import PrivateRoute from "./components/routing-components/private-route";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NoMatch from "./pages/NoMatch";
import store from "./store";
import './App.css';

class App extends Component {
  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute exact path="/register" component={Register} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }

}

export default App;
