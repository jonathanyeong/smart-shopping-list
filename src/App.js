import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import getToken from './lib/tokens.js';
import Nav from './Nav.js';
import ShoppingList from './ShoppingList.js';
import ShoppingListForm from './ShoppingListForm.js';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');

  useEffect(() => {
    localStorage.setItem('userToken', token);
  }, [token]);

  const generateToken = () => {
    setToken(getToken());
  };

  return (
    <div className="App">
      <h1>Smart Shopping List</h1>

      <Router>
        <Switch>
          <Route path="/list">
            {token ? <ShoppingList /> : <Redirect to="/" />}
          </Route>
          <Route path="/add-item">
            {token ? <ShoppingListForm /> : <Redirect to="/" />}
          </Route>
          <Route path="/">
            {token ? (
              <Redirect to="/list" />
            ) : (
              <button onClick={generateToken}>Create New List</button>
            )}
          </Route>
        </Switch>

        <Nav />
      </Router>
    </div>
  );
}

export default App;
