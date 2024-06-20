import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/common_utils";
import { DataContext } from "../context/DataProvider";
import { API } from "../service/api";
import { toast } from "react-toastify";

const Navbar = ({ isauthenticated, setIsAuthenticated }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let [amount, setAmount] = useState(0);
  const [cart,setCart] = useState([])
  const navList = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];

  const { setName, name, added } = useContext(DataContext);
  let navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    if (logoutUser()) {
      setName("");
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await API.getCartItems();
        if (res.isSuccess) {
          setCart(res.data);
          console.log(cart.length)
        }
      } catch (error) {
        toast.error(error.msg);
      }
    };
    if (isauthenticated) {
      getCart();
    }
  }, [added,isauthenticated]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const totalAmount = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setAmount(totalAmount);
    }
  }, [cart]);



  return (
    <div className="navbar bg-base-100 flex justify-between items-center px-4">
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMobileMenu}
          className="text-black focus:outline-none md:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <img src={logo} alt="logo" className="h-8 w-8" />
        <NavLink
          to={"/"}
          className="font-bold text-xl cursor-pointer hidden md:block"
        >
          FurniLux
        </NavLink>
      </div>
      <div className="hidden md:flex justify-center">
        <ul className="flex justify-center items-center gap-10">
          {navList.map((items, index) => (
            <li
              className="font-bold cursor-pointer hover:underline"
              key={index}
            >
              <NavLink to={items.url} key={index}>
                {items.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`md:hidden  ${
          isMobileMenuOpen ? "block" : "hidden"
        } absolute top-14 left-0 w-full bg-base-100 z-50`}
      >
        <div className="flex flex-col items-start p-4">
          <ul className="flex flex-col items-start gap-6">
            {navList.map((items, index) => (
              <li
                className="font-bold cursor-pointer hover:underline"
                key={index}
              >
                <NavLink to={items.url} key={index} onClick={toggleMobileMenu}>
                  {items.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isauthenticated ? (
        <div className="flex items-center gap-4">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{cart.length}</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                {cart && cart.length > 0 ? (
                  <>
                    <span className="font-bold text-lg">
                      {cart.length === 1 ? `${cart.length} Item`:`${cart.length} Items`}
                    </span>
                    <span className="text-info">{`Subtotal: $${amount}`}</span>
                    <div className="card-actions">
                      <button onClick={()=>navigate('/cart')} className="px-6 py-4 rounded-xl btn-block font-semibold duration-300 ease-in-out border-2 border-solid border-black bg-black text-white hover:text-black hover:bg-white">
                        View cart
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="font-bold text-lg">Cart Is Empty</span>
                )}
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar placeholder:"
            >
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                <span className="text-2xl">
                  {name && (name.split(" ")[0][0] + name.split(" ")[1][0])}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to={'/purchase'} className="justify-between">Purchase History</NavLink>
              </li>
              <li>
                <span onClick={handleLogout}>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 font-bold duration-300 ease-in-out border-2 border-solid border-black bg-black text-white hover:text-black hover:bg-white rounded-xl text-md"
        >
          Log In
        </button>
      )}
    </div>
  );
};

export default Navbar;
