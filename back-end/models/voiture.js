const mongoose = require("mongoose")
const categorie =require("./categorie.js");
const voitureSchema=mongoose.Schema({
    nomvoit:{type: String ,required : true},
    imagevoit:{ type: String, required: false },
    annee: { type: Number, required: true },
    GARANTIE: { type: String, required: true },
    prix: { type: Number },
    motorisation:{ type:String},
    categorieID: {type:mongoose.Schema.Types.ObjectId,ref:categorie}
})
module.exports=mongoose.model('voiture',voitureSchema)