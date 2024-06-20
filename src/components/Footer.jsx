import logo from "../assets/logo.png";
import { FaSquareGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { GiLaurelsTrophy } from "react-icons/gi";
import { PiSealCheckFill } from "react-icons/pi";
import { FaShippingFast } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const Footer = () => {

    const services = [
        {
            title:'High Quality',desc:'crafted from top materials',icon:<GiLaurelsTrophy size={45}/>
        },
        {
            title:'Warranty Protection',desc:'Over 2 years',icon:<PiSealCheckFill size={45}/>
        },
        {
            title:'Free Shipping',desc:'Order over $2000',icon:<FaShippingFast size={45}/>
        },
        {
            title:'24/7 Support',desc:'Dedicated Support',icon:<MdSupportAgent size={45}/>
        },
    ]

    const location = useLocation();

  return (
    <footer className="flex flex-col">
      {location.pathname !== "/" && location.pathname !== "/login" && (
        <footer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 bg-[#ffe3c0] px-10 py-16 ">
          {services.map((items, index) => {
            return (
              <div
                className="flex gap-3 items-center justify-start"
                key={index}
              >
                {items.icon}
                <div className="flex flex-col">
                  <span className="font-bold text-2xl">{items.title}</span>
                  <span>{items.desc}</span>
                </div>
              </div>
            );
          })}
        </footer>
      )}
      <footer className="footer border-t border-base-300 p-10 bg-base-200 text-base-content">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <FaLocationDot />
            <span className="font-bold">Address</span>
          </div>
          <span>FurniLux Showroom</span>
          <span>123 Evergreen Lane Oakwood City, CA 90210</span>
          <span>United States</span>
        </div>
        <nav>
          <h6 className="footer-title">Links</h6>
          <NavLink to={"/"} className="link link-hover">
            Home
          </NavLink>
          <NavLink to={"/shop"} className="link link-hover">
            Shop
          </NavLink>
          <NavLink to={"/about"} className="link link-hover">
            About
          </NavLink>
          <NavLink to={"/contact"} className="link link-hover">
            Contact
          </NavLink>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
        <aside className="items-center grid-flow-col">
          <img src={logo} alt="logo" />
          <p>
            FurniLux <br />
            Copyright &copy; 2024 All Rights Reserved
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <NavLink
              to={"https://linkedin.com/in/anbhv-singh"}
              target="__blank"
            >
              <FaLinkedin size={40} />
            </NavLink>
            <NavLink
              to={"https://github.com/Anubhav-Singh-24"}
              target="__blank"
            >
              <FaSquareGithub size={40} />
            </NavLink>
          </div>
        </nav>
      </footer>
    </footer>
  );
};

export default Footer;
