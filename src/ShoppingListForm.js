import React, { useState } from 'react';
import { db } from './lib/firebase.js';
import './ShoppingListForm.css';

function ShoppingListForm() {
  const SOON = 7;
  const KIND_OF_SOON = 14;
  const NOT_SOON = 30;
  const token = localStorage.getItem('userToken');

  const [item, setItem] = useState('');
  const [buyTime, setBuyTime] = useState(SOON);
  const [lastPurchased, setLastPurchased] = useState(null);

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

        <fieldset>
          <p>How soon are you likely to buy it again?</p>
          <label>
            Soon
            <input
              type="radio"
              name="buyTiming"
              onChange={() => {
                setBuyTime(SOON);
              }}
            />
          </label>
          <label>
            Kind of Soon
            <input
              type="radio"
              name="buyTiming"
              onChange={() => {
                setBuyTime(KIND_OF_SOON);
              }}
            />
          </label>
          <label>
            Not Soon
            <input
              type="radio"
              name="buyTiming"
              onChange={() => {
                setBuyTime(NOT_SOON);
              }}
            />
          </label>
        </fieldset>

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
