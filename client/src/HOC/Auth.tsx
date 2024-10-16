import React, { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const Authentication:React.FC<{children:ReactNode}> = ({ children }) => {

    const { loggedIn } = useSelector((state:any) => state.auth)
    const navigate = useNavigate();

    if (loggedIn) {
        return children;
    } else {
        navigate("/login");
    }
};

export default Authentication;