import { useSelector } from "react-redux";
import MedicineCard from "../components/MedicineCard";
import { MdRemoveShoppingCart } from "react-icons/md"; 
import { getKeyWord } from "../utils/helper";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, totalPrice } = useSelector((state: any) => state.cart);
  const { languageKeyWords, language } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600"> 
        {getKeyWord("APP_YOUR_CART", languageKeyWords, language)}
      </h1>

      <div className="flex flex-wrap justify-center">
        {(!cartItems || cartItems.length === 0) && (
          <div className="flex flex-col items-center justify-center w-full h-64 bg-gray-100 dark:bg-gray-700 text-center rounded-lg shadow-lg p-6">
            <MdRemoveShoppingCart className="text-6xl text-gray-500 mb-4" />
            <p className="text-3xl font-bold text-gray-600 dark:text-gray-300">
              {getKeyWord("APP_NO_ITEMS_FOUND", languageKeyWords, language)}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {getKeyWord("APP_CART_EMPTY_MESSAGE", languageKeyWords, language)}
            </p>
          </div>
        )}
        {cartItems.map((item: any) => (
          <MedicineCard 
            key={item._id} 
            medicine={item.item} 
            price={item.item.price} 
            quantity={item.quantity} 
            type={'cart'} 
            priceOff={item.item.priceOff} 
          />
        ))}
      </div>

      {(cartItems && cartItems.length > 0) && (
        <div className="mt-10 flex flex-col items-end space-y-4">
          <div className="p-6 bg-blue-50 rounded-lg shadow-md w-full max-w-sm text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {getKeyWord("APP_TOTAL_PRICE", languageKeyWords, language)}
            </h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
          <button 
            onClick={checkoutHandler} 
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-lg transform hover:scale-105">
            {getKeyWord("APP_PROCEED_TO_CHECKOUT", languageKeyWords, language)}
          </button>
        </div>
      )}
    </section>
  );
};

export default CartPage;
