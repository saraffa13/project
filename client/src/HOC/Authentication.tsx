import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import NeedToLogin from "../pages/NeedToLogin";


const Authentication: React.FC<{ children: ReactNode }> = ({ children }) => {

    const {loggedIn} = useSelector((state:any)=>state.auth);

    if (loggedIn) {
        return <>{children}</>
    }

    return <NeedToLogin />

};

export default Authentication;
