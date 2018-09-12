import React, { Component } from 'react';
import MovieBrowser from './containers/MovieBrowser';
import { Switch, Route } from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import  {Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './App.css';
import MovieDetail from "./components/MovieDetail";
class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>
                            Home
                         </Link>
                    </Navbar.Brand>
                </Navbar.Header>

            </Navbar>
          <Switch>
            <Route exact path="/" component={MovieBrowser} />
            <Route path="/:id" component={MovieDetail} />
          </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
