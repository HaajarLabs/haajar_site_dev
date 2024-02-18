import * as React from "react";
import styles from "./style";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-primary w-full text-white overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}><Navbar/> </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}><Hero/>   </div>
      </div>
      <div className={`bg-primary ${styles.paddingX}`}>
        <div className={`${styles.boxWidth}`}><Stats/>  <Footer/> </div>
      </div>
    </div>
  );
}
