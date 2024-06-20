import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Shop from "./components/Shop";
import Home from "./components/Home";
import Footer from "./components/Footer";
import DataProvider from "./context/DataProvider";
import { getAccessToken } from "./utils/common_utils";
import DetailedView from "./components/DetailedView";
import ViewCart from "./components/ViewCart";
import PaymentPage from "./components/PaymentPage";
import Purchase from "./components/Purchase";
import ScrollToTop from "./components/ScrollToTop";
import PageNotFound from "./components/PageNotFound";

function App() {
  const PrivateRoute = ({ isauthenticated, ...props }) => {
    return getAccessToken() ? (
      <>
        <Outlet />
      </>
    ) : (
      <Navigate replace to={"/login"} />
    );
  };

  const [isauthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (getAccessToken()) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <DataProvider>
      <BrowserRouter>
        <Navbar
          isauthenticated={isauthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/product/:id"
            element={<DetailedView isauthenticated={isauthenticated} />}
          />
          <Route
            path="/cart"
            element={<PrivateRoute isauthenticated={isauthenticated} />}
          >
            <Route
              path="/cart"
              element={<ViewCart isauthenticated={isauthenticated} />}
            />
          </Route>
          <Route
            path="/payment"
            element={<PrivateRoute isauthenticated={isauthenticated} />}
          >
            <Route
              path="/payment"
              element={<PaymentPage isauthenticated={isauthenticated} />}
            />
          </Route>
          <Route
            path="/purchase"
            element={<PrivateRoute isauthenticated={isauthenticated} />}
          >
            <Route
              path="/purchase"
              element={<Purchase isauthenticated={isauthenticated} />}
            />
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
