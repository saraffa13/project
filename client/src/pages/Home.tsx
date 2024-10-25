import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ctg = [
  'https://images.unsplash.com/photo-1549477754-350cf45a1772?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1577401132921-cb39bb0adcff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1670381252200-873b6e3c6363?q=80&w=1867&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const backgroundImages = [
  'https://images.unsplash.com/photo-1674702727317-d29b2788dc4a?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1671886498603-a71f79861aa8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1671580130532-cafe74b5c439?q=80&w=1792&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1652787545245-5e39748cdf97',
];

const Home = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { medicines } = useSelector((state: any) => state.medicine)
  const categories = [...new Set(medicines.map((medicine: any) => medicine.category))].slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      
      <section
        className="relative w-full h-[600px] bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="max-w-7xl mx-auto flex items-center justify-center h-full text-center px-4 md:px-0 z-10 relative">
          <div>
            <h1 className="text-5xl font-bold mb-4 text-white">Get Your Medicines Delivered Fast!</h1>
            <p className="text-xl text-white mb-8">Order now and receive your products within 3 days.</p>
            <Link to="/medicines" className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category: any, index) => (
              <Link key={category} to={`medicines/${category}`} className="text-center group">
                <img
                  src={ctg[index]}
                  alt={category}
                  className="w-28 h-28 mx-auto rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <p className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-blue-600">{category}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {medicines.slice(0, 3).map((product: any) => (
              <Link key={product.name} to={product.link} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-6 rounded-t-lg" />
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="mt-2 text-lg font-semibold text-blue-600">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <h2 className="text-3xl font-bold text-center mb-8">Special Offers</h2>
          <div className="text-center">
            <p className="text-xl mb-4">Get 20% off on your first purchase!</p>
            <Link to="/medicines" className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition">
              Explore Offers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
