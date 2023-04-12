import Commande from "../models/Commande.js";
import bcrypt from "bcrypt";
import Expert from "../models/Expert.js";
import Client from "../models/Client.js";
import Admin from "../models/Admin.js";


/* READ */
export const getALLExperts = async (req , res) =>{
  try {
    const Exp = await Expert.find(); //, type: {$ne : 'Terminer'}
    res.status(200).json(Exp);
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}


export const ChangePasswordExpert = async (req , res) =>{
  try {
    const { id } = req.params;
    const  { NewMdp , password } = req.body;
   
    const Exp = await Expert.findById(id);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(NewMdp, salt);

    const isMatch = await bcrypt.compare(password, Exp.motDePasse);

    if (Exp && isMatch) {
      Exp.motDePasse = passwordHash;
    }
    if (!isMatch){
      return res.status(400).json({ msg: "Incorrect Password." })
    }
    const UserMAj = await Exp.save();
    res.status(200).json(UserMAj);

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });

  }
}

export const ChangePasswordClient = async (req , res) =>{
  try {
    const { id } = req.params;
    const  { NewMdp , password } = req.body;
   
    const Cl = await Client.findById(id);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(NewMdp, salt);

    const isMatch = await bcrypt.compare(password, Cl.motDePasse);

    if (Cl && isMatch) {
      Cl.motDePasse = passwordHash;
    }
    if (!isMatch){
      return res.status(400).json({ msg: "Incorrect Password." })
    }
    const UserMAj = await Cl.save();
    res.status(200).json(UserMAj);

  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });

  }
}


export const getNbrRe = async (req , res) =>{
  try {
    const Cl = await Client.find(); //, type: {$ne : 'Terminer'}
    const Exp = await Expert.find(); //, type: {$ne : 'Terminer'}
    const Cmd = await Commande.find(); //, type: {$ne : 'Terminer'}

    res.status(200).json([Exp.length , Cl.length , Cmd.length ]);
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}


export const UpdateProfileExp = async (req, res) => {
  try {
    const {nom , prenom , tel , email , id} = req.body;
    const Exp = await Expert.findById(id);
    
    const clientEx = await Client.findOne({ email: email });
    const admin = await Admin.findOne({ email: email });

    if (clientEx || admin ) return res.status(400).json({ msg: "Cette utilisateur existe deja." });
    if ( Exp && !(clientEx || admin)){
        Exp.tel = tel
        Exp.email = email 
        Exp.nom= nom , 
        Exp.prenom = prenom   
    }

    const Maj = await Exp.save();
    res.status(200).json(Maj);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
}


export const UpdateProfileCl = async (req, res) => {
  try {
    const {nom , prenom , tel , email , id} = req.body;
    const Cl = await Client.findById(id);
    
    const expert = await Expert.findOne({ email: email });
    const admin = await Admin.findOne({ email: email });

    if (expert || admin ) return res.status(400).json({ msg: "Cette utilisateur existe deja." });
    if ( Cl && !(expert || admin)){
        Cl.tel = tel
        Cl.email = email 
        Cl.nom= nom , 
        Cl.prenom = prenom   
    }
      const Maj = await Cl.save();
      res.status(200).json(Maj);
    
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}


