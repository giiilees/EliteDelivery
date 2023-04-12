import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Livrez en toute sécurité vos objets précieux!
          </h1>
          <p className="primary-text">
            Profitez d'une livraison rapide et fiable pour tous vos objets précieux avec notre application!
          </p>
          <button onClick={()=>{ navigate('/Commande')}} className="secondary-button">
            Commandez <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
