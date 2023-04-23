import React, {useState, useEffect} from "react";

import Link from 'next/link';


const NavbarHeader = ({ navbarOpen, setNavbarOpen }) => {
  
    const [matches, setMatches] = useState(
      false
      )
    

  return (
    <div className="nav-back">
        {!matches && (<>
        <header className="BNavbar w-full top-0 left-0 flex z-20">
      
      <button
      className="flex top-0 right-0 z-20 relative w-10 h-8 text-black focus:outline-none"
      onClick={() => setNavbarOpen(!navbarOpen)}
    >
      <div className="bar-container absolute w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        <span
          className={`bar absolute h-0.5 w-5 bg-black transform transition duration-300 ease-in-out ${
            navbarOpen ? "rotate-45 delay-200" : "-translate-y-1.5"
          }`}
        ></span>
        <span
          className={`bar absolute h-0.5 bg-black transform transition-all duration-200 ease-in-out ${
            navbarOpen ? "w-0 opacity-50" : "w-5 delay-200 opacity-100"
          }`}
        ></span>
        <span
          className={`bar absolute h-0.5 w-5 bg-black transform transition duration-300 ease-in-out ${
            navbarOpen ? "-rotate-45 delay-200" : "translate-y-1.5"
          }`}
        ></span>
      </div>
    </button>
    {/* Logo */}
    <div className="logo-container flex-grow z-20">
      <p onClick={() => navigate('/')}>bimi</p>
    </div>
      
     
      
    
    
  </header>
  
  </>)}

      
    {matches && (<>
    <header className="BNavbar-big-screen w-full top-0 left-0 z-20">
    <div className=" container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      <div className=" cursor-pointer pt-4 flex flex-col w-full md:w-1/2 justify-center items-start  md:text-left">
        <p className="logo-big" onClick={() => navigate('/')}></p>
      </div>

      <div className=" h-full md:w-1/2 pl-4 py-6 flow-root relative the-font">
       
          
          <a className="float-right navbar-link cursor-pointer the-font" style={{fontFamily:'Cinzel', fontSize: '25px'}} href="/">Home</a>
      </div>
    </div>
      
    </header>
  
  </>)}
 
    
    </div>
  );
};
export default NavbarHeader;