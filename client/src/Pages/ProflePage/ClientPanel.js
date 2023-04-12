import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SidebarDataCl } from './Data/Data';
import Cards from "./components/Cards/Cards";
import Table from "./components/Table/Table";
import TableClient from "./components/Table/TableClient";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { setLogout } from "../../state";
import Commande from '../Commande';
import UserWidget from './components/UserWidjet';

const ClientPanel = () => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);

  const isMobileScreens = useMediaQuery("(max-width: 768px)");
  const isMobileScreens2 = useMediaQuery("(max-width: 1200px)");

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  console.log(window.innerWidth);

  const Deconnecter = () =>{
    dispatch( setLogout() )
    navigate('/')
  }
  return (
    <div className="AppGlass">
       <>
          
          <div
            className="sidebar"
            variants={sidebarVariants}
            animate={window.innerWidth <= 768 ? `${expanded}` : ""}
          >
          

            <div className="menu">
              {SidebarDataCl.map((item, index) => {
                return (
                  <div
                    className={
                      selected === index ? "menuItem active" : "menuItem"
                    }
                    key={index}
                    onClick={() => setSelected(index)}
                  >
                    <item.icon />
                    {isMobileScreens ? <></> : <span>{item.heading}</span> }
                  </div>
                );
              })}
              {/* signoutIcon */}
              <div onClick={()=>{ Deconnecter()}} className="menuItemDec">
                <UilSignOutAlt />
                {isMobileScreens2 ? <></> : <span>Deconnecter</span> }

              </div>
            </div>
          </div>
        </>

        <div className="MainDash">
          {selected == 0 &&(
            <UserWidget />
          )}
          
          {selected == 1 &&(
            <Commande />
          )}

          {selected == 2 &&(
            <TableClient />
          )}
          
        </div>
    </div>
  )
}

export default ClientPanel
