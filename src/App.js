import HomeData from "./Components/HomeData";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import React from "react";
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";


function App() {
  return (
    <div >
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/general' element={<HomeData category='General'/>} />
          <Route path='/business' element={<HomeData category='Business'/>} />
          <Route path='/entertainment' element={<HomeData category='Entertainment'/>} />
          <Route path='/health' element={<HomeData category='Health'/>} />
          <Route path='/science' element={<HomeData category='Science'/>} />
          <Route path='/sports' element={<HomeData category='Sports'/>} />
          <Route path='/technology' element={<HomeData category='Technology'/>} />
        </Routes> 
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
