import mongoose from "mongoose";

const ClientSchema = mongoose.Schema(
    
    {
      nom: {
        type: String,
        required: true,
      },
      prenom: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      motDePasse: {
        type: String,
        required: true,
      },
      tel: {
        type: String,
        required: true,
      },

      },
    );
    
const Client = mongoose.model("client", ClientSchema);
     
export default Client;
    