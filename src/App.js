import React, { useEffect, useState } from 'react';
import { db } from './lib/firebase.js';
import './App.css';

function App() {
  const [shoppingLists, setShoppingLists] = useState([]);

  useEffect(() => {
    db.collection('shoppingLists')
      .get()
      .then((querySnapshot) => {
        let lists = [];
        querySnapshot.forEach((doc) => {
          lists.push(`${doc.id} => ${doc.data().items}`);
          console.log(doc.id, ' => ', doc.data());
        });
        setShoppingLists(lists);
      });
  }, []); // The empty array makes sure that we only call set State once.

  const addShoppingList = () => {
    db.collection('shoppingLists').add({
      items: ['beer', 'coffee', 'milk'],
    });
  };

  return (
    <div className="App">
      <h1>Smart Shopping list!</h1>
      <h2>Item list</h2>
      <ul>
        {shoppingLists.map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
      <button onClick={addShoppingList}>Add a shopping list item!</button>
    </div>
  );
}

export default App;
