import React from "react";
import Logo from "../../assets/Logo.svg";
import { scrollToSection } from "../../utils";

function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center h-[60px]">
      <img src={Logo} alt="logo" className="h-[26px] w-[104px]" />
      <div className="flex">
        <div
          onClick={(e) => {
            scrollToSection(e, "#users");
          }}
          className="w-[100px] h-[34px] bg-[#F4E041] hover:bg-[#FFE302] flex justify-center items-center rounded-full mr-2 cursor-pointer"
        >
          <p>Users</p>
        </div>
        <div
          onClick={(e) => {
            scrollToSection(e, "#signUp");
          }}
          className="w-[100px] h-[34px] bg-[#F4E041] hover:bg-[#FFE302] flex justify-center items-center rounded-full cursor-pointer"
        >
          <p>Sign Up</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
