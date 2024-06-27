import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";

import { FaWhatsappSquare } from "react-icons/fa";

const Social = ({linkedin,whatsapp,github,top}) => {
  return (
   <ul class={`example-2 flex mt-${top} z-50  text-3xl  justify-start gap-5 items-center`}>
<li><a href={linkedin}><FaLinkedin className=' hover:scale-110 ease-in-out transition duration-200' /></a></li>
<li><a  href={`whatsapp://send?phone=91${whatsapp}`}><FaWhatsappSquare className=' hover:scale-110 ease-in-out transition duration-200'  /></a></li>
<li><a href={github}><FaGithubSquare className=' hover:scale-110 ease-in-out transition duration-200'  /></a></li>
</ul>

  )
}

export default Social