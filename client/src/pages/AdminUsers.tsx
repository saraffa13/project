import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaEnvelope, FaPhone, FaUserShield, FaTrashAlt } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";
import axios from "axios";
import { activateUser, deleteUser, removeFromBlacklist, blacklistUser } from "../store/slicers/authSlicer";
import { notify } from "../utils/helper";
import { useState, useEffect } from "react";

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
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<User | null>(null);

	useEffect(() => {
		setCurrentPage(1);
	}, [filterCriteria]);

	const openDeleteModal = (user: User) => {
		setUserToDelete(user);
		setIsModalOpen(true);
	};

	const closeDeleteModal = () => {
		setUserToDelete(null);
		setIsModalOpen(false);
	};

	const handleDelete = async () => {
		if (!userToDelete) return;

		try {
			const response = await axios.post(
				`${baseURL}user/delete`,
				{ userId: userToDelete._id },
				{ withCredentials: true }
			);
			dispatch(deleteUser(userToDelete._id));
			notify("User deleted successfully!");
			closeDeleteModal();
			return response.data;
		} catch (error) {
			console.error("Error during deletion:", error);
			throw error;
		}
	};

	const handleActivation = async (activate: boolean, userId: string) => {
		try {
			const response = await axios.post(
				`${baseURL}user/handleActivation`,
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
				`${baseURL}user/blacklistUser`,
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
				`${baseURL}user/remove-from-blacklist`,
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

	const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<section className="p-8 bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 min-h-screen">
			<h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white tracking-tight">
				Users List
			</h1>

			{/* Filter Buttons */}
			<div className="flex justify-center space-x-4 mb-12">
				{["all", "active", "inactive", "blacklisted", "admin", "user"].map((criteria) => (
					role === 'superAdmin' || ["all", "active", "inactive", "blacklisted"].includes(criteria) ? (
						<button
							key={criteria}
							className={`px-4 py-2 rounded-lg font-semibold ${filterCriteria === criteria
								? "bg-blue-500 text-white"
								: "bg-gray-300 dark:bg-gray-600 dark:text-gray-200"
								}`}
							onClick={() => setFilterCriteria(criteria)}
						>
							{criteria.charAt(0).toUpperCase() + criteria.slice(1)} Users
						</button>
					) : null
				))}
			</div>

			{/* Users List */}
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{paginatedUsers.length > 0 ? (
					paginatedUsers.map((user: User) => (
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
									onClick={() => openDeleteModal(user)}
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

			{/* Pagination */}
			<div className="flex justify-center space-x-2 mt-8">
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index + 1}
						onClick={() => handlePageChange(index + 1)}
						className={`px-4 py-2 rounded-lg ${currentPage === index + 1
							? "bg-blue-500 text-white"
							: "bg-gray-300 dark:bg-gray-600 dark:text-gray-200"
							}`}
					>
						{index + 1}
					</button>
				))}
			</div>

			{isModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
					onClick={closeDeleteModal}
				>
					<div
						className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full"
						onClick={(e) => e.stopPropagation()}
					>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
							Confirm Deletion
						</h3>
						<p className="text-gray-700 dark:text-gray-300 mb-6">
							Are you sure you want to delete {userToDelete?.name}?
						</p>
						<div className="flex justify-end space-x-4">
							<button
								onClick={closeDeleteModal}
								className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
							>
								Cancel
							</button>
							<button
								onClick={handleDelete}
								className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default UsersList;
