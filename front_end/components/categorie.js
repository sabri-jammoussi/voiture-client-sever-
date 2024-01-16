import React from 'react';

const Categorie = ({ categorie }) => {
  return (
    <div>
      <h2>Nom: {categorie.nomcategorie}</h2>
      {categorie.imagecategorie && (
        <img src={categorie.imagecategorie} alt={categorie.nomcategorie} />
      )}
    </div>
  );
};

export default Categorie;
