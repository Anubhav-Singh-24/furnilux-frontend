import { useNavigate } from "react-router-dom";


const PageNotFound = () => {

    let navigate = useNavigate();

  return (
    <div className="min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col gap-5 justify-center items-center">
        <p className="text-5xl font-semibold text-[#B88E2F]">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 text-center">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <button onClick={()=>navigate('/')} className="py-2 px-8 xl:py-4 xl:px-16 font-bold bg-[#B88E2F] text-white hover:bg-white hover:text-[#b88e2f] duration-300 ease-in-out border-[#b88e2f] border-2 border-solid">
          Go Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
