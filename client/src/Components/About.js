import React, { useState } from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Work from "./Work";
import { ArrowCircleUp } from "@mui/icons-material";

const About = () => {
  const [LearnMore , setLearnMore] = useState();

  return (
    <div>
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">À propos </p>
        <h1 className="primary-heading">
          {/* Food Is An Important Part Of A Balanced Diet
          Expédiez vos biens précieux en toute sécurité avec notre application de livraison dédiée
          Sécurisez vos envois précieux avec notre appli de livraison dédiée */}
          Vos envois précieux sont sécurisés avec nous !
        </h1>
        <p className="primary-text">
         Grâce à notre application de livraison d'objets précieux,
         vous pouvez désormais expédier en toute sécurité vos biens les plus précieux, 
        </p>
        <p className="primary-text">
          des bijoux aux documents importants,avec la tranquillité d'esprit que votre colis
          sera livré rapidement et en toute sécurité à sa destination.
        </p>
        <div className="about-buttons-container">
          { LearnMore ? <button className="secondary-button" onClick={()=>{ setLearnMore(false) }}> <ArrowCircleUp /> </button> : <button className="secondary-button" onClick={()=>{ setLearnMore(true) }}>Lire plus...</button>}
          {/* <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button> */}
        </div>
      </div>
    </div>

    {LearnMore ? <Work /> : <></> }
    
    </div>
  );
};

export default About;
