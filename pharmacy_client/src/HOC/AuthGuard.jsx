import React from "react";
import { useSelector } from "react-redux";
import UnAuthorized from "../pages/UnAuthorized";
import NeedToLogin from "../pages/NeedToLogin";

const AuthGuard = ({ children, adminOnly = false }) => {
    const { loggedIn, role } = useSelector((state) => state.auth);

    if (!loggedIn) {
        return <NeedToLogin />;
    }

    if (adminOnly && role === 'user') {
        return <UnAuthorized />;
    }

    return <>{children}</>;
};

export default AuthGuard;
