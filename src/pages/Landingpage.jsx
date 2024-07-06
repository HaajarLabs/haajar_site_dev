import * as React from "react";
import styles from "../style.js";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Footer from "../components/Footer.jsx";

import Features from "../components/Features.jsx";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const apiKey = process.env.SUPABASE_KEY;
const apiUrl = process.env.SUPABASE_URL;
const supabase = createClient(apiUrl, apiKey);
const Landingpage = () => {
  const navigate = useNavigate();
  // useEffect(() => async () =>{

  //  supabase.auth.getUser().then((user) => {
  //       console.log(user)
  //       // if (user.error.status == 400) {
  //       //   navigate("/Login");
  //       // }else{
  //       //   if (user.data.user.aud == "authenticated") {
  //       //     navigate("/Dashboard");
  //       //     getData(user.data.user.id);
  //       //   } else {
  //       //     navigate("/Login");
  //       //   }
  //       // }
  //     });

  
  // // supabase.auth.onAuthStateChange(async(event)=>{
  // //   if (event == "SIGNED_IN") {
  // //     navigate("/Dashboard")
  // //     console.log("Signed in")
  // //   } else {
  // //     console.log("Not signed in")
  // //     navigate("/")
  // //   }
  // // });
  // },[]);

  useEffect(() => {
      var accessTokenObj = JSON.parse(localStorage.getItem("sb-lgzjqxhqfstjgehntfxi-auth-token"));
if (accessTokenObj==null) {
  const searchParams = new URLSearchParams(location.search);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const verifyOtp = async () => {
    if (token_hash && type) {
      const { error } = await supabase.auth.verifyOtp({ type, token_hash });
      if (!error) {
        console.log("OTP verified successfully");
        supabase.auth.getUser().then((user) => {
          if ((user.error == null)) {
            if (user.data.user.aud == "authenticated") {
              navigate("/Dashboard");
              console.log("Signed in");
              getData(user.data.user.id);
            } else {
              navigate("/Login");
              console.log("Not signed in");
            }
          } else {
            console.log("Error verifying OTP:", error.message);
          }
        });
      } else {
        console.log("Error verifying OTP:", error.message);
      }
    } else {
      console.log("No token_hash or type found in URL");
    }
  };
  verifyOtp();
}else{
  if(accessTokenObj['user']['aud']=="authenticated"){
    navigate("/Dashboard")
    navigate(0)

  } else {
    navigate("/")
    navigate(0)
  }
   
}




 
   

 
  }, [location.search, navigate]);

  return (
    <div className=" w-full  text-black overflow-hidden ">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />{" "}
        </div>
      </div>
      <Hero />{" "}
    
          <Features />{" "}
      <Footer />
    </div>
  );
};

export default Landingpage;
