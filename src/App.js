import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Pages
import Home from "./Page/Home/Home";
import About from "./Page/About/About";

function App(){
  return(
    <Router>
      <Switch>
        {/* Higher Order Component */}
        <Route path="/" component={Home} exact/>
        <Route path="/about" component={About} />
        <Route render={() => 404} />
      </Switch>
    </Router>
  )
}

export default App;