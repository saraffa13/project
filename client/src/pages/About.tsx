import { useSelector } from "react-redux";

const About = () => {
    const { language } = useSelector((state: any) => state.auth);

    return (
        <section className="dark:bg-gray-900 py-12 px-4">
            <div className="container max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-8 dark:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105">
                
                <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8">
                    About Us
                </h1>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    Welcome to <strong className="font-semibold text-indigo-600 dark:text-indigo-400">Medicart</strong>, your trusted source for quality medicines and healthcare products.
                </p>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    At <strong>Medicart</strong>, we understand the importance of health and well-being. Our mission is to provide you with a wide range of medications at competitive prices, ensuring that you have access to the treatments you need when you need them.
                </p>
                
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Why Choose Us?</h2>
                
                <ul className="space-y-4 text-gray-700 dark:text-gray-300 mb-8">
                    <li className="flex items-start">
                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold mr-2">•</span> <strong>Quality Assurance:</strong> We source our products from reputable manufacturers and ensure they meet the highest standards of quality.
                    </li>
                    <li className="flex items-start">
                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold mr-2">•</span> <strong>Expert Advice:</strong> Our knowledgeable staff is always ready to assist you with any questions you may have regarding your health and medications.
                    </li>
                    <li className="flex items-start">
                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold mr-2">•</span> <strong>Convenient Shopping:</strong> With our user-friendly online platform, you can easily browse and purchase your medicines from the comfort of your home.
                    </li>
                    <li className="flex items-start">
                        <span className="text-indigo-600 dark:text-indigo-400 font-semibold mr-2">•</span> <strong>Fast Delivery:</strong> We offer quick and reliable delivery services to ensure that you receive your orders promptly.
                    </li>
                </ul>
                
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Our Commitment</h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    We are committed to providing personalized service and building lasting relationships with our customers. Your health is our priority, and we strive to support you on your wellness journey.
                </p>
                
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Shop Now</h2>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    Explore our extensive range of medications and healthcare products.
                    <a
                        href="/medicines"
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-500 font-semibold transition duration-200 ease-in-out"
                    >
                        {" "}
                        Start shopping today!
                    </a>
                </p>
            </div>
        </section>
    );
};

export default About;
