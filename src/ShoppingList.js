import React from 'react';
import { db } from './lib/firebase.js';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ShoppingList({ token }) {
  const [value, loading, error] = useCollectionData(
    db.collection('items').where('token', '==', token),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return (
    <div>
      <h2>Items</h2>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading Items...</span>}
      {value && (
        <ul>
          {value.map((doc, index) => (
            <li key={index}>{doc.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingList;
