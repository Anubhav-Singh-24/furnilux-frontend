import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { FaGooglePay } from "react-icons/fa";
import { FaApplePay } from "react-icons/fa";
import creditCard from "../assets/credit.webp";
import googlePay from "../assets/Google Pay.png";
import applePay from "../assets/Apple_Payment.png";
import { useContext, useEffect, useState } from "react";
import { API } from "../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

const PaymentPage = ({ isauthenticated }) => {
  const paymentOptions = [
    { name: "credit", icon: <BsFillCreditCard2FrontFill size={25} /> },
    { name: "gpay", icon: <FaGooglePay size={25} /> },
    { name: "apple", icon: <FaApplePay size={25} /> },
  ];

  const [paymentMethod, setPaymentMethod] = useState({
    credit: true,
    gpay: false,
    apple: false,
  });

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const {setAdded} = useContext(DataContext)
  const [card,setCard] = useState({name:'',number:'',exp:'',cvv:''})

  const handleChange = (name) => {
    setPaymentMethod({
      credit: name === "credit",
      gpay: name === "gpay",
      apple: name === "apple",
    });
  };
  const navigate = useNavigate();

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await API.getCartItems();
        if (res.isSuccess) {
          if(res.data.length === 0){
            navigate('/shop')
          }else{
            setCart(res.data);
          }
        }
      } catch (error) {
        toast.error(error.msg);
      }
    };
    if (isauthenticated) {
      getCart();
    }
  }, [isauthenticated]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const amount = cart.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      setTotal(amount);
    }
  }, [cart]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await API.purchaseProduct({ amount: total, status: "success" });
      if (res.isSuccess) {
        setShow(false);
        toast.success(res.data.msg);
        setAdded((prev)=>!prev)
        setTimeout(() => {
          navigate("/purchase");
        }, 3000);
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  const handleForm = (e)=>{
    const {name,value} = e.target
    setCard({
      ...card,[name]:value
    })
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 xl:p-20 p-5 bg-[#f3e7d8]">
      <div className="flex flex-col justify-center bg-white gap-10 xl:p-10 p-5 rounded-xl xl:w-[50%] w-full">
        {show ? (
          <>
            <div className="flex flex-col items-center justify-center gap-6">
              <h1 className="text-2xl font-bold">Payment Options</h1>
              <div className="flex justify-center items-center gap-5">
                {paymentOptions.map((item, index) => {
                  return (
                    <div
                      onClick={() => handleChange(item.name)}
                      className=" flex cursor-pointer hover:bg-gray-300 duration-300 ease-in-out items-center justify-center w-20 p-4 rounded-xl shadow-md shadow-black"
                      key={index}
                    >
                      {item.icon}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-5 justify-center items-center">
              {paymentMethod.credit && (
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold text-center">Credit Card</h1>
                  <div className="flex justify-center items-center max-w-md w-full">
                    <img
                      src={creditCard}
                      alt="card"
                      className="w-full rounded-3xl h-[40vh] object-fit"
                    />
                  </div>
                  <form className="flex flex-col gap-6">
                    <input
                      type="text"
                      name="name"
                      required={true}
                      placeholder="Card Holder Name"
                      onChange={handleForm}
                      className="p-2 focus:outline-none border-b-2 border-black"
                    />
                    <input
                      type="text"
                      name="number"
                      minLength={16}
                      maxLength={16}
                      required={true}
                      placeholder="Card Number"
                      onChange={handleForm}
                      className="p-2 focus:outline-none border-b-2 border-black"
                    />
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        name="exp"
                        required={true}
                        placeholder="Expiry Date"
                        minLength={5}
                        maxLength={5}
                        onChange={handleForm}
                        className="p-2 focus:outline-none border-b-2 border-black w-28"
                      />
                      <input
                        type="text"
                        name="cvv"
                        required={true}
                        minLength={3}
                        maxLength={3}
                        onChange={handleForm}
                        placeholder="CVV"
                        className="p-2 focus:outline-none border-b-2 border-black w-28"
                      />
                    </div>
                  </form>
                </div>
              )}
              {paymentMethod.gpay && (
                <div className="flex flex-col gap-5">
                  <h1 className="text-xl font-bold text-center">UPI</h1>
                  <div className="flex justify-center items-center max-w-md w-full">
                    <img
                      src={googlePay}
                      alt="card"
                      className="w-full rounded-3xl h-[40vh] object-fit"
                    />
                  </div>
                </div>
              )}
              {paymentMethod.apple && (
                <div className="flex flex-col gap-5">
                  <h1 className="text-xl font-bold text-center">Apple Pay</h1>
                  <div className="flex justify-center items-center max-w-md w-full">
                    <img
                      src={applePay}
                      alt="card"
                      className="w-full rounded-3xl h-[40vh] object-fit"
                    />
                  </div>
                </div>
              )}
              <button
                onClick={() => handlePayment()}
                disabled={(paymentMethod.credit && (!card.name || !card.number || !card.cvv || !card.exp)) || loading}
                className="px-6 py-3 font-semibold duration-300 ease-in-out border-2 border-solid border-black bg-black text-white hover:text-black hover:bg-white rounded-xl text-md w-full"
              >
                {loading ? "Please Wait..." : `Pay $${total}`}
              </button>
            </div>
          </>
        ) : (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <iframe
              src="https://lottie.host/embed/42653b4d-bda1-4629-b4eb-39522b5414c3/PfpxhNtDRp.json"
              className="w-full h-full"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
