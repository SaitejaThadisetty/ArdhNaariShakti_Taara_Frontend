import React from "react"
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import { RiInstagramFill } from "react-icons/ri"

export const Footer = () => {
  return (
    <>
      <footer className='boxItems'>
        <div className='container flex'>
          <p>Taara - All right reserved - Design & Developed by Team Taara</p>
          <div className='social'>
            <a href="#facebook" target="_blank">
                <BsFacebook className='icon' />
             </a>
             <a href="#insta" target="_blank">
                <RiInstagramFill className='icon' />
              </a>
             <a href="#twiter" target="_blank">
               <AiFillTwitterCircle className='icon' />
             </a>
             <a href="https://www.linkedin.com/in/vidushi-agarwal-a95885256" target="_blank"> 
               <AiFillLinkedin className='icon' />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
