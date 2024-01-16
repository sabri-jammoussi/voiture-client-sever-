'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoriePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedcategorie, setSelectedcategorie] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  useEffect(() => {
    fetchCategories();
  }, []);


     const fetchCategories = async ()=> {
      try {
        const response = await axios.get('http://localhost:3001/api/categorie'); // Replace "URL_DE_VOTRE_API" with the actual URL of your API to fetch categories.
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const handleDelete = async (categorieID) => {
        const confirmed = window.confirm("Are you sure you want to delete this voiture?");
        if (!confirmed) {
          return;
        }
    
        try {
          await axios.delete(`http://localhost:3001/api/categorie/${categorieID}`);
          const updatedcategories = categories.filter((categorie) => categorie._id !== categorieID);
          setCategories(updatedcategories);
        } catch (error) {
          console.error(error);
        }
      };
    const handleEdit=(categorie)=>{
        setSelectedcategorie(categorie);
        setShowAddForm(true);
    };
    const handleAdd=()=>{
        setSelectedcategorie(null);
        setShowAddForm(true);
    };
    const handleAddFormSubmit = async(event)=>{
        event.preventDefault();
        const nomcategorie=event.target.elements.nomcategorie.value;
        const imagecategorie = event.target.elements.imagecategorie.value;
        try{
            if(selectedcategorie){
                await axios.put(`http://localhost:3001/api/categorie/${selectedcategorie._id}`,
                {
                    nomcategorie,
                    imagecategorie,
                });
            }else {
                await axios.post(`http://localhost:3001/api/categorie/`,
                {
                    nomcategorie,
                    imagecategorie,

                });
            }
            event.target.reset();
            fetchCategories();
            setShowAddForm(false);
        }catch(error){
            console.error(error);
        }
    };
    // const handleView = (categorie) => {
    //     // Implement your view functionality here
    //     console.log(`Viewing category ${categorie.nomcategorie}`);
    //     setModalOpen(true);
    //     setSelectedCategory(categorie);
    //   };
  return (
    <div className="container">
      <h1>Liste des catégories</h1>
      {!showAddForm && (
        <button className="btn-style" onClick={handleAdd}>
          Ajouter
        </button>
      )}
      {showAddForm && (
        <div>
          <h2>{selectedcategorie ? 'Modifier une categorie' : 'Ajouter une categorie'}</h2>
          <form onSubmit={handleAddFormSubmit}>
            <input
              type="text"
              name="nomcategorie"
              placeholder="Nom de la categorie"
              required
              defaultValue={selectedcategorie ? selectedcategorie.nomcategorie : ''}
            />
             <input
              type="text"
              name="imagecategorie"
              placeholder="URL de l'image"
              required
              defaultValue={selectedcategorie ? selectedcategorie.imagecategorie : ''}
            />
            <button type="submit" className='submit_voiture'>
              {selectedcategorie ? 'Modifier' : 'Enregistrer'}
            </button>
            <button onClick={() => setShowAddForm(false)} className='cancel_voiture'>Annuler</button>
          </form>
        </div>
            )}
      <ul className="categorie-list">
        {categories.map((categorie) => (
          <li key={categorie._id} className="categorie-item">
            <div className="categorie-details">
              <p className="categorie-name">Nom : {categorie.nomcategorie}</p>
              {categorie.imagecategorie && (
                <img src={categorie.imagecategorie} alt={categorie.nomcategorie} className="categorie-image" />
              )}
                            <button className="btn-edit" onClick={() => handleEdit(categorie)}>Modifier</button>
               <button className="btn-danger" onClick={() => handleDelete(categorie._id)}>Supprimer</button>
               {/* <button className="btn-view" onClick={() => handleView(categorie)}>view</button> */}

            </div>
          </li>
        ))}
      </ul> 
    </div>
  );
};

export default CategoriePage;
