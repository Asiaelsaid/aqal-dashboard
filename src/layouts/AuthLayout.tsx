import { Outlet } from "react-router-dom";
import FixedSection from "../components/auth/FixedSection";

const AuthLayout  = () => {
    return  <div className="flex flex-col lg:flex-row h-screen">
        <FixedSection/>
        <Outlet/>
    </div>;
};

export default AuthLayout;