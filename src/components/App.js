import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Popular from './Popular';
import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';

class App extends Component {
  render() {
    return (
      <Router>
      <div className='container'>
        <Nav/>
        <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/battle' component={Battle}/>
        <Route path='/popular' component={Popular}/>
        <Route render={()=>{
            return <p>Not found.</p>
          }} />
        </Switch>
      </div>
      </Router>
    )
  }
}

export default App;
