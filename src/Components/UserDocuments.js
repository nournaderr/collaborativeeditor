import React from 'react';

const UserDocuments = ({ documents, onDelete, onRename, onShare, onOpen }) => (
  <div>
    <h2>My Documents</h2>
    <ul>
      {documents.filter(doc => doc.owner).map(doc => (
        <li key={doc.id}>
          {doc.name}{' '}
          <button onClick={() => onOpen(doc.id)}>Open</button>
          <button onClick={() => onRename(doc.id)}>Rename</button>
          <button onClick={() => onDelete(doc.id)}>Delete</button>
        </li>
      ))}
    </ul>
    <h2>Shared Documents</h2>
    <ul>
      {documents.filter(doc => !doc.owner).map(doc => (
        <li key={doc.id}>
          {doc.name}{' '}
          <button onClick={() => onOpen(doc.id)}>Open</button>
        </li>
      ))}
    </ul>
  </div>
);

export default UserDocuments;
