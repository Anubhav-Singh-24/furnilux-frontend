import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "../utils/common_utils";


export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [added,setAdded] = useState(false);
 

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      const decoded = jwtDecode(token);
      const {name} = decoded;
      setName(name);
    }
  }, []);



  return (
    <DataContext.Provider
      value={{
        name,
        setName,
        added,
        setAdded
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
