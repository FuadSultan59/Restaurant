// import AboutUsComponent from "../Components/aboutusComponent";
import AboutUsComponent from '../components/aboutusComponent'
import React from "react";
import HeaderComponent from "../components/headerComponent";

function AboutUs() 
{
  
    return (
      <>
      < HeaderComponent caller = {'About-us'}/>
      <AboutUsComponent />
      </>
  );
}

export default AboutUs;