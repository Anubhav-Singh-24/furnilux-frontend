import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import aboutBanner from "../assets/about_banner.jpg";
import logo from "../assets/logo.png";
import { API } from "../service/api";
import { toast } from "react-toastify";

const Purchase = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const getPurchase = async () => {
      try {
        const res = await API.getPurchaseHistory();
        if (res.isSuccess) {
          setPurchaseHistory(res.data);
          setDataLoading(false);
        }
      } catch (error) {
        toast.error(error.msg);
      }
    };
    getPurchase();
  }, []);

  return (
    <div className="flex flex-col w-full gap-10">
      <div className="relative flex items-center justify-center w-full xl:h-[40vh] h-[30vh]">
        <img
          src={aboutBanner}
          alt="about"
          className="w-full h-full opacity-65 rounded-3xl"
        />
        <div className="absolute backdrop-blur-sm w-full rounded-3xl h-full flex flex-col gap-3 justify-center items-center">
          <img src={logo} alt="logo" className="w-10" />
          <span className="text-3xl font-semibold">Purchase History</span>
          <div className="flex gap-2 items-center">
            <NavLink to={"/"} className="hover:underline font-bold">
              Home
            </NavLink>
            <span className="font-bold text-lg">&gt;</span>
            <span>Purchase History</span>
          </div>
        </div>
      </div>
      {dataLoading ? (
        <div className="h-[50vh] w-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-[#b88e2f]"></span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-7 w-full xl:p-10 p-4">
          {purchaseHistory.length !== 0 ?
            purchaseHistory.map((items, index) => (
              <div
                className="xl:w-[70%] w-full flex flex-col p-5 gap-10 border-2 border-gray-400 rounded-xl"
                key={index}
              >
                <div className="flex flex-col gap-7">
                  <div className="flex xl:flex-row flex-col xl:gap-20 gap-10 text-gray-500 xl:items-center items-start justify-start font-bold">
                    <span className="break-words max-w-[100%]">Order Id: {items.orderId}</span>
                    <span>Date: {new Date(items.date).toDateString()}</span>
                  </div>
                  <span className="font-bold">
                    Amount Paid: ${items.amount}
                  </span>
                </div>
                  {items.products.length !== 0 &&
                    items.products.map((item, ind) => (
                      <div
                        className="flex xl:flex-row flex-col xl:gap-20 gap-10 pt-10 items-center xl:px-14 px-4"
                        key={ind}
                      >
                        <div className="xl:w-[20vw] md:w-[40vw] w-[60vw] xl:h-[50vh] h-[40vh]">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-full h-full rounded-xl"
                          />
                        </div>
                        <div className="flex flex-col xl:gap-10 gap-5 items-start justify-center">
                          <p className="text-2xl font-bold">
                            {item.productName}
                          </p>
                          <p className="text-xl font-bold text-gray-500">
                            Size: {item.productSize}
                          </p>
                          <p className="text-xl font-bold text-gray-500">
                            Quantity: {item.productQuant}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
            )):<div className="flex justify-center items-center w-full">
              <span className="font-bold text-xl">Their is no purchase history</span>
              </div>}
        </div>
      )}
    </div>
  );
};

export default Purchase;
