import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaEnvelope, FaPhone, FaUserShield, FaTrashAlt } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";
import axios from "axios";
import { activateUser, deleteUser, removeFromBlacklist, blacklistUser } from "../store/slicers/authSlicer";
import { notify } from "../utils/helper";
import { useState } from "react";

let baseURL = import.meta.env.VITE_BASE_URL;

interface User {
	_id: string;
	name: string;
	gender: string;
	email: string;
	phoneNumber: number;
	role: string;
	isActive: boolean;
	blacklisted: boolean;
}

const UsersList = () => {
	const dispatch = useDispatch();
	const { users, role } = useSelector((state: any) => state.auth);

	const [filterCriteria, setFilterCriteria] = useState("all");

	const handleDelete = async (id: string) => {
		try {
			const response = await axios.post(
				`${baseURL}/user/delete`,
				{ userId: id },
				{ withCredentials: true }
			);
			dispatch(deleteUser(id));
			notify("User deleted successfully!");
			return response.data;
		} catch (error) {
			console.error("Error during deletion:", error);
			throw error;
		}
	};

	const handleActivation = async (activate: boolean, userId: string) => {
		try {
			const response = await axios.post(
				`${baseURL}/user/handleActivation`,
				{ userId, activate },
				{ withCredentials: true }
			);
			dispatch(activateUser({ activate, userId }));
			notify("Operation successful!");
			return response.data;
		} catch (error) {
			console.error("Error:", error);
			throw error;
		}
	};

	const handleBlacklist = async (userId: string) => {
		try {
			const response = await axios.post(
				`${baseURL}/user/blacklistUser`,
				{ userId },
				{ withCredentials: true }
			);
			dispatch(blacklistUser(userId));
			notify("User blacklisted successfully!");
			return response.data;
		} catch (error) {
			console.error("Error blacklisting user:", error);
			throw error;
		}
	};

	const handleRemoveBlacklist = async (userId: string) => {
		try {
			const response = await axios.post(
				`${baseURL}/user/remove-from-blacklist`,
				{ userId },
				{ withCredentials: true }
			);
			dispatch(removeFromBlacklist({ userId }));
			notify("User removed from blacklist successfully!");
			return response.data;
		} catch (error) {
			console.error("Error during blacklist removal:", error);
			throw error;
		}
	};

	const filteredUsers = users.filter((user: User) => {
		if (filterCriteria === "active") return user.isActive && !user.blacklisted;
		if (filterCriteria === "inactive") return !user.isActive && !user.blacklisted;
		if (filterCriteria === "blacklisted") return user.blacklisted;
		if (filterCriteria === "admin") return user.role === "admin";
		if (filterCriteria === "user") return user.role === "user";
		return true;
	});

	return (
		<section className="p-8 bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 min-h-screen">
			<h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white tracking-tight">
				Users List
			</h1>

			<div className="flex justify-center space-x-4 mb-12">
				<button
					className={`px-4 py-2 rounded-lg font-semibold ${filterCriteria === "all"
						? "bg-blue-500 text-white"
						: "bg-gray-300 dark:bg-gray-600 dark:text-gray-200"
						}`}
					onClick={() => setFilterCriteria("all")}
				>
					All Users
				</button>
				<button
					className={`px-4 py-2 rounded-lg font-semibold ${filterCriteria === "active"
						? "bg-blue-500 text-white"
						: "bg-gray-300 dark:bg-gray-600 dark:text-gray-200"
						}`}
					onClick={() => setFilterCriteria("active")}
				>
					Active Users
				</button>
				<button
					className={`px-4 py-2 rounded-lg font-semibold ${filterCriteria === "inactive"
						? "bg-blue-500 text-white"
						: "bg-gray-300 dark:bg-gray-600 dark:text-gray-200"
						}`}
					onClick={() => setFilterCriteria("inactive")}
				>
					Inactive Users
				</button>
				<button
					className={`px-4 py-2 rounded-lg font-semibold ${filterCriteria === "blacklisted"
						? "bg-blue-500 text-white"
						: "bg-gray-300 dark:bg-gray-600 dark:text-gray-200"
						}`}
					onClick={() => setFilterCriteria("blacklisted")}
				>
					Blacklisted Users
				</button>
				{role === 'superAdmin' &&
					<>
						<button
							className={`px-4 py-2 rounded-lg font-semibold ${filterCriteria === "admin"
								? "bg-blue-500 text-white"
								: "bg-gray-300 dark:bg-gray-600 dark:text-gray-200"
								}`}
							onClick={() => setFilterCriteria("admin")}
						>
							Admins
						</button>
						<button
							className={`px-4 py-2 rounded-lg font-semibold ${filterCriteria === "user"
								? "bg-blue-500 text-white"
								: "bg-gray-300 dark:bg-gray-600 dark:text-gray-200"
								}`}
							onClick={() => setFilterCriteria("user")}
						>
							Users
						</button>
					</>}
			</div>

			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{filteredUsers.length > 0 ? (
					filteredUsers.map((user: User) => (
						<div
							key={user._id}
							className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
						>
							<div className="flex justify-between items-center mb-4">
								<div className="flex items-center space-x-4">
									<FaUser className="text-blue-600 dark:text-blue-300 text-3xl" />
									<h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
								</div>
								<button
									className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300"
									onClick={() => handleDelete(user._id)}
								>
									<FaTrashAlt className="text-white" />
								</button>
							</div>

							<p className="text-gray-600 dark:text-gray-300 flex items-center mb-2">
								<FaEnvelope className="mr-2 text-gray-500 dark:text-gray-400" />
								Email: <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">{user.email}</span>
							</p>

							<p className="text-gray-600 dark:text-gray-300 flex items-center mb-2">
								<FaPhone className="mr-2 text-gray-500 dark:text-gray-400" />
								Phone: <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">{user.phoneNumber}</span>
							</p>

							<p className="text-gray-600 dark:text-gray-300 flex items-center">
								<FaUserShield className="mr-2 text-gray-500 dark:text-gray-400" />
								Role: <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">{user.role}</span>
							</p>

							{!user.isActive && !user.blacklisted && (
								<div className="flex space-x-2 mt-4">
									<button onClick={() => handleActivation(true, user._id)} className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
										<FiCheck className="text-white" />
									</button>
									<button onClick={() => handleActivation(false, user._id)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
										<FiX className="text-white" />
									</button>
								</div>
							)}

							{!user.blacklisted && (
								<div className="mt-4">
									<button
										onClick={() => handleBlacklist(user._id)}
										className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
									>
										Blacklist
									</button>
								</div>
							)}

							{user.blacklisted && (
								<div className="mt-4">
									<button
										onClick={() => handleRemoveBlacklist(user._id)}
										className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
									>
										Remove from Blacklist
									</button>
								</div>
							)}
						</div>
					))
				) : (
					<p className="text-gray-500 dark:text-gray-300 text-center text-lg">No users found.</p>
				)}
			</div>
		</section>
	);
};

export default UsersList;
