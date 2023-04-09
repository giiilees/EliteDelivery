import React from "react";
import { useState } from "react";
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
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlineOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import ClipLoader from "react-spinners/ClipLoader";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddressInput from "../Components/AddressInput";
import AddressInput2 from "../Components/AddressInput2";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const CommandeSchema = yup.object().shape({
  Nom: yup.string().required("requis"),
  Prenom: yup.string().required("requis"),
  email: yup.string().email().required("requis"),
  tel: yup.string().required("requis"),
  adresseD: yup.object().test('notEmpty', 'Adresse de départ est obligatoire', (obj) => {
    return Object.keys(obj).length > 0;
  }),
  adresseA: yup.object().test('notEmpty', 'Adresse d\'arrivée est obligatoire', (obj) => {
    return Object.keys(obj).length > 0;
  }),
  pictures: yup.array().min(1 , 'Veillez importer au moins une photo'),
  // picture: yup.string().required("requis"),
});



const CommandeForm = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=>  state.user);
  const token = useSelector((state)=>  state.token);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [showPassword, setShowPassword] = useState(false);
  const [Send, setSend] = useState(false);
  const [images, setImages] = useState([]);
  const [Err, setErr] = useState();

  const initialValuesCommande = {
    Nom: user.nom,
    Prenom: user.prenom,
    email: user.email,
    tel: user.tel,
    adresseD: {},
    adresseA: {},
    pictures: [],
    // picture: "",

  };

  const imagesPut = async (values, onSubmitProps) => {

    const formData = new FormData();
    formData.append("picture", values);

    // for (let value in values) {
    //   formData.append(value, values[value]);
    // }
    console.log(formData);
    const savedUserResponse = await fetch(
      "http://localhost:3001/imagePut",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();

    if (savedUser.error){
      setErr(savedUser.error);
    }else{
      console.log('donne');
    }
  }


  const Commandez = async (values, onSubmitProps) => {

      setSend(true);
      for (let index = 0; index < values.pictures.length; index++) {
        const element = values.pictures[index];
        imagesPut(element, onSubmitProps);
        console.log(element);
      }
      const picturesPath = values.pictures.map((obj) => obj.name);
      const DataCmd = {
        id: user._id,
        Nom: values.Nom,
        Prenom: values.Prenom,
        Telephone: values.tel,
        adresseD: values.adresseD,
        adresseA: values.adresseA,
        pictures: values.pictures,
        picturesPath: picturesPath,
        Etat: 'En attente',
        Prix: 0,
      };

      const formData = new FormData();
      formData.append("images", values.pictures[0]);
      console.log(formData);

      // const imagesFetch = await fetch('/upload-images', {   
      //   method: "POST",
      //   // headers: { Authorization: `Bearer ${token}` , 'Content-Type': 'application/json'},
      //   body: formData
      // }).catch((err)=>{
      //   console.log(err.message);
      // });

      // console.log(imagesFetch);
  
      const response = await fetch(`http://localhost:3001/Commande`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` , 'Content-Type': 'application/json'},
        body: JSON.stringify(DataCmd),
      }).catch((err)=>{
        console.log(err.message);
      });

      const Commande = await response.json();
      if(Commande.message){
        setErr("Une erreur s'est produit, le repas n'a pas été enregistrer ; vérifier bien les informations saisies et réessayer Svp!")
      }else {

        toast(
          <div>
            <h2>Success!</h2>
            <p>
            Votre commande a été enregistrée. 
            Elle sera traiteé par l'administrateur et l'expert; 
            Vous pouvez suivre sont etat a partire de votre profile ; Merci.
            </p>
          </div>,
          {
            type: "success",
            position: "top-center",
            style: {
              background: "rgb(145 254 159 / 47%)",
              color: "#fff",
            },
            duration: 4000,
          }
        );

        onSubmitProps.resetForm();
        setImages([])
        setTimeout(() => {
         setSend(false);
         navigate('/Profile');
        }, 4000);

      }
   
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await Commandez(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesCommande}
      validationSchema={CommandeSchema}
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
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
            }}
          > 

          <Toaster />

            <Box 
              gridColumn="span 4"
              border={`1px solid #A3A3A3`}
              borderRadius="5px"
              p="1rem">
             <AddressInput  Update={setFieldValue} />
              {errors.adresseD && <p className="error" style={{  color: "red"}}>{errors.adresseD}</p>}
            </Box>

            <Box 
              gridColumn="span 4"
              border={`1px solid #A3A3A3`}
              borderRadius="5px"
              p="1rem">
             <AddressInput2  Update={setFieldValue} />
             {errors.adresseA && <p className="error" style={{  color: "red"}}>{errors.adresseA}</p>}
            </Box>

            <TextField
              label="Nom"
              onBlur={handleBlur}
              // onChange={handleChange}
              value={values.Nom}
              name="Nom"
              error={Boolean(touched.Nom) && Boolean(errors.Nom)}
              helperText={touched.Nom && errors.Nom}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Prenom"
              onBlur={handleBlur}
              // onChange={handleChange}
              value={values.Prenom}
              name="Prenom"
              error={Boolean(touched.Prenom) && Boolean(errors.Prenom)}
              helperText={touched.Prenom && errors.Prenom}
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
              sx={{ gridColumn: "span 2" }}
            />

             <TextField
              label="Telephone"
              onBlur={handleBlur}
              onChange={handleChange}
              onClick={() => {
                setErr();
              }}
              value={values.tel}
              name="tel"
              error={Boolean(touched.tel) && Boolean(errors.tel)}
              helperText={touched.tel && errors.tel}
              sx={{ gridColumn: "span 2" }}
            />

            <Box
              gridColumn="span 8"
              border={`1px solid #A3A3A3`}
              borderRadius="5px"
              p="1rem"
              alignItems={'center'}
              display={'ruby-base'}
            >
              {errors.pictures && <p className="error" style={{  color: "red"}}>{errors.pictures}</p>}

              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={true}
                onDrop={(acceptedFiles) => {
                  // console.log(images);
                  // console.log(acceptedFiles[0]);

                  setImages([...images, acceptedFiles[0]]);
                  setFieldValue("pictures", [...images, acceptedFiles[0]]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed #00D5FA`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } , display: 'block ruby' }}
                  >
                    <input {...getInputProps()} />
                    {values.pictures.length === 0 ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <Box>
                        <Typography>{values.pictures[0].name}</Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Dropzone>

              {/* <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >   
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed #00D5FA`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <Box >
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Dropzone> */}
            </Box>

            {images.length !== 0 &&(
                <Box
              gridColumn="span 8"
              border={`1px solid #A3A3A3`}
              borderRadius="5px"
              p="1rem"
            >
              {values.pictures && (
                <Box mt={2} display="flex" flexWrap="wrap" flexDirection={'row'} style={{ width:'100%' }}>
                  {images.map((image, index) => (
                    <Box key={index} mr={2} position="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        style={{ maxWidth: "120px", height: "240" }}
                      />
                      <IconButton
                        onClick={(index) => {
                          const newImages = [...images];
                          newImages.splice(index, 1);
                          setImages(newImages);
                          setFieldValue("picture", newImages);
                        }}
                        style={{ position: "absolute", top: 0, right: 0 , backgroundColor:'#00D5FA'}}
                      >
                        <DeleteOutlineOutlined />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
            )}

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
              COMMANDEZ
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
            {/* <Typography
               onClick={() => {
                 setPageType(isLogin ? "register" : "login");
                 resetForm();
               }}
               sx={{
                 textDecoration: "underline",
                 color: palette.primary.main,
                 "&:hover": {
                   cursor: "pointer",
                   color: palette.primary.light,
                 },
               }}
             >
               {isLogin
                 ? "Vous n'avez pas de compte ? Inscrivez-vous ici."
                 : "Vous avez déjà un compte ? Connectez-vous ici."}
             </Typography> */}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default CommandeForm;

