import React from "react";
import Logo from "../Assets/Logo.png";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          {/* <img src={Logo} alt="" /> */}
          <img style={{ marginTop: '-10px'}} width={'130px'} height={'100px'} src={Logo} alt="" />
        </div>
    
        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span onClick={()=>{ navigate('/') }} >Accueil</span>
          <span onClick={()=>{ navigate('/Contact') }} >Aide</span>
          <span onClick={()=>{ navigate("/Login") }} >S'authentifier</span>
          <span onClick={()=>{ navigate('/Commande') }} >Commandez ?</span>
        </div>
        <div className="footer-section-columns">
          <span>244-5333-7783</span>
          <span>Livraisons@gmail.com</span>
          <span>Livraisons1@gmail.com</span>
          <span>Livraisons2@gmail.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Termes & conditions</span>
          <span>Politique de confidentialité</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
