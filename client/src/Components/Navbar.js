/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";

import { CommentRounded, Home, Info, Login, Person, PhoneRounded, ShoppingCartRounded } from "@mui/icons-material";
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const Navbar = () => {
  const navigate = useNavigate(); 
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state)=> state.user);

  const menuOptions = [
    {
      text: "Accueil",
      icon: <Home />,
      path: "/"
    },
    {
      text: "À propos",
      icon: <Info />,
      path: "/About"
    },
    {
      text: "S'authentifier",
      icon: <Login />,
      path: "/Login"
    },
    {
      text: "Contact",
      icon: <PhoneRounded />,
      path: "/Contact"
    },
    // {
    //   text: "Cart",
    //   icon: <ShoppingCartRounded />,
    // },
  ];
  return (
    <nav>
      <div className="nav-logo-container">
        <img style={{ marginTop: '-10px'}} width={'130px'} height={'100px'} src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
        <a onClick={()=> {  navigate('/')}} >Accueil</a>
        <a onClick={()=> {  navigate('/About')}} >À propos</a>
        <a onClick={()=> {  navigate('/Login')}} >S'authentifier</a>
        <a onClick={()=> {  navigate('/Contact')}} >Contact</a>
       
        {
          user !== null && (
            <button onClick={()=>{ navigate('/Profile')}} className="primary-button">
              <Person style={{ marginTop: '5px'}} />
              <p>Profile</p>
            </button>
          )
        }
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding onClick={()=> {  navigate(`/${item.path}`)}}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            {
              user !== null && (
                <button onClick={()=>{ navigate('/Profile')}} className="primary-button">
                  <Person style={{ marginTop: '5px'}} />
                  <p>Profile</p>
                </button>
              )
            }
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;