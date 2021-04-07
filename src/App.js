import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import ShoppingList from './ShoppingList.js';
import ShoppingListForm from './ShoppingListForm.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/list">
            <ShoppingList />
          </Route>
          <Route path="/add-item">
            <ShoppingListForm />
          </Route>
          <Route path="/">
            <ShoppingList />
          </Route>
        </Switch>

        <nav>
          <ul>
            <li>
              <NavLink
                to="/list"
                activeStyle={{ fontWeight: 'bold' }}
                isActive={(match, { pathname }) =>
                  ['/', '/list'].includes(pathname)
                }
              >
                List
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-item" activeStyle={{ fontWeight: 'bold' }}>
                Add Item
              </NavLink>
            </li>
          </ul>
        </nav>
      </Router>
    </div>
  );
}

export default App;
