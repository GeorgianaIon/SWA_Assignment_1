import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../config/store";
import { StateData } from "../reducers/game";

const ProtectedRoute = () => {
    const token: string = useAppSelector((state: StateData) => state.token);
    return (
        token ? <Outlet /> : <Navigate to='/' />
    )
};
export default ProtectedRoute;