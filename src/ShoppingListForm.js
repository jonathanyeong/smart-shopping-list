import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { db } from './lib/firebase.js';
import './ShoppingListForm.css';

function ShoppingListForm() {
  const [item, setItem] = useState('');
  const [buyTime, setBuyTime] = useState(7);
  const [lastPurchased, setLastPurchased] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');

  const handleSubmit = (event) => {
    db.collection('items').add({
      name: item,
      buyTime: buyTime,
      lastPurchased: lastPurchased,
      token: token,
    });
    setItem('');
    event.preventDefault();
  };

  return (
    <div class="shopping-list__form-container">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name
          <input
            type="text"
            value={item}
            onChange={(e) => {
              setItem(e.target.value);
            }}
            required
          />
        </label>

        <label>
          How soon are you likely to buy it again?
          <select
            value={buyTime.toString()}
            onBlur={(e) => {
              setBuyTime(parseInt(e.target.value));
            }}
          >
            <option value="7">Soon</option>
            <option value="14">Kind of soon</option>
            <option value="30">Not Soon</option>
          </select>
        </label>

        <label>
          Last purchased date (Optional)
          <input
            type="date"
            value={lastPurchased}
            onChange={(e) => {
              setLastPurchased(e.target.value);
            }}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ShoppingListForm;
