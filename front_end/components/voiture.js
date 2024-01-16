import React from 'react';

const Voiture = ({ voiture }) => {
  return (
    <div>
      <h2>{voiture.nomvoit}</h2>
      <p>Image : {voiture.imagevoit}</p>
      <p>Année : {voiture.annee}</p>
      <p>GARANTIE : {voiture.GARANTIE}</p>
      <p>Prix : {voiture.prix}</p>
      <p>Motorisation : {voiture.motorisation}</p>
      <p>Catégorie ID : {voiture.categorieID}</p>
      {/* Autres propriétés à afficher */}
    </div>
  );
};

export default Voiture;
