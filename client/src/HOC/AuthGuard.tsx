// @ts-nocheck
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import UnAuthorized from "../pages/UnAuthorized";
import NeedToLogin from "../pages/NeedToLogin";

const AuthGuard: React.FC<{ children: ReactNode; adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
    const { loggedIn, role } = useSelector((state: any) => state.auth);

    if (!loggedIn) {
        return <NeedToLogin />;
    }

    if (adminOnly && role === 'user') {
        return <UnAuthorized />;
    }

    return <>{children}</>;
};

export default AuthGuard;
