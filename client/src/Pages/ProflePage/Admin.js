import React, { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards/Cards";
import Table from "./components/Table/Table";
import TableExperts from "./components/Table/TableExperts";

import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RigtSide/RightSide";
import Sidebar from "./components/Sidebar";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "./Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../state";
import { useMediaQuery } from "@mui/material";

function App() {

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
//   console.log(window.innerWidth);

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
              {SidebarData.map((item, index) => {
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
            <Cards />
          )}
          
          {selected == 1 &&(
            <Table />
          )}

          {selected == 2 &&(
            <TableExperts />
          )}
          
        </div>

        {/* <RightSide /> */}
      </div>
   
  );
}

export default App;
