import React from 'react';
import { db } from './lib/firebase.js';
import { useCollection } from 'react-firebase-hooks/firestore';

function ShoppingList() {
  const [value, loading, error] = useCollection(db.collection('items'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <div>
      <h2>Items</h2>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading Items...</span>}
      {value && (
        <ul>
          {value.docs.map((doc) => (
            <li key={doc.id}>{doc.data().name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingList;
