import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import getToken from './lib/tokens.js';
import { useStateWithLocalStorage } from './lib/hooks.js';
import Nav from './Nav.js';
import ShoppingList from './ShoppingList.js';
import ShoppingListForm from './ShoppingListForm.js';
import './App.css';

function App() {
  const [token, setToken] = useStateWithLocalStorage('userToken');

  const generateToken = () => {
    setToken(getToken());
  };

  return (
    <div className="App">
      <h1>Smart Shopping List</h1>

      <Router>
        <Switch>
          <Route path="/list">
            <ShoppingList />
          </Route>
          <Route path="/add-item">
            <ShoppingListForm />
          </Route>
        </Switch>

        {token ? (
          <Redirect to="/list" />
        ) : (
          <button onClick={generateToken}>Create New List</button>
        )}

        <Nav />
      </Router>
    </div>
  );
}

export default App;
