import React, { useEffect, useState } from "react";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
   UilPostcard
} from "@iconscout/react-unicons";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";

import "./Cards.css";
// import { cardsData } from "../../Data/Data";

import Card from "../Card/Card";

var cardsData = [];

const Cards = () => {
  const [ressources, setressources] = useState([]);
  const Getressources = async () => {
    await fetch(`http://localhost:3001/ressources`, {
      method: "GET",
    })
      .then(async (data) => {
        const dataCmd = await data.json();
        console.log(dataCmd);
        setressources(dataCmd);
        cardsData = [
          {
            title: "Experts",
            color: {
              backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
              boxShadow: "0px 10px 20px 0px #e0c6f5",
            },
            barValue: 0,
            value: dataCmd[0],
            png: UilUsersAlt,
            series: [
              {
                name: "Sales",
                data: [31, 40, 28, 51, 42, 109, 100],
              },
            ],
          },
          {
            title: "Clients",
            color: {
              backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
              boxShadow: "0px 10px 20px 0px #FDC0C7",
            },
            barValue: 0,
            value: dataCmd[1],
            png: UilMoneyWithdrawal,
            series: [
              {
                name: "Clients",
                data: [10, 100, 50, 70, 80, 30, 40],
              },
            ],
          },
          {
            title: "Commandes",
            color: {
              backGround:
                "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
              boxShadow: "0px 10px 20px 0px #F9D59B",
            },
            barValue: 0,
            value: dataCmd[2],
            png: UilClipboardAlt,
            series: [
              {
                name: "Commandes",
                data: [10, 25, 15, 30, 12, 15, 20],
              },
            ],
          },
        ] 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=>{
    Getressources();
  },[]);

  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
