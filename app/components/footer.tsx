import React from "react";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <div className=" bg-lightGray w-full footer">
      <div className="flex justify-center items-center  h-[100px] ">
      <div className="lg:flex justify-between items-center lg:w-[600px] sm:w-[300px] h-[100px] sm:hidden ">
          <SocialIcon url="https://twitter.com" />
          <SocialIcon  url="https://instagram.com" />
          <SocialIcon url="https://facebook.com" />
          <SocialIcon url="https://whatsapp.com" />
          <SocialIcon url="https://email.com" />
        </div>

        <div className="flex justify-between items-center w-[200px] h-[10px] lg:hidden">
          <SocialIcon style={{width:"30px", height:"30px"}} url="https://twitter.com" />
          <SocialIcon style={{width:"30px", height:"30px"}} url="https://instagram.com" />
          <SocialIcon style={{width:"30px", height:"30px"}} url="https://facebook.com" />
          <SocialIcon style={{width:"30px", height:"30px"}} url="https://whatsapp.com" />
          <SocialIcon style={{width:"30px", height:"30px"}} url="https://email.com" />
        </div>
      </div>
    </div>
  );
};


export default Footer;
