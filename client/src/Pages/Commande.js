import React, { useEffect } from "react";
import CommandeForm from "./CommandeForm";
import BannerBackground from "../Assets/home-banner-background.png";
import AboutBackground from "../Assets/about-background.png";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const Commande = () => {
  const user = useSelector((state)=> state.user);
  var Nouser = false
  const navigate = useNavigate();

  const alertUser = () =>{
   if ( Nouser === false  ){
    Nouser = true ;
    toast(
        <div>
          <h2>Erreur</h2>
          <p>Vous devez tout d'abord se connecter a votre compte ; Merci.</p>
        </div>,
        {
          type: "error",
          position: "top-center",
          style: {
            background: "#ff1744",
            color: "#fff",
          },
          duration: 4000,
        }
      );
      setTimeout(() => {
        navigate("/Login");
      }, 4000);
   }
  }

  useEffect(() => {
    if (user == null && Nouser == false) {
      alertUser();
    }
  }, []);

  return (
    <div className="work-section-wrapper ">
      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" />
      </div>
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="work-section-top">
       <Toaster />
      </div>

      {user == null && (
        <div className="White-block"> </div>
      )}

      {user !== null && (
        <>
          <div className="work-section-top">
            <h1 className="primary-heading">Passez votre commande</h1>
            <p className="primary-text">
              On remplisant ce formulaire , vous allez passez une commande de
              livraisons qui sera traiter par l'expert pour evaluer les montant
              d'assurance et de livraison
            </p>
          </div>
          <div className="testimonial-section-bottom">
            <CommandeForm />
          </div>
        </>
      )}
    </div>
  );
};

export default Commande;
