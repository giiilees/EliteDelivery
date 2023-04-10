import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { imagePut, register, registerExpert } from "./controllers/auth.js";
import {  Expertiser, UpdateStatus, createCommande, getALLCommandes, getALLCommandesExp, getCommandes} from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { ChangePasswordClient, ChangePasswordExpert, UpdateProfileCl, UpdateProfileExp, getALLExperts, getNbrRe } from "./controllers/users.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/imagePut", upload.single("picture"), imagePut);



/* ROUTES WITH FILES */
app.post("/Commande", verifyToken, upload.array("pictures", 10) , createCommande);

//

app.post("/auth/register", register);
app.post("/auth/registerExpert", registerExpert);
app.post("/UpdateStatus", UpdateStatus);
app.post('/ExpertPassword/:id' , ChangePasswordExpert);
app.post('/ClientPassword/:id' , ChangePasswordClient);

app.post("/UpdateProfileExp", UpdateProfileExp);
app.post("/UpdateProfileCl", UpdateProfileCl);



app.get("/Experts" , getALLExperts);
app.get("/AllCommandes" , getALLCommandes);
app.get("/ExpertCmd" , getALLCommandesExp);
app.post("/Expertiser", Expertiser);

app.get("/MesCommandes/:UserId" , getCommandes);
app.get("/ressources" , getNbrRe);



/* ROUTES */
app.use("/auth", authRoutes);


/* MONGOOSE SETUP */


const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  })
  .catch((error) => console.log(`${error} did not connect`));


  mongoose.set('strictQuery', false);
