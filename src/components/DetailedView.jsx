import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { API } from "../service/api";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import Products from "./Products";
import { toast } from "react-toastify";
import { DataContext } from "../context/DataProvider";

const DetailedView = ({ isauthenticated }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoad,setDataLoad] = useState(true);
  const {setAdded} = useContext(DataContext)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await API.getProductsById(id);
        if (res.isSuccess) {
          setDataLoad(false)
          setProduct(res.data);
        }
      } catch (error) {
        toast.error(error.msg);
      }
    };
    if (id) {
      getProduct();
    }
  }, [id]);

  useEffect(() => {
    const getRelated = async (cat) => {
      try {
        const res = await API.getProductsByCategory(cat);
        if (res.isSuccess) {
          const filteredProducts = res.data.filter((prod) => prod._id !== id);
          setProducts(filteredProducts);
        }
      } catch (error) {
        toast.error(error.msg);
      }
    };
    if (product.category) {
      getRelated(product.category);
    }
  }, [product, id]);

  const [selectedSize, setSelectedSize] = useState("S");
  let navigate = useNavigate();

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const addToCart = async () => {
    if (isauthenticated) {
      setLoading(true);
      try {
        const res = await API.addProductToCart({
          itemId: product._id,
          quantity: count,
          size: selectedSize,
        });
        if (res.isSuccess) {
          toast.success(res.data.msg);
          setAdded((prev)=>!prev);
          navigate('/cart');
        }
      } catch (error) {
        toast.error("Failed to add! Try Again")
      }
      setLoading(false);
    } else {
      toast.warning("You need to login first");
      navigate("/login");
    }
  };

    if (dataLoad) {
      return (
        <div className="h-screen w-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-[#b88e2f]"></span>
        </div>
      );
    }


  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="py-7 bg-[#F9F1E7] flex gap-4 items-center xl:px-20 px-5 w-full xl:text-lg text-sm">
        <NavLink to={"/"} className="hover:underline font-bold">
          Home
        </NavLink>
        <span className="font-bold">&gt;</span>
        <NavLink to={"/shop"} className="hover:underline font-bold">
          Shop
        </NavLink>
        <span className="font-bold">&gt;</span>
        <span className="xl:text-md text-2xl">|</span>
        <span className="xl:text-lg text-xs">{product.name}</span>
      </div>
      <div className="flex xl:flex-row flex-col justify-center items-center gap-16 px-10 w-full">
        <div className="flex justify-center items-center max-w-xs w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-3xl xl:h-[60vh] h=[40vh] object-fit"
          />
        </div>
        <div className="flex flex-col gap-8 justify-center items-start">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <span className="text-xl text-gray-400">${product.price}</span>
          </div>
          <span className="text-lg">{product.desc}</span>
          <div className="flex flex-col gap-5">
            <label className="font-bold text-gray-400">Size</label>
            <div className="flex gap-4">
              {["S", "L", "XL"].map((size) => (
                <label key={size} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={size}
                    checked={selectedSize === size}
                    onChange={handleSizeChange}
                    className="hidden"
                    name="size"
                    id={`size-${size}`}
                  />
                  <span
                    className={`w-10 h-10 flex items-center justify-center font-bold text-sm  cursor-pointer rounded-lg ${
                      selectedSize === size
                        ? "bg-[#B88E2F] text-white"
                        : "bg-[#F9F1E7] text-black"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </span>
                </label>
              ))}
            </div>
            <div className="flex gap-7 justify-center items-center mt-5">
              <button className="flex gap-5 justify-center items-center xl:px-6 py-3 px-4 font-bold duration-300 ease-in-out border-2 border-solid border-black bg-white text-black hover:text-white hover:bg-black rounded-xl xl:text-md text-sm">
                <FiMinus
                  onClick={() => count > 1 && setCount((prev) => prev - 1)}
                />
                <span>{count}</span>
                <FiPlus onClick={() => setCount((prev) => prev + 1)} />
              </button>
              <button
                disabled={loading}
                onClick={addToCart}
                className="xl:px-6 py-3 px-4 font-semibold duration-300 ease-in-out border-2 border-solid border-black bg-white text-black hover:text-white hover:bg-black rounded-xl xl:text-md text-sm"
              >
                {loading ? "Adding..." : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-7 px-10">
        <h1 className="text-2xl font-bold">Related Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 h-auto">
          {products.length > 0 &&
            products.slice(0, 4).map((product) => {
              return <Products key={product._id} product={product} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default DetailedView;
