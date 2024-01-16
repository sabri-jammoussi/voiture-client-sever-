const express=require('express');
const mongoose =require("mongoose")
const dotenv =require('dotenv')
const cors = require('cors')
const categorieRouter =require("./routes/categorie.route")
const voitureRouter =require("./routes/voiture.route")
dotenv.config()
const app = express();
//Les cors
app.use(cors())
//BodyParser Middleware
app.use(express.json());
mongoose.set("strictQuery", false);

// Connexion à la base données
mongoose.connect(process.env.DATABASE,{
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => {console.log("Connexion à la base de données réussie");
}).catch(err => {
console.log('Impossible de se connecter à la base de données', err);
process.exit();
});
app.get("/",(req,res)=>{
res.send("bonjour");
});
app.listen(process.env.PORT, () => {
console.log(`Server is listening on port ${process.env.PORT}`); });
app.use('/api/categorie', categorieRouter);
app.use('/api/voiture', voitureRouter);
module.exports = app;