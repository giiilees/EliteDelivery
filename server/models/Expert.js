import mongoose from "mongoose";

const ExpertSchema = new mongoose.Schema({
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
});

const Expert = mongoose.model("expert", ExpertSchema);
     
export default Expert;
