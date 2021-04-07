import React, { useState } from 'react';
import { db } from './lib/firebase.js';
import './ShoppingListForm.css';

function ShoppingListForm() {
  const [item, setItem] = useState('');

  const handleSubmit = (event) => {
    db.collection('shoppingLists').add({
      items: [item],
    });
    setItem('');
    event.preventDefault();
  };

  return (
    <div class="shopping-list__form-container">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item To Add:
          <input
            type="text"
            value={item}
            onChange={(e) => {
              setItem(e.target.value);
            }}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ShoppingListForm;
