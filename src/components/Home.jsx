import React, { useEffect, useState } from "react";
import homeBanner from "../assets/homeBanner.png";
import c1 from "../assets/c1.png";
import c2 from "../assets/c2.png";
import c3 from "../assets/c3.png";
import Products from "./Products";
import Caraousel from "./Caraousel";
import { API } from "../service/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [prodCount, setProdCount] = useState(8);

  useEffect(() => {
    const getProd = async () => {
      try {
        const response = await API.getProductsByCategory('bedroom');
        if (response.isSuccess) {
          setProducts(response.data);
        }
      } catch (error) {
        toast.error(error.msg);
      }
    };
    getProd();
  }, []);

  let navigate = useNavigate();

  const handleProducts = () => {
    setProdCount((prev) => prev + 8);
  };

  return (
    <div className="flex flex-col gap-10">
      <div
        className="hero min-h-[75vh] "
        style={{
          backgroundImage: `url(${homeBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-content flex justify-end items-center w-full p-5 xl:p-10">
          <div className="max-w-md bg-[#FFF3E3] p-5 rounded-lg">
            <span className="font-bold">New Arrival</span>
            <h1 className="text-2xl xl:text-4xl font-bold text-[#B88E2F]">
              Discover Our New Collection
            </h1>
            <p className="py-6">
              Explore our latest collection, where timeless elegance meets
              modern design. Discover the perfect pieces to elevate your home
              with style and sophistication.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="py-2 px-8 xl:py-4 xl:px-16 font-bold bg-[#B88E2F] text-white hover:bg-white hover:text-[#b88e2f] duration-300 ease-in-out border-[#b88e2f] border-2 border-solid"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center px-5 xl:px-40">
        <h1 className="text-xl xl:text-2xl font-bold">Browse The Range</h1>
        <span>
          Peruse our diverse selection and uncover treasures for every taste.
        </span>
      </div>
      <div className="flex flex-wrap gap-7 justify-center items-center px-5 xl:px-20 font-bold">
        <div className="flex flex-col justify-center items-center gap-3">
          <img src={c1} alt="collections" className="rounded-lg" />
          <span>Dining</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <img src={c2} alt="collections" className="rounded-lg" />
          <span>Living</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <img src={c3} alt="collections" className="rounded-lg" />
          <span>Bedroom</span>
        </div>
      </div>
      <div className="flex flex-col gap-10 justify-center items-center px-10 xl:px-40">
        <h1 className="text-2xl xl:text-3xl font-bold">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.length > 0 &&
            products.slice(0, prodCount).map((product) => {
              return <Products key={product._id} product={product} />;
            })}
        </div>
        {prodCount < products.length && (
          <button
            onClick={handleProducts}
            className="text-[#b88e2f] bg-white border-[#b88e2f] hover:bg-[#B88E2F] hover:text-white duration-300 ease-in-out border-2 border-solid py-4 px-16 font-bold"
          >
            Show More
          </button>
        )}
      </div>
      <div className="hero min-h-[65vh] bg-[#FFF3E3] flex flex-col xl:flex-row justify-center items-center">
        <div className="hero-content flex justify-center items-center xl:w-1/2 p-5">
          <div className="max-w-md">
            <h1 className="text-2xl xl:text-4xl font-bold">
              50+ Beautiful rooms inspiration
            </h1>
            <p className="py-6">
              Our designer already made a lot of beautiful room prototypes that
              will inspire you
            </p>
            <button onClick={()=>navigate('/shop')} className="py-2 px-8 xl:py-4 xl:px-16 font-bold bg-[#B88E2F] text-white hover:bg-white hover:text-[#b88e2f] duration-300 ease-in-out border-[#b88e2f] border-2 border-solid">
              Explore more
            </button>
          </div>
        </div>
        <div className="w-full xl:w-1/2 flex items-center justify-center p-5">
          <Caraousel />
        </div>
      </div>
    </div>
  );
};

export default Home;
