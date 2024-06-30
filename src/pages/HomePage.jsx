import * as React from "react";
import styles from "../style.js";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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

export default Homepage;