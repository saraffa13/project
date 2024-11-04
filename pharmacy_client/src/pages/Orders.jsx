import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const MedicineCard = ({ name, quantity }) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="mt-2 text-gray-600">Quantity: {quantity}</p>
    </div>
  );
};

const Orders = () => {
  const { orders } = useSelector((state) => state.cart);

  console.log(orders);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchByOrderId, setSearchByOrderId] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const clearFilters = () => {
    setSearchTerm("");
    setSearchByOrderId("");
    setPriceRange({ min: "", max: "" });
    setSortOrder("asc");
    setStartDate("");
    setEndDate("");
  };

  const filteredOrders = orders
    .filter((order) => order.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((order) => order._id?.toLowerCase().includes(searchByOrderId.toLowerCase()))
    .filter((order) => {
      const totalPrice = order.orders.totalPrice;
      const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
      const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      return totalPrice >= minPrice && totalPrice <= maxPrice;
    });

  const sortedOrders = filteredOrders.sort((a, b) => {
    const dateA = new Date(a.deliveryDate);
    const dateB = new Date(b.deliveryDate);

    return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  const filteredByDateOrders = sortedOrders.filter((order) => {
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
    <section className="p-8 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">
        Your Orders
      </h1>

      <div className="max-w-5xl mx-auto mb-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg w-full md:col-span-2 lg:col-span-2"
        />

        <input
          type="text"
          placeholder="Search by Order ID..."
          value={searchByOrderId}
          onChange={(e) => setSearchByOrderId(e.target.value)}
          className="p-2 border rounded-lg w-full"
        />

        <div className="flex items-center">
          <label htmlFor="sortOrder" className="mr-2 text-gray-700 whitespace-nowrap">
            Sort by date:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded-lg w-full"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="flex items-center">
          <label htmlFor="startDate" className="mr-2 text-gray-700 whitespace-nowrap">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded-lg w-full"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="endDate" className="mr-2 text-gray-700 whitespace-nowrap">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded-lg w-full"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="minPrice" className="mr-2 text-gray-700 whitespace-nowrap">
            Min Price:
          </label>
          <input
            type="number"
            id="minPrice"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="p-2 border rounded-lg w-full"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="maxPrice" className="mr-2 text-gray-700 whitespace-nowrap">
            Max Price:
          </label>
          <input
            type="number"
            id="maxPrice"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="p-2 border rounded-lg w-full"
          />
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredByDateOrders.length > 0 ? (
          filteredByDateOrders.map((order) => {
            const status = order.status

            return (
              <Link to={`${order._id}`}
                key={order._id}
                className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-blue-600"
              >
                <h2 className="text-xl font-semibold mb-4 text-blue-600">
                  Order ID: <br /> {order._id}
                </h2>
                <p className="mb-2 text-gray-600">
                  Delivery Date:{" "}
                  <span className="font-medium">
                    {new Date(order.deliveryDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="mb-2 text-gray-600">
                  Status:{" "}
                  <span
                    className={`${
                      status === "delivered"
                        ? "text-green-600"
                        :status === "pending"? "text-yellow-500":"text-red-500"
                    } font-medium`}
                  >
                    {status}
                  </span>
                </p>
                <p className="mb-2 text-gray-600">
                  Address: <span className="font-medium">{order.address}</span>
                </p>
                <p className="mb-4 text-gray-800 font-semibold">
                  Total Price: ${order.orders.totalPrice.toFixed(2)}
                </p>

                {order.orders.cartItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.orders.cartItems.map((item) => (
                      <MedicineCard
                        key={item.item}
                        name={item.name}
                        quantity={item.quantity}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No items in this order.</p>
                )}
              </Link>
            );
          })
        ) : (
          <p className="text-gray-500 text-center text-lg">No orders found.</p>
        )}
      </div>
    </section>
  );
};

export default Orders;
