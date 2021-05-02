import React from "react";
import "../../../App.css";
import HeroSection from "../HeroSection";
import AboutUS from "../AboutUS";
import { homeObjOne, homeObjThree, homeObjTwo, homeObjFour } from "./Data";

function Home() {
  return (
    <div className="home">
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjTwo} />
      <HeroSection {...homeObjThree} />
      <HeroSection {...homeObjFour} />
      <AboutUS />
    </div>
  );
}
export default Home;
