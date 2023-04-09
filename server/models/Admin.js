import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
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
}
);

const Admin = mongoose.model("admin", AdminSchema);
     
export default Admin;