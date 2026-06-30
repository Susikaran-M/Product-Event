import { createContext ,useState,useContext } from "react";


    const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
   
    const login = (userRole) => {
        setIsAuthenticated(true);
        setRole(userRole);
    }
    const logout = () => {
        setIsAuthenticated(false);
        setRole(null);
    }
return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
    };

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }   
    return context;
}
