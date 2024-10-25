import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UnAuthorized from "../pages/UnAuthorized";

const AdminAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const { role } = useSelector((state: any) => state.auth)
    const navigate = useNavigate();

    if (role === "admin") {
        return <>{children}</>;
    }

    return <UnAuthorized />;
};

export default AdminAuth;
