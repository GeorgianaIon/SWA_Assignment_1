import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../config/store";

const ProtectedRoute = () => {
    const token: string = useAppSelector((state) => state.userReducer.token);

    return (
        token ? <Outlet /> : <Navigate to='/' />
    )
};
export default ProtectedRoute;