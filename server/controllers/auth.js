import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Client from '../models/Client.js';
import Admin from "../models/Admin.js";
import Expert from "../models/Expert.js";

/* REGISTER CLIENT */
export const register = async (req, res) => {
  try {
    const {
      nom, prenom, email, motDePasse, tel 
    } = req.body;
    const clientEx = await Client.findOne({ email: email });
    const admin = await Admin.findOne({ email });
    const expert = await Expert.findOne({ email });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash("Belfaresidir1", salt);
    console.log(passwordHash);
    
    if (clientEx || admin || expert) return res.status(400)
          .json({ msg: "Cette utilisateur existe deja." });
    else{
      const client = new Client({ nom, prenom, email, motDePasse : passwordHash, tel });
      const savedUser = await client.save();
      delete savedUser.motDePasse;
      res.status(201).json(savedUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const imagePut = async (req, res) => {
  try {
    res.status(201).json(true);
  } catch (err) {
    res.status(500).json(false);
  }
};


export const registerExpert = async (req, res) => {
  try {
    const {
      nom, prenom, email, motDePasse, tel 
    } = req.body;

    const clientEx = await Client.findOne({ email: email });
    const admin = await Admin.findOne({ email: email });
    const expert = await Expert.findOne({ email: email });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(motDePasse, salt);

    if (clientEx || admin || expert) return res.status(400).json({ msg: "Cette utilisateur existe deja." });
    else{
      const expert = new Expert({ nom, prenom, email, motDePasse : passwordHash, tel });
      const savedUser = await expert.save();
      delete savedUser.motDePasse;
      res.status(201).json(savedUser);
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
 
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    var token = '';
    
    const clients = await Client.find({ email: email });
    const admins = await Admin.find({ email: email });
    const experts = await Expert.find({ email: email });

    if (clients.length === 0 && admins.length === 0 && experts.length === 0) {
      return res.status(400).json({ msg: "Cette utilisateur n'existe pas." });
    }

    var user;
    var type;
    

    if (clients.length !== 0) {
      user = clients[0]
      type = 'client';
    }
    if (admins.length !== 0) {
      user = admins[0] ;
      type = 'admin';
    }  
    if (experts.length !== 0) {
      user = experts[0] ;
      type = 'expert';
    }



    
    const isMatch = await bcrypt.compare(password, user.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ msg: "Identifiants invalides." });
    }

    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.motDePasse;

    console.log(user);

    res.status(200).json({ token, user , type});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
