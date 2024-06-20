import { NavLink } from "react-router-dom";
import aboutBanner from "../assets/about_banner.jpg";
import logo from "../assets/logo.png";
import { useState , useEffect} from "react";
import { API } from "../service/api";
import Products from "./Products";
import { toast } from "react-toastify";

const Shop = () => {

  const [products, setProducts] = useState([]);
  const [prodCount, setProdCount] = useState(8);

  useEffect(() => {
    const getProd = async () => {
      try {
        const response = await API.getAllProducts();
        if (response.isSuccess) {
          setProducts(response.data);
        }
      } catch (error) {
        toast.error(error.msg);
      }
    };
    getProd();
  }, []);

  


  const handleProducts = () => {
    setProdCount((prev) => prev + 8);
  };

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
          <span className="text-3xl font-semibold">Shop</span>
          <div className="flex gap-2 items-center">
            <NavLink to={"/"} className="hover:underline font-bold">
              Home
            </NavLink>
            <span className="font-bold text-lg">&gt;</span>
            <span>Shop</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 justify-center items-center px-10 xl:px-40">
        <h1 className="text-2xl lg:text-3xl font-bold">Our Products</h1>
        {products.length === 0 ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-[#bb8e2f]"></span>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
