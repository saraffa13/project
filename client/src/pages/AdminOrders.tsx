import { useSelector } from "react-redux";
import { FaShippingFast, FaMapMarkerAlt, FaCalendarAlt, FaBoxOpen } from "react-icons/fa";

interface MedicineCardProps {
  name: string;
  quantity: number;
}

const MedicineCard = ({ name, quantity }: MedicineCardProps) => {
  return (
    <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-md mb-2 transition-transform transform hover:scale-105 hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
      <p className="mt-2 text-gray-500">Quantity: {quantity}</p>
    </div>
  );
};

const AdminOrders = () => {
  const { orders } = useSelector((state: any) => state.cart);

  return (
    <section className="p-8 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900 tracking-tight">
        Your AdminOrders
      </h1>

      <div className="max-w-5xl mx-auto space-y-10">
        {orders.length > 0 ? (
          orders.map((order: any) => (
            <div
              key={order._id}
              className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-2xl hover:scale-105"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-blue-600 flex items-center space-x-2">
                  <FaBoxOpen />
                  <span>Order ID: {order._id}</span>
                </h2>
                <p
                  className={`${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-500"
                  } font-medium text-lg`}
                >
                  {order.status}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    Delivery Date:{" "}
                    <span className="font-medium text-gray-900 ml-1">
                      {new Date(order.deliveryDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-600 flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    Address:{" "}
                    <span className="font-medium text-gray-900 ml-1">{order.address}</span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaShippingFast className="mr-2 text-green-500" />
                    Total Price:{" "}
                    <span className="font-medium text-gray-900 ml-1">
                      ${order.orders.totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* Medicine list */}
                {order.orders.cartItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 md:mt-0">
                    {order.orders.cartItems.map((item: any) => (
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
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center text-lg">No orders found.</p>
        )}
      </div>
    </section>
  );
};

export default AdminOrders;
