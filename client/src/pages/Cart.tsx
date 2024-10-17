import { useSelector } from "react-redux";
import MedicineCard from "../components/MedicineCard";
import { MdRemoveShoppingCart } from "react-icons/md"; 
import { getKeyWord } from "../utils/helper";

const CartPage = () => {

  const { cartItems } = useSelector((state: any) => state.cart);
  const {languageKeyWords, language} = useSelector((state:any)=>state.auth)
  console.log(cartItems);

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center"> {getKeyWord("APP_YOUR_CART", languageKeyWords, language)}</h1>

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
          <MedicineCard key={item._id} medicine={item.item} quantity={item.quantity} type={'cart'} />
        ))}
      </div>

      <div className="mt-10 text-right">
        <h2 className="text-xl font-bold"></h2>
        {(cartItems && cartItems.length > 0) && (
          <button className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded hover:bg-blue-600">
            {getKeyWord("APP_PROCEED_TO_CHECKOUT", languageKeyWords, language)}
          </button>
        )}
      </div>
    </section>
  );
};

export default CartPage;
