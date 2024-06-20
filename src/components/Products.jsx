import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = ({ product }) => {
  const [show, setShow] = useState(false);
  let navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="card card-compact w-full h-68 bg-base-100 relative shadow-xl cursor-pointer "
    >
      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-fit"
        />
      </figure>
      <div
        className={`w-full h-full rounded-xl bg-black absolute transition-opacity duration-500 ${
          show ? "opacity-55" : "opacity-0"
        }`}
      ></div>
      <div className="card-body bg-gray-100">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.desc}</p>
        <span className="font-semibold">${product.price}</span>
      </div>
      <div className="w-full h-full rounded-xl absolute flex justify-center items-center">
        <button
          onClick={() => navigate(`/product/${product._id}`)}
          className={`absolute text-[#b88e2f] bg-white border-[#b88e2f] hover:bg-[#B88E2F] hover:text-white duration-300 ease-in-out border-2 border-solid py-4 px-16 font-bold  transition-all ${
            show ? "lg:opacity-100" : "opacity-0"
          }`}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Products;
