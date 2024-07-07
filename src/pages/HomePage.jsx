import * as React from "react";
import styles from "../style.js";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Intro from "../components/intro.jsx";
import Haajar from "../components/Haajar.jsx";
import Features from "../components/Features.jsx";
import Callout from "../components/Callout.jsx";
const Homepage = () => {
  // supabase.auth.onAuthStateChange(async(event)=>{
  //   if (event == "SIGNED_IN") {
  //     navigate("/Dashboard")
  //     console.log("Signed in")
  //   } else {
  //     console.log("Not signed in")
  //     navigate("/")
  //   }
  // });

  return (
    <div className=" w-full  text-black overflow-hidden scrollbar-thin scrollbar-webkit">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <Navbar />{" "}
      </div>
      <Hero /> <Intro /> <Haajar />
      <Features />
      <Callout />
      <Footer />
    </div>
  );
};

export default Homepage;
