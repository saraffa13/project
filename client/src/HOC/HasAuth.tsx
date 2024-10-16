import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HasAuth:React.FC<{children:ReactNode}> = ({ children }) => {
	// const [loggedIn, setLoggedIn] = useState(false);
	const navigate = useNavigate();

    const { loggedIn:isLoggedIn } = useSelector((state:any)=>state.auth)

	// useEffect(() => {
	// 	setLoggedIn(isLoggedIn);
    //     console.log(loggedIn);
	// }, []);

	if (isLoggedIn) {
		navigate("/");
	} else {
		return children;
	}
};

export default HasAuth;