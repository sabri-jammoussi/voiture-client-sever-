const express = require('express');
const router = express.Router();
const Voiture=require("../models/voiture")
// afficher la liste des articles.
router.get('/', async (req, res, )=> {
try {
const voitures = await
Voiture.find().populate("categorieID").exec();
res.status(200).json(voitures);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// créer un nouvel voiture
router.post('/', async (req, res) => {
const nouvvoiture = new Voiture(req.body)
try {
await nouvvoiture.save();
res.status(200).json(nouvvoiture);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// chercher un voiture
router.get('/:voitureId',async(req, res)=>{
try {
const art = await Voiture.findById(req.params.voitureId);
res.status(200).json(art);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// modifier un voiture
router.put('/:voitureId', async (req, res)=> {
const { nomvoit,imagevoit,annee,GARANTIE,prix,motorisation,scategorieID} = req.body;
const id = req.params.voitureId;
try {
const art1 = { 
nomvoit:nomvoit,imagevoit:imagevoit,annee:annee,GARANTIE:GARANTIE,prix:prix,motorisation:motorisation,scategorieID:scategorieID, _id:id };
await Voiture.findByIdAndUpdate(id, art1);
res.json(art1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// Supprimer un voiture
router.delete('/:voitureId', async (req, res)=> {
const id = req.params.voitureId;
await Voiture.findByIdAndDelete(id);
res.json({ message: "voiture deleted successfully." });
});
module.exports = router;