import React from "react";
import {
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Phone,
  Email,
  Person2Outlined,
  Send,
  VisibilityOff,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  IconButton,
  Button,
  Switch,
  TextField,
  InputAdornment,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { setUser, setLogout } from "../../../state";
import {
  FcExpand,
  FcOldTimeCamera,
  FcCamera,
  FcCollapse,
  FcSurvey,
  FcUndo,
  FcLock,
} from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";

const updateSchema = yup.object().shape({
  nom: yup.string().required("requis"),
  prenom: yup.string().required("requis"),
  tel: yup
    .string()
    .matches(/^[0-9]+$/, "Ce champ ne doit contenir que des nombres")
    .required("requis"),
  email: yup.string().email("invalid email").required("requis"),
});

const PasswordsSchema = yup.object().shape({
  Password: yup.string().required("required"),
  NewPassword: yup
    .string()
    .required("required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[A-Z]).{8,}$/,
      "Password must contain at least 1 uppercase letter and 1 number"
    ),
  ConfirmPass: yup
    .string()
    .required("required")
    .oneOf([yup.ref("NewPassword")], "Passwords must match"),
});

const UserWidget = ({ userId, picturePath }) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const isExpert = useSelector((state) => state.isExpert);
  const isClient = useSelector((state) => state.isClient);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:500px)");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [Err, setErr] = useState("");
  const [Edit, setEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ChangePassword, setChangePassword] = useState(false);

  const Updateinfos = {
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    tel: user.tel,
    id: user._id,
  };

  const PasswordsValues = {
    Password: "",
    NewPassword: "",
    ConfirmPass: "",
  };

  // const { error } = updateSchema.validate(infos);

  const PassChange = async (infos, onSubmitProps) => {
    console.log(infos);
    const Obj = {
      password: infos.Password,
      NewMdp: infos.NewPassword,
    };

    if (isClient) {
      await fetch(`http://localhost:3001/ClientPassword/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Obj),
        method: "POST",
      })
        .then(async (data) => {
          console.log(data);
          const NewUserObj = await data.json();

          if (NewUserObj.msg == "Incorrect Password.") {
            setErr("Votre mot de passe et incorrect ...");
          } else if (NewUserObj._id == user._id) {
            toast(
              <div>
                <h2>Success!</h2>
                <p>
                  Votre mot de passe a été modifié. Vous serez déconnecté et
                  redirigé vers la page de Connexion pour vous reconnecter.
                </p>
              </div>,
              {
                type: "success",
                position: "top-right",
                style: {
                  background: "#ff1744",
                  color: "#fff",
                },
                duration: 4000,
              }
            );
            setTimeout(() => {
              dispatch(setLogout());
              navigate("/login");
            }, 4000);
          }

          // console.log(NewUserObj);
        })
        .catch((err) => {
          console.log(err);
          setErr("Oops! Quelque chose s'est mal passé , réessayer SVP !");
        });
    }
    if (isExpert) {
      await fetch(`http://localhost:3001/ExpertPassword/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Obj),
        method: "POST",
      })
        .then(async (data) => {
          console.log(data);
          const NewUserObj = await data.json();

          if (NewUserObj.msg == "Incorrect Password.") {
            setErr("Votre mot de passe et incorrect ...");
          } else if (NewUserObj._id == user._id) {
            toast(
              <div>
                <h2>Success!</h2>
                <p>
                  Votre mot de passe a été modifié. Vous serez déconnecté et
                  redirigé vers la page de Connexion pour vous reconnecter.
                </p>
              </div>,
              {
                type: "success",
                position: "top-right",
                style: {
                  background: "#ff1744",
                  color: "#fff",
                },
                duration: 4000,
              }
            );
            setTimeout(() => {
              dispatch(setLogout());
              navigate("/login");
            }, 4000);
          }

          // console.log(NewUserObj);
        })
        .catch((err) => {
          console.log(err);
          setErr("Oops! Quelque chose s'est mal passé , réessayer SVP !");
        });
    }
  };

  const UpdateInfos = async (infos, onSubmitProps) => {
    console.log(infos);
    console.log(isClient);
    console.log(isExpert);

    if (isClient) {
      await fetch(`http://localhost:3001/UpdateProfileCl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infos),
      })
        .then(async (data) => {
          const dataUser = await data.json();
          if (dataUser.length !== 0) {
            console.log(dataUser);
            dispatch(setUser(dataUser));
            setEdit(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (isExpert) {
      await fetch(`http://localhost:3001/UpdateProfileExp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infos),
      })
        .then(async (data) => {
          const dataUser = await data.json();
          if (dataUser.length !== 0) {
            console.log(dataUser);
            dispatch(setUser(dataUser));
            setEdit(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (ChangePassword) {
      await PassChange(values, onSubmitProps);
    } else {
      await UpdateInfos(values, onSubmitProps);
    }
  };

  return (
    <Box
      padding="1.5rem 1.5rem 0.75rem 1.5rem"
      backgroundColor="#FFFFFF"
      width={"100%"}
      height={"100%"}
    >
      <Toaster />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={ChangePassword ? PasswordsValues : Updateinfos}
        validationSchema={ChangePassword ? PasswordsSchema : updateSchema}
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
            {ChangePassword ? (
              <>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <Box>
                    <Tooltip placement="top" title="Retour">
                      <IconButton
                        onClick={() => {
                          setChangePassword(false);
                        }}
                      >
                        <FcUndo />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Password}
                    onClick={() => {
                      setErr();
                    }}
                    name="Password"
                    error={
                      Boolean(touched.Password) && Boolean(errors.Password)
                    }
                    helperText={touched.Password && errors.Password}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.NewPassword}
                    onClick={() => {
                      setErr();
                    }}
                    name="NewPassword"
                    error={
                      Boolean(touched.NewPassword) &&
                      Boolean(errors.NewPassword)
                    }
                    helperText={touched.NewPassword && errors.NewPassword}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    label="Confirm your password"
                    type={showPassword ? "text" : "password"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ConfirmPass}
                    onClick={() => {
                      setErr();
                    }}
                    name="ConfirmPass"
                    error={
                      Boolean(touched.ConfirmPass) &&
                      Boolean(errors.ConfirmPass)
                    }
                    helperText={touched.ConfirmPass && errors.ConfirmPass}
                    sx={{ gridColumn: "span 4" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
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
                    Changer
                  </Button>
                  {Err && <p className="error">{Err}</p>}
                </Box>

                {/* </form> */}
              </>
            ) : (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap="0.5rem"
                  pb="1.1rem"
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="1rem"
                  >
                    <Box
                      alignItems={"center"}
                      width={"50px"}
                      height={"50px"}
                      borderColor={"Background"}
                    >
                      <Person2Outlined fontSize="large" />
                    </Box>
                    <Box>
                      {Edit ? (
                        <>
                          {/* les input pour la modification */}

                          <TextField
                            label="nom"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.nom}
                            name="nom"
                            error={Boolean(touched.nom) && Boolean(errors.nom)}
                            helperText={touched.nom && errors.nom}
                            sx={{ gridColumn: "span 2" }}
                          />
                          <TextField
                            label="prenom"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.prenom}
                            name="prenom"
                            error={
                              Boolean(touched.prenom) && Boolean(errors.prenom)
                            }
                            helperText={touched.prenom && errors.prenom}
                            sx={{ gridColumn: "span 2" }}
                          />
                        </>
                      ) : (
                        <>
                          <Typography
                            variant="h4"
                            color={"#333333"}
                            fontWeight="500"
                            sx={{
                              "&:hover": {
                                color: "#E6FBFF",
                                cursor: "pointer",
                              },
                            }}
                          >
                            {user.nom}
                          </Typography>
                          <Typography color={"#333333"}>
                            {" "}
                            {user.prenom}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <Tooltip placement="top" title="Modifier vos information">
                      <IconButton
                        onClick={() => {
                          setEdit(!Edit);
                        }}
                        sx={{ backgroundColor: "#FFFFFF" }}
                      >
                        <EditOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement="top" title="Changer votre mot de passe">
                      <IconButton
                        onClick={() => {
                          setChangePassword(true);
                        }}
                      >
                        <FcLock />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Divider />

                {/* SECOND ROW */}
                <Box p="1rem 0">
                  {Edit ? (
                    <>
                      <Box display="flex" alignItems="center" gap="1rem">
                        <Email fontSize="large" sx={{ color: "#666666" }} />
                        <TextField
                          label="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          error={
                            Boolean(touched.email) && Boolean(errors.email)
                          }
                          helperText={touched.email && errors.email}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap="1rem"
                        mb="0.5rem"
                      >
                        <Phone fontSize="large" sx={{ color: "#666666" }} />

                        <TextField
                          label="tel"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.tel}
                          name="tel"
                          error={Boolean(touched.tel) && Boolean(errors.tel)}
                          helperText={touched.tel && errors.tel}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </Box>
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
                        Mise a jour
                        <IconButton
                          sx={{ background: "green" }}
                          // onClick={ () => {
                          //   UpdateInfos()
                          // }}
                        >
                          <Send />
                        </IconButton>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Box display="flex" alignItems="center" gap="1rem">
                        <Email fontSize="large" sx={{ color: "#666666" }} />
                        <Typography color={"#A3A3A3"}>{user.email}</Typography>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        gap="1rem"
                        mb="0.5rem"
                      >
                        <Phone fontSize="large" sx={{ color: "#666666" }} />
                        <Typography color={"#A3A3A3"}>{user.tel}</Typography>
                      </Box>
                    </>
                  )}
                </Box>

                <Divider />

                <Divider />
              </>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UserWidget;
