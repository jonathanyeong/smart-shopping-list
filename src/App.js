import React, { useState, useEffect, useRef } from 'react';
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
  const TOKEN_WORD_LENGTH = 3;
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');
  const [joinToken, setJoinToken] = useState('');
  const didSetToken = useRef(false);
  useEffect(() => {
    localStorage.setItem('userToken', token);

    if (token.length > 0 && !didSetToken.current) {
      db.collection('tokens').doc(token).set({ token: token });
      didSetToken.current = true;
    }
  }, [token]);

  const generateToken = () => {
    setToken(getToken());
  };

  const handleJoinList = (event) => {
    event.preventDefault();
    if (joinToken.trim().split(' ').length == TOKEN_WORD_LENGTH) {
      db.collection('tokens')
        .where('token', '==', joinToken)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            // Token already exists in the DB we don't need to add it again.
            didSetToken.current = true;
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
            {token ? <ShoppingList token={token} /> : <Redirect to="/" />}
          </Route>
          <Route path="/add-item">
            {token ? <ShoppingListForm token={token} /> : <Redirect to="/" />}
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
