import { NavLink } from "react-router-dom";
import aboutBanner from "../assets/about_banner.jpg";
import logo from "../assets/logo.png";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import {toast} from 'react-toastify'

const Contact = () => {
  const generalInfo = [
    {
      title: "Address",
      line1: "FurniLux Showroom",
      line2: `123 Evergreen Lane Oakwood City, CA 90210`,
      line3: "United States",
      icon: <FaLocationDot />,
    },
    {
      title: "Phone",
      line1: "Mobile: (555) 123-4567",
      line2: "Landline: (555) 765-4321",
      line3: "Hotline: (555) 987-6543",
      icon: <FaPhoneAlt />,
    },
    {
      title: "Working Time",
      line1: "Monday-Friday: 09:00 - 22:00",
      line2: "Saturday-Sunday: 09:00 - 21:00",
      line3: "Closed on festive holidays",
      icon: <IoTime />,
    },
  ];

  const [data,setData] = useState({name:'',email:'',message:''})
  const [loading,setLoading] = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault();
    setLoading(true)
    emailjs.send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      {
        from_name: data.name,
        to_name: "Anubhav",
        from_email: data.email,
        to_email: "anubhavsingh.2406@gmail.com",
        message: data.message,
      },
      import.meta.env.VITE_PUBLIC_KEY
    ).then(()=>{
      setLoading(false);
      toast.success("Message sent successfully");
      setData({name:'',email:'',message:''});
    }).catch((error)=>{
      setLoading(false);
      toast.error("Message was not sent")
    })
  }

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setData({
      ...data,[name]:value
    })
  }

  return (
    <div className="flex flex-col w-full gap-20 pb-10">
      <div className="relative flex items-center justify-center w-full xl:h-[40vh] h-[30vh]">
        <img
          src={aboutBanner}
          alt="about"
          className="w-full h-full opacity-65 rounded-3xl"
        />
        <div className="absolute backdrop-blur-sm w-full rounded-3xl h-full flex flex-col gap-3 justify-center items-center">
          <img src={logo} alt="logo" className="w-10" />
          <span className="text-3xl font-semibold">Contact</span>
          <div className="flex gap-2 items-center">
            <NavLink to={"/"} className="hover:underline font-bold">
              Home
            </NavLink>
            <span className="font-bold text-lg">&gt;</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-7 md:px-40 px-10 justify-center items-center">
        <h1 className="text-4xl font-bold text-center">Get In Touch With Us</h1>
        <p className="text-center">
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Will Always Be There To Help You Out. Do
          Not Hesitate!
        </p>
      </div>
      <div className="w-full flex md:flex-row flex-col gap-10 justify-center items-center">
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center">
          <div className="flex flex-col gap-8 md:px-5 px-10">
            {generalInfo.map((items, index) => {
              return (
                <div className="flex flex-col gap-2" key={index}>
                  <div className="flex gap-2 justify-start items-center">
                    {items.icon}
                    <span className="font-bold">{items.title}</span>
                  </div>
                  <span>{items.line1}</span>
                  <span>{items.line2}</span>
                  <span>{items.line3}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="md:w-1/2 w-full flex flex-col gap-5 justify-center items-center md:px-5 px-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                id="name"
                name="name"
                required={true}
                value={data.name}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold">
                Email Address
              </label>
              <input
                type="text"
                placeholder="abc@example.com"
                id="email"
                name="email"
                required={true}
                value={data.email}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-semibold">
                Message
              </label>
              <textarea
                className="textarea textarea-bordered focus:outline-none w-full max-w-md"
                placeholder="Message"
                id="message"
                name="message"
                required={true}
                value={data.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={!data.name || !data.email || !data.message || loading}
              className="p-3 rounded-lg font-bold duration-300 ease-in-out max-w-xs text-white bg-[#B88E2F] hover:bg-white hover:text-[#B88E2F] border-[#b88e2f] border-2 border-solid"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
