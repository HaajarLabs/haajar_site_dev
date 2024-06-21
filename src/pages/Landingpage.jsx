import * as React from "react";
import styles from "../style.js";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Stats from "../components/Stats.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

const Landingpage = () => {
  return (
    <div className=" w-full  text-black overflow-hidden scrollbar-thin scrollbar-webkit">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />{" "}
        </div>
      </div>

       
          
            <Hero />{" "}
      
   
        {/* <div className={` ${styles.paddingX}`}>
          <div className={`${styles.boxWidth}`}>
            <Stats />{" "}
          </div>
        </div> */}
 
      <Footer />
    </div>
  );
};

export default Landingpage;
