import React from 'react'
import { useSelector } from 'react-redux'
import AdminPanel from './Admin';
import ClientPanel from './ClientPanel';
import ExpertPanel from './ExpertPanel';

import BannerBackground from "../../Assets/home-banner-background.png";

const Profile = () => {
  const user = useSelector((state)=> state.user);
  const isAdmin = useSelector((state)=> state.isAdmin);
  const isClient = useSelector((state)=> state.isClient);
  const isExpert = useSelector((state)=> state.isExpert);


  return (
    <div className="ProfApp">
      <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
      {isAdmin === true &&(
        <AdminPanel />
      )}

      {isExpert === true &&(
        <ExpertPanel />
      )}

      {isClient === true &&(
        <ClientPanel />
      )}
    </div>
  )
}

export default Profile
