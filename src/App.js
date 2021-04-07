import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav.js';
import ShoppingList from './ShoppingList.js';
import ShoppingListForm from './ShoppingListForm.js';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');

  useEffect(() => {
    localStorage.setItem('userToken', token);
  }, [token]);

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

        <Nav />
      </Router>
    </div>
  );
}

export default App;
