import { useState } from "react";
import { useSelector } from "react-redux";
import {
	FaShippingFast,
	FaMapMarkerAlt,
	FaCalendarAlt,
	FaBoxOpen,
	FaUser,
	FaEnvelope,
	FaPhone,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminOrders = () => {
	const { orders } = useSelector((state) => state.cart);

	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const clearFilters = () => {
		setSearchTerm("");
		setSortOrder("asc");
		setStartDate("");
		setEndDate("");
		setStatusFilter("all");
	};

	const filteredOrders = orders
		.filter((order) => {
			const matchesStatus = statusFilter === "all" || order.status === statusFilter;
			const matchesSearchTerm = order.name?.toLowerCase().includes(searchTerm.toLowerCase());
			return matchesStatus && matchesSearchTerm;
		})
		.sort((a, b) => {
			const dateA = new Date(a.deliveryDate);
			const dateB = new Date(b.deliveryDate);
			return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
		})
		.filter((order) => {
			const deliveryDate = new Date(order.deliveryDate);
			const start = startDate ? new Date(startDate) : null;
			const end = endDate ? new Date(endDate) : null;

			if (start && end) {
				return deliveryDate >= start && deliveryDate <= end;
			} else if (start) {
				return deliveryDate >= start;
			} else if (end) {
				return deliveryDate <= end;
			}
			return true;
		});

	return (
		<section className="p-8 bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
			<h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-100 tracking-tight">
				Your Admin Orders
			</h1>

			<div className="max-w-5xl mx-auto mb-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
				<input
					type="text"
					placeholder="Search by name..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="p-3 border rounded-lg w-full md:col-span-2 lg:col-span-2 focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-200"
				/>

				<div className="flex items-center">
					<label htmlFor="sortOrder" className="mr-2 text-gray-700 dark:text-gray-300">
						Sort by date:
					</label>
					<select
						id="sortOrder"
						value={sortOrder}
						onChange={(e) => setSortOrder(e.target.value)}
						className="p-2 border rounded-lg w-full focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-200"
					>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
				</div>

				<div className="flex items-center">
					<label htmlFor="startDate" className="mr-2 text-gray-700 dark:text-gray-300">
						Start Date:
					</label>
					<input
						type="date"
						id="startDate"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className="p-2 border rounded-lg w-full focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-200"
					/>
				</div>

				<div className="flex items-center">
					<label htmlFor="endDate" className="mr-2 text-gray-700 dark:text-gray-300">
						End Date:
					</label>
					<input
						type="date"
						id="endDate"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						className="p-2 border rounded-lg w-full focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-200"
					/>
				</div>

				<div className="flex items-center">
					<label htmlFor="statusFilter" className="mr-2 text-gray-700 dark:text-gray-300">
						Status:
					</label>
					<select
						id="statusFilter"
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="p-2 border rounded-lg w-full focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-200"
					>
						<option value="all">All</option>
						<option value="pending">Pending</option>
						<option value="delivered">Delivered</option>
						<option value="cancelled">Cancelled</option>
					</select>
				</div>
			</div>

			<div className="max-w-5xl mx-auto mb-8 text-right">
				<button
					onClick={clearFilters}
					className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
				>
					Clear Filters
				</button>
			</div>

			<div className="max-w-5xl mx-auto space-y-10">
				{filteredOrders.length > 0 ? (
					filteredOrders.map((order) => {
						const status = order.status;

						return (
							<Link
								to={`/admin/orders/${order._id}`}
								key={order._id}
								className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-2xl hover:scale-105"
							>
								<div className="flex justify-between items-start mb-4">
									<h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center space-x-2">
										<FaBoxOpen />
										<span>Order ID: {order._id}</span>
									</h2>
									<p
										className={`${status === "delivered"
											? "text-green-600"
											: status === "pending"
												? "text-yellow-500"
												: "text-red-500"
											} font-medium text-lg`}
									>
										{status}
									</p>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<p className="text-gray-600 dark:text-gray-400 flex items-center mb-2">
											<FaUser className="mr-2 text-blue-500 dark:text-blue-300" />
											Name:{" "}
											<span className="font-medium text-gray-900 dark:text-gray-100 ml-1">
												{order.name}
											</span>
										</p>
										<p className="text-gray-600 dark:text-gray-400 flex items-center mb-2">
											<FaEnvelope className="mr-2 text-blue-500 dark:text-blue-300" />
											Email:{" "}
											<span className="font-medium text-gray-900 dark:text-gray-100 ml-1">
												{order.email}
											</span>
										</p>
										<p className="text-gray-600 dark:text-gray-400 flex items-center mb-2">
											<FaPhone className="mr-2 text-green-500 dark:text-green-300" />
											Phone:{" "}
											<span className="font-medium text-gray-900 dark:text-gray-100 ml-1">
												{order.phone}
											</span>
										</p>
										<p className="text-gray-600 dark:text-gray-400 flex items-center mb-2">
											<FaCalendarAlt className="mr-2 text-blue-500 dark:text-blue-300" />
											Delivery Date:{" "}
											<span className="font-medium text-gray-900 dark:text-gray-100 ml-1">
												{order.deliveryDate
													? new Date(order.deliveryDate).toLocaleDateString()
													: "No Delivery Date Available"}
											</span>
										</p>

										<p className="text-gray-600 dark:text-gray-400 flex items-center mb-2">
											<FaMapMarkerAlt className="mr-2 text-red-500 dark:text-red-300" />
											Address:{" "}
											<span className="font-medium text-gray-900 dark:text-gray-100 ml-1">
												{order.address}
											</span>
										</p>
										<p className="text-gray-600 dark:text-gray-400 flex items-center">
											<FaShippingFast className="mr-2 text-green-500 dark:text-green-300" />
											Total Price:{" "}
											<span className="font-medium text-gray-900 dark:text-gray-100 ml-1">
												${order.orders.totalPrice.toFixed(2)}
											</span>
										</p>
									</div>
								</div>
							</Link>
						);
					})
				) : (
					<p className="text-gray-500 dark:text-gray-400 text-center text-lg">No orders found.</p>
				)}
			</div>
		</section>
	);
};

export default AdminOrders;
