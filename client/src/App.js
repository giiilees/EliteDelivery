import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
import LoginPage from "./Pages/loginPage";
import Commande from "./Pages/Commande";
import Profile from "./Pages/ProflePage/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Commande' element={<Commande />} />


        </Routes>
        <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
