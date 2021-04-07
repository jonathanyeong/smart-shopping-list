import React from 'react';
import ShoppingList from './ShoppingList.js';
import ShoppingListForm from './ShoppingListForm.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Smart Shopping list!</h1>
      <h2>Item list</h2>
      <ShoppingList />
      <ShoppingListForm />
    </div>
  );
}

export default App;
