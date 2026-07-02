import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children ,allowedRole}) => {
const { isAuthenticated, role } = useAuth();

if (!isAuthenticated) {
   alert("You must be logged in to access this page.");
   return <Navigate to="/login"  replace/>;
}
    //here allowedRole in first is used to check does the value is undifined
    // that means the role and allowedRole must exactly match to access the page
    //but if the allowedRole is undifined then it will allow all the roles to access the page
if (allowedRole && role !== allowedRole) {
   alert("You are not authorized to access this page.");
   return <Navigate to="/"  replace/>;
}
return children;
}

export default ProtectedRoute