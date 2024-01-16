'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './voiturecss.css';

const VoiturePage = () => {
    const [voitures, setVoitures] = useState([]);
    const [selectedVoiture, setSelectedVoiture] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
  
    useEffect(() => {
      
      fetchVoitures();
    }, []);
  
    const fetchVoitures = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/voiture');
        setVoitures(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleDelete = async (voitureId) => {
      const confirmed = window.confirm("Are you sure you want to delete this Car?");
      if (!confirmed) {
        return;
      }
  
      try {
        await axios.delete(`http://localhost:3001/api/voiture/${voitureId}`);
        const updatedVoitures = voitures.filter((voiture) => voiture._id !== voitureId);
        setVoitures(updatedVoitures);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleEdit = (voiture) => {
      setSelectedVoiture(voiture);
      setShowAddForm(true);
    };
  
    const handleAdd = () => {
      setSelectedVoiture(null);
      setShowAddForm(true);
    };
  
    const handleAddFormSubmit = async (event) => {
      event.preventDefault();
      const imagevoit = event.target.elements.imagevoit.value;
      const nomvoit = event.target.elements.nomvoit.value;
      const prix = event.target.elements.prix.value;
      const GARANTIE = event.target.elements.GARANTIE.value;
      const annee = event.target.elements.annee.value;
      const motorisation = event.target.elements.motorisation.value;
  
      try {
        if (selectedVoiture) {
          await axios.put(`http://localhost:3001/api/voiture/${selectedVoiture._id}`, {
            imagevoit,
            nomvoit,
            prix,
            GARANTIE,
            annee,
            motorisation,
          });
        } else {
          await axios.post('http://localhost:3001/api/voiture', {
            imagevoit,
            nomvoit,
            prix,
            GARANTIE,
            annee,
            motorisation,
          });
        }
  
        event.target.reset();
        fetchVoitures(); // Fetch the updated list of voitures
        setShowAddForm(false);
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div className="container">
      <h1>Liste des voitures</h1>
      {!showAddForm && (
        <button className="btn-style" onClick={handleAdd}>
          Ajouter
        </button>
      )}
      {showAddForm && (
        <div>
          <h2>{selectedVoiture ? 'Modifier une voiture' : 'Ajouter une voiture'}</h2>
          <form onSubmit={handleAddFormSubmit}>
            <input
              type="text"
              name="nomvoit"
              placeholder="Nom de la voiture"
              required
              defaultValue={selectedVoiture ? selectedVoiture.nomvoit : ''}
            />
            <input
              type="text"
              name="imagevoit"
              placeholder="URL de l'image"
              required
              defaultValue={selectedVoiture ? selectedVoiture.imagevoit : ''}
            />
            <input
              type="number"
              name="prix"
              placeholder="Prix"
              required
              defaultValue={selectedVoiture ? selectedVoiture.prix : ''}
            />
            <input
              type="text"
              name="GARANTIE"
              placeholder="Garantie"
              required
              defaultValue={selectedVoiture ? selectedVoiture.GARANTIE : ''}
            />
            <input
              type="text"
              name="annee"
              placeholder="Année"
              required
              defaultValue={selectedVoiture ? selectedVoiture.annee : ''}
            />
            <input
              type="text"
              name="motorisation"
              placeholder="Motorisation"
              required
              defaultValue={selectedVoiture ? selectedVoiture.motorisation : ''}
            />
            <button type="submit" className='submit_voiture'>
              {selectedVoiture ? 'Modifier' : 'Enregistrer'}
            </button>
            <button onClick={() => setShowAddForm(false)} className='cancel_voiture'>Annuler</button>
          </form>
        </div>
      )}
      
      <ul className="voiture-list">
        {voitures.map((voiture) => (
          <li key={voiture._id} className="voiture-item">
            <div className="voiture-details">
              <img src={voiture.imagevoit} className='voiture-image' alt={voiture.nomvoit} />
              <ul>
                <p className="voiture-name">Nom : {voiture.nomvoit}</p>
                <p className="voiture-name">Prix : {voiture.prix} DT</p>
                <p className="voiture-name">Garantie : {voiture.GARANTIE}</p>
                <p className="voiture-name">Année : {voiture.annee}</p>
                <p className="voiture-name">Motorisation : {voiture.motorisation}</p>
                
              </ul>
              <button className="btn-edit" onClick={() => handleEdit(voiture)}>Modifier</button>
              <button className="btn-danger" onClick={() => handleDelete(voiture._id)}>Supprimer</button>
  
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoiturePage;
