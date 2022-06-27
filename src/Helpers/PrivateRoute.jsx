import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

  const { token , personalDetails } = useSelector((state) => state.auth)

  return (
    (!Boolean(token) || !Boolean(personalDetails)) ? <Navigate to={{ pathname: "/" }} /> : <Outlet />
  );
};

export default PrivateRoute;
