import { createContext, useState, useEffect} from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [account, setAccount] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    useEffect(() => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      console.log(username);
      if (token && username) {
          setAccount(username);
          setIsLoggedIn(true);
      }
  }, []);

  return (
    <DataContext.Provider value={{ account, setAccount, isLoggedIn, setIsLoggedIn }}>
            {children}
        </DataContext.Provider>
        
  )
}

export default DataProvider
