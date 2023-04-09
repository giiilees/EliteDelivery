import React from "react";
import CommandeForm from "../Assets/page-with-curl-svgrepo-com.svg";
import processing from "../Assets/people-business-and-finance-svgrepo-com.svg";
import DeliveryMeals from "../Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: CommandeForm,
      title: "Commandez",
      text: "Effectuez vos commandes en remplissant le formulaire de commande.",
    },
    {
      image: processing,
      title: "Traitement",
      text: "Votre commande sera traitée par l'administrateur, puis par l'expert pour définir l'estimation des frais d'assurance et de livraison.",
    },
    {
      image: DeliveryMeals,
      title: "Fast Deliveries",
      text: "Recevez vos Objets rapidement grâce à nos 'Livraisons rapides' ! Commandez maintenant et bénéficiez d'une livraison rapide et efficace",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        {/* <p className="primary-subheading">Work</p> */}
        <h1 className="primary-heading">Comment Ça Marche ?</h1>
        <p className="primary-text">
        Quelles sont les étapes à suivre pour bénéficier de nos services ?
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img width={'90px'} height={'89px'} src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
