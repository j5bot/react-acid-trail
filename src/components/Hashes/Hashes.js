import React from 'react';

export const Hashes = (props) => {
  const { hashes } = props;

  return (
    <ul>
      {
        hashes.map(
          (hash, index) => (<li key={index}>{ hash.name }: { hash.hashed }</li>)
        )
      }
    </ul>
  );
};

export default Hashes;
