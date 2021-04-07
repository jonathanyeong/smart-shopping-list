import React from 'react';
import { db } from './lib/firebase.js';
import { useCollection } from 'react-firebase-hooks/firestore';

function ShoppingList() {
  const [value, loading, error] = useCollection(
    db.collection('shoppingLists'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return (
    <div>
      <h1>Shopping List</h1>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <span>
          Collection:{' '}
          {value.docs.map((doc) => (
            <React.Fragment key={doc.id}>
              {JSON.stringify(doc.data())},{' '}
            </React.Fragment>
          ))}
        </span>
      )}
    </div>
  );
}

export default ShoppingList;
