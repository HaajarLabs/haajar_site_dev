import * as React from "react";
import Animatedroutes from "./Animatedroutes";
import {BrowserRouter as Router} from 'react-router-dom'
import ScrollToTop from './widgets/Scrolltotop';
import { Analytics } from "@vercel/analytics/react"
export default function App() {
  return (
    <Router>
       <ScrollToTop />
       <Animatedroutes/>
      </Router>
  );
}
