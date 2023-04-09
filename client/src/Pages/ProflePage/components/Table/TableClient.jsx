import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    IconButton,
    InputAdornment,
  } from "@mui/material";
import { Close } from "@mui/icons-material";

import { Formik } from "formik";
import * as yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from "react-hot-toast";
import { ArrowBackIos, Visibility, VisibilityOff } from "@mui/icons-material";

import { Add, AddOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MotorcycleIcon from "../../../../motorcycle.svg";



  
  const registerSchema = yup.object().shape({
    Nom: yup.string().required("requis"),
    Prenom: yup.string().required("requis"),
    Telephone: yup
      .string()
      .matches(/^[0-9]+$/, "Ce champ ne doit contenir que des nombres")
      .required("requis"),
    email: yup.string().email("invalid email").required("requis"),
    password: yup
      .string()
      .required("requis")
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .matches(
        /^(?=.*\d)(?=.*[A-Z]).{8,}$/,
        "Le mot de passe doit contenir au moins 1 lettre majuscule et 1 chiffre"
      ),
    password2: yup
      .string()
      .required("requis")
      .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre"),
  });
  
  
  const initialValuesRegister = {
    Nom: "",
    Prenom: "",
    email: "",
    password: "",
    password2: "",
    Telephone: "",
  };

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}




const makeStyle=(status)=>{
    const ech= status.slice(0, 7);
    console.log(ech);
    if (ech !== 'Motif :'){
        if (status === "Approuvé") {
         return {
           background: "rgb(145 254 159 / 47%)",
           color: "green",
         };
       } else if (status === "En attente") {
         return {
           background: "#ffadad8f",
           color: "red",
         };
       } else if (status === "En route") {
         return {
           background: "rgb(187, 210, 225)",
           color: "green",
         };
       } else {
         return {
           background: "#59bfff",
           color: "white",
         };
       } 
       }else{
         return {
           background: "red",
           color: "white",
         };
       }

       
//   if(status === 'Approuvé')
//   {
//     return {
//       background: 'rgb(145 254 159 / 47%)',
//       color: 'green',
//     }
//   }
//   else if(status === 'En attente')
//   {
//     return{
//       background: '#ffadad8f',
//       color: 'red',
//     }
//   }
//   else{
//     return{
//       background: '#59bfff',
//       color: 'white',
//     }
//   }
}



export default function BasicTable() {
    const user = useSelector((state)=> state.user);
    const [AddExpert , setAddExpert] =useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [showPassword, setShowPassword] =useState(false);
    const [Send, setSend] =useState(false); 
    const [Err, setErr] =useState();
    const [rows, setrows] =useState([]);
    const [Produit, setProduit] = useState(null);
    const [IndP, setIndP] = useState();
    const SmallScre = useMediaQuery("(max-width: 1000px)");

    const GetCommandes = async () => {
        await fetch(`http://localhost:3001/MesCommandes/${user._id}`, {
          method: "GET",
        })
          .then(async (data) => {
            const dataPost = await data.json();
            console.log(dataPost);
            setrows(dataPost);
          })
          .catch((err) => {
            console.log(err);
          });
    };

    useEffect(()=>{
        GetCommandes();
    },[])
  return (
      <div className="Table2">

      
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ width: '100%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell align="left">Telephone</TableCell>
                <TableCell align="left">Etat</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" , textAlign:'center' }}>
              {rows.map((row , index) => (
                <>
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.Nom} {row.Prenom}
                  </TableCell>
                  <TableCell align="left">{row.Telephone}</TableCell>
                  {/* <TableCell align="left">{row.date}</TableCell> */}
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.Etat)}>{ row.Etat.startsWith('Motif :') ? <>Refusée</> : row.Etat}</span>
                  </TableCell>
                  <TableCell align="left" className="Details" 
                    onClick={() => {
                      setProduit(row);
                      setIndP(index);
                    }}>Details</TableCell>
                  
                </TableRow>
                {Produit !== null && IndP == index && (
                  <>
                    {" "}
                   
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          textAlign: "center",
                          width: "200%",
                        }}
                      >
                        <div
                          class="cardSuivie"
                          style={{
                            background: "rgba(31, 41, 55, 1)",
                          }}
                        >
                          <div class="infosSuivie">
                            <div class="imageSuivie">

                              {Produit.Etat === "En attente" && (
                                <Box style={{ padding: '30% 20%'}} >
                                <ClipLoader />
                                </Box>
                              )}

                              {Produit.Etat === "Approuvé" && (
                                <svg
                                  className="OkIcon"
                                  fill="#43dd22"
                                  viewBox="-51.2 -51.2 614.40 614.40"
                                  xmlns="http://www.w3.org/2000/svg"
                                  stroke="#43dd22"
                                  transform="rotate(0)"
                                >
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke="#CCCCCC"
                                    stroke-width="2.048"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    <title>ionicons-v5-e</title>
                                    <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM218,360.38,137.4,270.81l23.79-21.41,56,62.22L350,153.46,374.54,174Z"></path>
                                  </g>
                                </svg>
                              )}
                              
                              {Produit.Etat === "En route" && (
                                  <img
                                    width={"140px"}
                                    height={"120px"}
                                    src={MotorcycleIcon}
                                    className="MotorcycleIcon"
                                    sx={{ position: "absolute", top: 0, left: 0 }}
                                  />
                              )}

                              {Produit.Etat === "Livré" && (
                                <Box
                                  style={{
                                    borderRadius: "0.75rem",
                                    padding: "5%",
                                  }}
                                >
                                  {/* <QRCode
                                size={100}
                                value={`Cart:${Produit._id}.Livreur:${Produit.LivreurId}`}
                              /> */}
                                </Box>
                              )}
                            </div>
                            <div class="infoSuivie">
                              <div>
                                <p class="nameSuivie">
                                  L'etat de votre commande :
                                </p>
                                <p class="functionSuivie">{Produit.Etat.startsWith('Motif :') ? (<p style={{ color: "red" }}> Refusée </p>) : ( Produit.Etat )} </p>
                              </div>
                              <div class="statsSuivie">
                                {/* <p class="flex flex-col"> */}
                                <svg
                                  width={"30px"}
                                  height={"30px"}
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g
                                    id="SVGRepo_bgCarrier"
                                    stroke-width="0"
                                  ></g>
                                  <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></g>
                                  <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                      d="M22 6.78049C25.01 8.74049 27 12.1395 27 16.0005C27 19.8605 25.01 23.2595 22 25.2195C20.28 26.3495 18.22 27.0005 16 27.0005C13.78 27.0005 11.72 26.3495 10 25.2195C6.99 23.2595 5 19.8605 5 16.0005C5 12.1395 6.99 8.74049 10 6.78049C11.72 5.65049 13.78 5.00049 16 5.00049C18.22 5.00049 20.28 5.65049 22 6.78049Z"
                                      fill="#FFC44D"
                                    ></path>{" "}
                                    <path
                                      d="M22 25.2197V30.4997C22 30.7807 21.78 30.9997 21.5 30.9997H10.5C10.22 30.9997 10 30.7807 10 30.4997V25.2197C11.72 26.3497 13.78 26.9997 16 26.9997C18.22 26.9997 20.28 26.3497 22 25.2197ZM22 1.5V6.78C20.28 5.65 18.22 5 16 5C13.78 5 11.72 5.65 10 6.78V1.5C10 1.23 10.22 1 10.5 1H21.5C21.78 1 22 1.23 22 1.5Z"
                                      fill="#668077"
                                    ></path>{" "}
                                    <path
                                      d="M16 9V16.005L19 19.002M10 3V1.505C10 1.229 10.224 1 10.5 1H21.5C21.776 1 22 1.229 22 1.505V3M22 29V30.505C22 30.781 21.776 31 21.5 31H10.5C10.224 31 10 30.781 10 30.505V29M27 16.0049C27 9.9299 22.075 5.0049 16 5.0049C9.925 5.0049 5 9.9299 5 16.0049C5 22.0799 9.925 27.0049 16 27.0049C22.075 27.0049 27 22.0799 27 16.0049Z"
                                      stroke="#000000"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    ></path>{" "}
                                  </g>
                                </svg>
                                {/* </p> */}
                                <p class="flex">
                                {Produit.Etat === "En attente" && (<> Votre Commandes sera traitee des que possible </>)}
                                {Produit.Etat === "Approuvé" && (<> Votre demande est Approuvé</>)}
                                {Produit.Etat === "En route" && (<> votre demandes est en route </>)}
                                {Produit.Etat === "Livré" && (<> Votre Commande est arrivée ; merci pour votre confiance.</>)}
                                {Produit.Etat.startsWith('Motif :') &&(<p style={{ color: "red" }}> {Produit.Etat} </p>)}
                                {Produit.Etat === "expertisée" && (<>le prix estimée par l'expert :<p style={{ color: "green" , fontWeight: '900' }}>{Produit.prix} €</p> </>)}

                                 
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* <button class="request" type="button">
                        Add friend
                      </button> */}
                        </div>
                        <IconButton onClick={()=>{ setProduit(null) ; setIndP()}}>
                          <Close />
                        </IconButton>
                      </Box>
                  </>
                )}
                </>
              ))}
              {rows.length == 0 &&(
                <Typography style={{ color: "black" }} > Aucune Commande pour le moment ... </Typography>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
