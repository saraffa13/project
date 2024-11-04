import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HasAuth = ({ children }) => {

	const navigate = useNavigate();

	const { loggedIn: isLoggedIn } = useSelector((state) => state.auth)

	if (isLoggedIn) {
		navigate("/");
	} else {
		return children;
	}
};

export default HasAuth;