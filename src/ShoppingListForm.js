import React, { useState, useEffect, useRef } from 'react';
import { db } from './lib/firebase.js';
import { validItem, normalizedItem } from './lib/helpers/item_helpers.js';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import './ShoppingListForm.css';

function ShoppingListForm({ token }) {
  const SOON = 7;
  const KIND_OF_SOON = 14;
  const NOT_SOON = 30;
  const [item, setItem] = useState('');
  const [errors, setErrors] = useState({});
  const [buyTime, setBuyTime] = useState(SOON);
  const [lastPurchased, setLastPurchased] = useState(null);
  const didInitialMountRef = useRef(true);

  const [items] = useCollectionDataOnce(
    db.collection('items').where('token', '==', token),
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const matchedItems = items.filter((addedItem) => {
      return addedItem.name === normalizedItem(item);
    });

    if (matchedItems.length > 0) {
      alert('Item has already been added!');
      return;
    }

    if (validItem(item)) {
      db.collection('items').add({
        name: item,
        buyTime: buyTime,
        lastPurchased: lastPurchased,
        token: token,
      });
      setItem('');
      setBuyTime(SOON);
      didInitialMountRef.current = true;
    }
  };

  useEffect(() => {
    let errs = {};

    if (didInitialMountRef.current) {
      didInitialMountRef.current = false;
      return;
    }

    if (!validItem(item)) {
      errs = { item: 'invalid item' };
    }
    setErrors(errs);
  }, [item]);

  return (
    <div className="shopping-list__form-container">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name
          <input
            type="text"
            className={errors.item ? 'error' : ''}
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
          <br />
          <span class="shopping-list__input-errors">{errors.item}</span>
        </label>

        <fieldset>
          <p>How soon are you likely to buy it again?</p>
          <label>
            Soon
            <input
              type="radio"
              name="buyTiming"
              checked={buyTime === SOON}
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
              checked={buyTime === KIND_OF_SOON}
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
              checked={buyTime === NOT_SOON}
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
