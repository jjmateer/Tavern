import React, { Component } from "react";
import { loadUser } from "./actions/auth-actions";
import store from "./store";
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render(){
    return(
      <div>Tavern</div>
    )
  }
  
}

export default App;
