import { useSelector } from "react-redux";

interface MedicineCardProps {
  name: string;
  quantity: number;
}

const MedicineCard = ({ name, quantity }: MedicineCardProps) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="mt-2 text-gray-600">Quantity: {quantity}</p>
    </div>
  );
};

const Orders = () => {
  const { orders } = useSelector((state: any) => state.cart);

  return (
    <section className="p-8 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">
        Your Orders
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.length > 0 ? (
          orders.map((order: any) => (
            <div
              key={order._id}
              className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-blue-600"
            >
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                Order ID: <br/> {order._id}
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
                    order.status === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-500"
                  } font-medium`}
                >
                  {order.status}
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
          ))
        ) : (
          <p className="text-gray-500 text-center text-lg">No orders found.</p>
        )}
      </div>
    </section>
  );
};

export default Orders;
