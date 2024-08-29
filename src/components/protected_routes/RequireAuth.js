import { Navigate, Outlet } from "react-router-dom";
import { User } from "../context/AuthProvider";
import { useContext } from "react";


export default function RequireAuth() {
    const { authToken } = useContext(User);
    const { userModel } = useContext(User);


    console.log("Auth Token in RequireAuth:", authToken);

    console.log("data user:", userModel);

    // تحقق مما إذا كان التوكن يحتوي على قيمة
    return authToken ? <Outlet /> : <Navigate to="/login" />;
}
