
import Commande from "../models/Commande.js";
/* CREATE */
export const createCommande = async (req, res) => {
  try {
    const { 
      id, 
      Nom ,
      Prenom , 
      Telephone,
      adresseD, 
      adresseA,
      picturesPath,
      Etat,
      Prix } = req.body;
    // const user = await User.findById(userId);
    const newCommande = new Commande({
      id,
      Nom ,
      Prenom , 
      Telephone,
      adresseD, 
      adresseA,  
      picturesPath, 
      Etat,
      Prix
    });

    await newCommande.save();

    const cmd = await Commande.find();
    res.status(201).json(cmd);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getALLCommandes = async (req , res) =>{
  try {
    const cmd = await Commande.find(); //, type: {$ne : 'Terminer'}
    res.status(200).json(cmd);
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getCommandes = async (req , res) =>{
  try {
    const { UserId } = req.params;
    const cmd = await Commande.find({ id:UserId  }); //, type: {$ne : 'Terminer'}
    res.status(200).json(cmd);
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}


export const UpdateStatus = async (req, res) => {
  try {
    const { id , status } = req.body;
    const Cmd = await Commande.findById(id);
    
    if (Cmd) {
      Cmd.Etat = status
    }
    const Maj = await Cmd.save();
    
    res.status(200).json(Maj);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}


export const getALLCommandesExp = async (req , res) =>{
  try {
    const cmd = await Commande.find({ Etat: 'Approuvé'}); //, type: {$ne : 'Terminer'}
    res.status(200).json(cmd);
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const Expertiser = async (req, res) => {
  try {
    const { id , status , Prix} = req.body;
    const Cmd = await Commande.findById(id);
    
    if (Cmd) {
      Cmd.Etat = status
      Cmd.prix = Prix 
    }
    const Maj = await Cmd.save();
    
    res.status(200).json(Maj);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}


