
import React from "react";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";

const NavbarOverlay = ({ navbarOpen, setNavbarOpen }) => {
    const router = useRouter();
    const [user] = useAuthState(auth);

  return (
    <nav
      className={` fixed flex top-0 left-0 w-full p-10 z-10 h-screen navbarOverlay text-white bg-opacity-100 transform delay-100 transition-all duration-300 ${
        navbarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
      }`}
    >
      <ul className="w-full flex flex-col items-start navbar-overlay-container">
        
              
        <li className="nav-li nav-txt">
          <Link
            href="/"
            className="nav-link text-white"
            onClick={(e) => {
              e.preventDefault();
              setNavbarOpen(false);
              router.push('/')
            }}
          >
            Home
          </Link>
        </li>
        {user? <>
          
        
          <div
            href="/"
            className="nav-link text-black"
            onClick={(e) => {
              e.preventDefault();
              setNavbarOpen(false);
              signOut(auth);
            }}
          >
            Log Out
          </div>
        </> : <>
        
        <li className="nav-li nav-txt">
          <Link
            href="/"
            className="nav-link text-white"
            onClick={(e) => {
              e.preventDefault();
              setNavbarOpen(false);
              router.push(`/login`)
            }}
          >
            Login
          </Link>
        </li>
        </>}
        
      </ul>
    </nav>
  );
};

export default NavbarOverlay;