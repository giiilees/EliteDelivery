import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import MotorcycleIcon from "../../../../motorcycle.svg";
import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import {
  Close,
  DeliveryDining,
  OneK,
  Redo,
  Send,
  ThumbUpAlt,
  Verified,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const makeStyle = (status) => {
  
  const ech= status.slice(0, 7);
  // console.log(ech);
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
  
};

export default function BasicTable() {
  const [Commandes, setCommandes] = useState([]);
  const [Produit, setProduit] = useState(null);
  const [IndP, setIndP] = useState();
  const [estimation, setestimation] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const SmallScre = useMediaQuery("(max-width: 1000px)");
  const token = useSelector((state) => state.token);

  const Expertiser = async (index) => {
    const Cmd = Commandes[index];
    const id = Cmd._id;
    const obj = {
      status : 'expertisée',
      Prix: estimation,
      id
    };

    await fetch(`http://localhost:3001/Expertiser`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then(async (data) => {
        const dataCmd = await data.json();
        if (dataCmd.length !== 0) {
          console.log(dataCmd);
          Commandes[index] = dataCmd;
          setProduit(null);
          setIndP();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetCommandes = async () => {
    await fetch(`http://localhost:3001/ExpertCmd`, {
      method: "GET",
    })
      .then(async (data) => {
        const dataCmd = await data.json();
        // console.log(dataCmd);
        setCommandes(dataCmd);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const ChangeStatus = async (index, status) => {
    const Cmd = Commandes[index];
    const id = Cmd._id;
    const obj = {
      status,
      id,
    };

    await fetch(`http://localhost:3001/UpdateStatus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then(async (data) => {
        const dataCmd = await data.json();
        if (dataCmd.length !== 0) {
          console.log(dataCmd);
          Commandes[index] = dataCmd;
          setProduit(null);
          setIndP();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if(Produit){
    const interval = setInterval(() => {
      setCurrentImageIndex(currentImageIndex => (currentImageIndex + 1) % Produit.picturesPath.length);
    }, 10000);
    return () => clearInterval(interval); 
    }

  }, []);

  useEffect(() => {
    GetCommandes();
  }, []);
  return (
    <div className="Table">
      <h3>Commandes </h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell align="left">Telephone</TableCell>
              <TableCell align="left">Etat</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" , textAlign:'center' }}>
            {Commandes.map((row, index) => (
              <>
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ width: SmallScre ? "10%" : "20%" }}
                    component="th"
                    scope="row"
                  >
                    {row.Nom} {row.Prenom}
                  </TableCell>
                  <TableCell align="left">{row.Telephone}</TableCell>
                  {/* <TableCell align="left">{row.date}</TableCell> */}
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.Etat)}>
                    { row.Etat.startsWith('Motif :') ? <>Refusée</> : row.Etat}
                    </span>
                  </TableCell>
                  <TableCell
                    align="left"
                    className="Details"
                    onClick={() => {
                      setProduit(row);
                      setIndP(index);
                    }}
                  >
                    Details
                  </TableCell>
                </TableRow>

                {/* dede */}

                {Produit !== null && IndP == index && (
                  <>
                    {" "}
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        width: "280%",
                      }}
                    >
                      <div
                        class="cardSuivie"
                        style={{
                          background: "rgba(31, 41, 55, 1)",
                        }}
                      >
                        <div class="infosSuivie">
                        <Tooltip title='Double-clique pour visualiser'>
                          <div onDoubleClick={()=> {  window.open(`http://localhost:3001/assets/${Produit.picturesPath[currentImageIndex]}`, '_blank');}} class="imageSuivie">
                            {/* images des prod */}
                            <img 
                                className="imgProd"
                                // style={{ objectFit: "cover" }}
                                // width={'112px'}
                                // height={'112px'}
                                alt="Product"
                                src={`http://localhost:3001/assets/${Produit.picturesPath[currentImageIndex]}`}
                            />
                          </div></Tooltip>
                          <div class="infoSuivie">
                            <div>
                              <p class="nameSuivie">
                                {Produit.Nom} {Produit.Prenom}
                              </p>
                              <p class="functionSuivie">
                                {" "}
                                L'etat de commande : {Produit.Etat.startsWith('Motif :') ? (<p style={{ color: "red" }}> Refusée </p>) : ( Produit.Etat )} 
                                {Produit.Etat.startsWith('Motif :') ? (<p style={{ color: "red" }}> {Produit.Etat} </p>) : ( <></> )} 
                              </p>
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
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
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

                              <p class="flex">De : {Produit.adresseD.name}</p>
                              <span class="state-value">
                                a : {Produit.adresseA.name}
                              </span>
                              
                            </div>
                          </div>
                        </div>

                          <div class="request">
                            <Typography> estimation : </Typography>
                            <TextField
                              label="Estimation"
                              type="number"
                              placeholder="Estimation du prix ..."
                              onChange={(e) => {
                                setestimation(e.target.value);
                              }}
                              value={estimation}
                              name="Estimation"
                            />
                            <IconButton
                               sx={{ background: 'green'}}
                              onClick={() => {
                                Expertiser(index);
                              }}
                            >
                              <Send />
                            </IconButton>
                            
                          </div>
                        
                        {/* <button class="request" type="button">
                        Add friend
                      </button> */}
                      </div>
                      <IconButton
                        onClick={() => {
                          setProduit(null);
                          setIndP();
                        }}
                      >
                        <Close />
                      </IconButton>
                    </Box>
                  </>
                )}
              </>
            ))}
            {Commandes.length == 0 &&(
                <Typography style={{ color: "black" }} > Aucune Commande pour le moment ... </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
