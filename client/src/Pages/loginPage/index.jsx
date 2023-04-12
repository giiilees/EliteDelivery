import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import React from "react";
import BannerBackground from "../../Assets/home-banner-background.png";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <div  className="home-container" >
      <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={'#FFFFFF'}
      >
        <Typography fontWeight="200" variant="h6" sx={{ mb: "1.5rem" }}>
          Bienvenue sur EliteDelivery  !
        </Typography>
        <Form />
      </Box>
      </div>
  );
};

export default LoginPage;
