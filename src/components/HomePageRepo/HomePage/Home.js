import React from "react";
import "../../../App.css";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import HeroSection from "../HeroSection";
import AboutUS from "../AboutUS";
import { homeObjOne, homeObjThree, homeObjTwo, homeObjFour } from "./Data";

function Home() {
  return (
    <div className="home">
        <Navbar />
        <HeroSection {...homeObjOne} />
        <HeroSection {...homeObjTwo} />
        <HeroSection {...homeObjThree} />
        <HeroSection {...homeObjFour} />
        <AboutUS />
        <Footer />
    </div>
  );
}
export default Home;
