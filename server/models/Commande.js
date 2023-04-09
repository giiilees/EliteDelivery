import mongoose from "mongoose";

const CommandeSchema = mongoose.Schema(
    
    {   
        id: {
          type: String,
        },
        Nom: {
          type: String,
        },
        Prenom: {
          type: String,
        },
        adresseD: {
          type: Object,
        },
        adresseA: {
          type: Object,
        },
        Telephone: {
          type: String,
        },
        picturesPath: {
          type: Array,
        },
        Etat: {
          type: String,
        },
        prix: {
          type: Number,
        },

      },
      { timestamps: true }
    );
    
const Commande = mongoose.model("Commande", CommandeSchema);
     
export default Commande;
    