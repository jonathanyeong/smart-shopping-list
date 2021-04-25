import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { db } from './lib/firebase.js';
import getToken from './lib/tokens.js';
import Nav from './Nav.js';
import ShoppingList from './ShoppingList.js';
import ShoppingListForm from './ShoppingListForm.js';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');
  const [joinToken, setJoinToken] = useState('');

  useEffect(() => {
    localStorage.setItem('userToken', token);
    if (token.length > 0) {
      db.collection('tokens').add({
        token: token,
      });
    }
  }, [token]);

  const generateToken = () => {
    setToken(getToken());
  };

  const handleJoinList = (event) => {
    event.preventDefault();
    if (joinToken.trim().split(' ').length == 3) {
      db.collection('tokens')
        .where('token', '==', joinToken)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            setToken(joinToken);
          } else {
            alert("Token doesn't exist!");
          }
        });
    } else {
      alert('Invalid token');
    }
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
            <p>Join an existing list by entering a three word token.</p>
            <form onSubmit={handleJoinList}>
              <label>
                Join List
                <input
                  type="text"
                  value={joinToken}
                  onChange={(e) => setJoinToken(e.target.value)}
                />
              </label>
              <input type="submit" value="Join existing list" />
            </form>
          </Route>
        </Switch>

        <Nav />
      </Router>
    </div>
  );
}

export default App;
