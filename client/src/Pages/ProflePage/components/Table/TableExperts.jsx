import React , { useState , useEffect, useRef} from "react";
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
  Tooltip,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from "react-hot-toast";
import { ArrowBackIos, HealthAndSafety, Visibility, VisibilityOff } from "@mui/icons-material";

import { Add, AddOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import emailjs from '@emailjs/browser';



const registerSchema = yup.object().shape({
  Nom: yup.string().required("requis"),
  Prenom: yup.string().required("requis"),
  Telephone: yup
    .string()
    .matches(/^[0-9]+$/, "Ce champ ne doit contenir que des nombres")
    .required("requis"),
  email: yup.string().email("invalid email").required("requis"),
 
 
});

const initialValuesRegister = {
  Nom: "",
  Prenom: "",
  email: "",
  password: "",
  Telephone: "",
};

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

// const rows = [
//   createData("Didier farid", 18908424, "2 March 2022", "Approuvé"),
//   createData("Slimane rehou ", 18908424, "2 March 2022", "En attente"),
//   createData("Mouth Freshner", 18908424, "2 March 2022", "Approuvé"),
//   createData("Cupcake", 18908421, "2 March 2022", "Livré"),
// ];

const makeStyle = (status) => {
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
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};



export default function BasicTable() {
  const [AddExpert, setAddExpert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [showPassword, setShowPassword] = useState(false);
  const [Send, setSend] = useState(false);
  const [Experts, setExperts] = useState([]);

  const [Err, setErr] = useState();
  const form = useRef();

  const sendEmail = () => {
    // e.preventDefault();

    emailjs.sendForm('service_7he4tyo', 'template_w36wm4x', form.current, 'RPF2B0osx22QwZL46')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  const registerExp = async (values, onSubmitProps) => {
    const Objec = {
      nom: values.Nom,
      prenom: values.Prenom,
      email: values.email,
      motDePasse: values.password,
      tel: values.Telephone,
    };

    await fetch("http://localhost:3001/auth/registerExpert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Objec),
    })
      .then(async (data) => {
        const USER = await data.json();
        // console.log(USER);
        if (USER._id) {
          sendEmail();
          onSubmitProps.resetForm();
          toast(
            <div>
              <h2>success</h2>
              <p>
                L'ajout de l'expert a bien ete enregistrer,
                Merci.
              </p>
            </div>,
            {
              type: "success",
              position: "top-center",
              style: {
                background: "#6ad55e",
                color: "#fff",
              },
              duration: 4000,
            }
          );
          
        }
        if( USER.error){
          let err = USER.error.slice(0, 25);
          if(err === 'E11000 duplicate key error'){
            setErr("Cette email existe deja.");
          }else{
            setErr("Une erreur c'est produite , reesayez svp");
          }
        }
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await registerExp(values, onSubmitProps);
  };

  const RandomAd = () =>{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!#$%^&*=+';
    var charactersLength = characters.length;
    for ( var i = 0; i < 9 ; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
       charactersLength));
   }
   return result;
  } 

  const handleGeneratePassword = (setFieldValue) => {
    const password = RandomAd();
    setFieldValue("password", password);
  };

  const GetExperts = async () => {
    await fetch(`http://localhost:3001/Experts`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json'},

    })
      .then(async (data) => {
        const Exp = await data.json();
        console.log(Exp);
        setExperts(Exp);
      })
      .catch((err) => {
        console.log(err);
      });
};

useEffect(()=>{
    GetExperts();
},[])

  return (
    <div className="Table2">
      <Box
        display={"flex"}
        onClick={() => {
          setAddExpert(!AddExpert);
        }}
      >
        {AddExpert ? (
          <>
            <Typography> Retour</Typography>
            <IconButton sx={{ backgroundColor: "grey", marginTop: "-5px" }}>
              <ArrowBackIos />
            </IconButton>
          </>
        ) : (
          <>
            <Typography> Ajouter un expert ?</Typography>
            <IconButton sx={{ backgroundColor: "grey", marginTop: "-5px" }}>
              <AddOutlined fontSize="inherit" />
            </IconButton>
          </>
        )}
      </Box>

      {AddExpert ? (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form ref={form} onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <Toaster />

                <TextField
                  label="Nom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Nom}
                  name="Nom"
                  error={Boolean(touched.Nom) && Boolean(errors.Nom)}
                  helperText={touched.Nom && errors.Nom}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Prenom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Prenom}
                  name="Prenom"
                  error={Boolean(touched.Prenom) && Boolean(errors.Prenom)}
                  helperText={touched.Prenom && errors.Prenom}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Telephone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Telephone}
                  name="Telephone"
                  error={
                    Boolean(touched.Telephone) && Boolean(errors.Telephone)
                  }
                  helperText={touched.Telephone && errors.Telephone}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onClick={() => {
                    setErr();
                  }}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  onClick={() => {
                    setErr();
                  }}
                  value={values.password}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                  InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Tooltip title='autogénérer' placement="top" >
                      <IconButton onClick={() => handleGeneratePassword(setFieldValue)}>
                        <HealthAndSafety />
                      </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                />

                <input hidden value={values.Nom} type="text" name="name" />
                <input hidden value={values.email} type="email" name="Expert_email" />
                <input hidden value={values.password} type="password" name="password" />
               
              </Box>

              {/* BUTTONS */}
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: "#00D5FA",
                    color: "#FFFFFF",
                    "&:hover": { color: "#00D5FA" },
                  }}
                >
                  Ajouter
                  <div style={{ marginLeft: "5%" }}>
                    <ClipLoader
                      color={"#E6FBFF"}
                      loading={Send}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                </Button>
                {Err && <p className="error">{Err}</p>}
              </Box>
            </form>
          )}
        </Formik>
      ) : (
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nom & Prenom</TableCell>
                <TableCell align="left">Telephone</TableCell>
                <TableCell align="left">id</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {Experts.map((row) => (
                <TableRow
                  key={row.nom}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.nom}  {row.prenom}
                  </TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle("Livré")}>
                      {row.tel}
                    </span>
                  </TableCell>
                  <TableCell align="left">{row._id}</TableCell>
                  {/* <TableCell align="left">{row.date}</TableCell> */}
                
                  <TableCell align="left" className="Details">
                    Details
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
