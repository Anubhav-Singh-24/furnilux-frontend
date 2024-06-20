import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";
import { NavLink, useNavigate } from "react-router-dom";
import aboutBanner from "../assets/about_banner.jpg";
import logo from "../assets/logo.png";
import { API } from "../service/api";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const ViewCart = ({ isauthenticated }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const { setAdded, added } = useContext(DataContext);
  const [itemCounts, setItemCounts] = useState({});
  const [total, setTotal] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    if (cart && cart.length > 0) {
      const initialCounts = cart.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
      }, {});
      setItemCounts(initialCounts);

      const amount = cart.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      setTotal(amount);
    }
  }, [cart]);

  const handleCountChange = (itemId, delta) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: Math.max(1, prevCounts[itemId] + delta),
    }));
  };

  const updateCart = async (id) => {
    if (isauthenticated) {
      setLoading(true);
      try {
        const res = await API.udpateCartItems({
          itemId: id,
          quantity: itemCounts[id],
        });
        if (res.isSuccess) {
          toast.success(res.data.msg);
          setAdded((prev) => !prev);
        }
      } catch (error) {
        toast.error("Failed to update! Try Again");
      }
      setLoading(false);
    } else {
      toast.warning("You need to login first");
      navigate("/login");
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    try {
      const res = await API.deleteCartItems(id);
      if (res.isSuccess) {
        toast.success(res.data.msg);
        setAdded((prev) => !prev);
      }
    } catch (error) {
      toast.error("Failed to delete! Try Again");
    }
    setLoading(false);
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await API.getCartItems();
        if (res.isSuccess) {
          setDataLoading(false);
          setCart(res.data);
        }
      } catch (error) {
        toast.error(error.msg);
      }
    };
    if (isauthenticated) {
      getCart();
    }
  }, [added, isauthenticated]);

  if (dataLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#b88e2f]"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-10 pb-10">
      <div className="relative flex items-center justify-center w-full xl:h-[40vh] h-[30vh]">
        <img
          src={aboutBanner}
          alt="about"
          className="w-full h-full opacity-65 rounded-3xl"
        />
        <div className="absolute backdrop-blur-sm w-full rounded-3xl h-full flex flex-col gap-3 justify-center items-center">
          <img src={logo} alt="logo" className="w-10" />
          <span className="text-3xl font-semibold">Cart</span>
          <div className="flex gap-2 items-center">
            <NavLink to={"/"} className="hover:underline font-bold">
              Home
            </NavLink>
            <span className="font-bold text-lg">&gt;</span>
            <span>Cart</span>
          </div>
        </div>
      </div>
      <div className="flex xl:flex-row flex-col justify-center items-center gap-10 px-10">
        {cart.length === 0 ? (
          <p className="text-2xl font-bold text-center w-full h-full">
            Cart is Empty
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-10">
              {cart &&
                cart.length > 0 &&
                cart.map((item, index) => {
                  return (
                    <div className="flex flex-col gap-5" key={index}>
                      <div className="bg-[#FFF3E3] py-5 px-8 rounded-xl">
                        <span className="xl:text-lg text-sm font-bold">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex xl:flex-row flex-col justify-center items-center gap-16 xl:px-10 px-0 w-full">
                        <div className="flex justify-center items-center w-full">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full rounded-3xl xl:h-[60vh] h-[50vh] object-fit"
                          />
                        </div>
                        <div className="flex flex-col gap-8 justify-center items-start px-5">
                          <div className="flex justify-center items-center gap-4">
                            <span className="text-lg font-bold">Price:</span>
                            <span className="text-lg">${item.price}</span>
                          </div>
                          <span className="text-lg">{item.desc}</span>
                          <div className="flex justify-center items-center gap-4">
                            <span className="font-bold text-gray-400">
                              Selected Size:
                            </span>
                            <span>{item.size}</span>
                          </div>
                          <div className="flex gap-7 justify-center items-center mt-5">
                            <button className="flex gap-5 justify-center items-center xl:px-6 px-4 py-3 font-bold duration-300 ease-in-out border-2 border-solid border-black bg-white text-black hover:text-white hover:bg-black rounded-xl text-md">
                              <FiMinus
                                onClick={() => handleCountChange(item.id, -1)}
                              />
                              <span>{itemCounts[item.id]}</span>
                              <FiPlus
                                onClick={() => handleCountChange(item.id, +1)}
                              />
                            </button>
                            <button
                              disabled={loading}
                              onClick={() => updateCart(item.id)}
                              className="xl:px-6 px-4 py-3 font-semibold duration-300 ease-in-out border-2 border-solid border-black bg-white text-black hover:text-white hover:bg-black rounded-xl text-md"
                            >
                              {loading ? "Updating..." : "Update"}
                            </button>
                            <MdDelete
                              size={25}
                              className="text-[#b88e2f] cursor-pointer"
                              onClick={() => deleteItem(item.id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="bg-[#FFF3E3] flex justify-center items-center rounded-xl flex-col gap-10 p-5 max-w-xl w-full h-[40vh]">
              <h1 className="text-3xl font-bold text-[#b88e2f]">Cart Totals</h1>
              <div className="flex items-center gap-5">
                <span className="text-lg font-bold">Total</span>
                <span>${total}</span>
              </div>
              <button
                disabled={loading}
                onClick={() =>
                  cart && cart.length !== 0 && navigate("/payment")
                }
                className="py-2 px-8 lg:py-4 lg:px-16 font-bold bg-[#B88E2F] text-white hover:bg-white hover:text-[#b88e2f] duration-300 ease-in-out border-[#b88e2f] border-2 border-solid"
              >
                {loading ? "Please wait..." : "Check Out!"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewCart;
