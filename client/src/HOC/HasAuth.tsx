// @ts-nocheck
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HasAuth:React.FC<{children:ReactNode}> = ({ children }) => {

	const navigate = useNavigate();

    const { loggedIn:isLoggedIn } = useSelector((state:any)=>state.auth)

	if (isLoggedIn) {
		navigate("/");
	} else {
		return children;
	}
};

export default HasAuth;