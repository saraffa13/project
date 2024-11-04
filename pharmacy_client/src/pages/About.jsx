import { useSelector } from "react-redux";

const About = () => {

    const { language } = useSelector((state) => state.auth);

    return (
        <section className="dark:bg-gray-900">
            {language === 'english' ? (<div className='p-4'>
                <section className={`max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800`}>

                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">About Us</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        Welcome to <strong>Your Pharmacy Name</strong>, your trusted source for quality medicines and healthcare products.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        At Your Pharmacy Name, we understand the importance of health and well-being. Our mission is to provide you with a wide range of medications at competitive prices, ensuring that you have access to the treatments you need when you need them.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Why Choose Us?</h2>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
                        <li><strong>Quality Assurance:</strong> We source our products from reputable manufacturers and ensure they meet the highest standards of quality.</li>
                        <li><strong>Expert Advice:</strong> Our knowledgeable staff is always ready to assist you with any questions you may have regarding your health and medications.</li>
                        <li><strong>Convenient Shopping:</strong> With our user-friendly online platform, you can easily browse and purchase your medicines from the comfort of your home.</li>
                        <li><strong>Fast Delivery:</strong> We offer quick and reliable delivery services to ensure that you receive your orders promptly.</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Commitment</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        We are committed to providing personalized service and building lasting relationships with our customers. Your health is our priority, and we strive to support you on your wellness journey.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Shop Now</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        Explore our extensive range of medications and healthcare products.
                        <a href="/shop" className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400 font-semibold"> Start shopping today!</a>
                    </p>
                </section>
            </div>) : (<div className='p-4'>
                <section className={`max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800`}>

                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">हमारे बारे में</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        आपका स्वागत है <strong>आपके फार्मेसी का नाम</strong> में, जहां आप उच्च गुणवत्ता वाली दवाएं और स्वास्थ्य उत्पाद पा सकते हैं।
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        <strong>आपके फार्मेसी का नाम</strong> में, हम स्वास्थ्य और कल्याण के महत्व को समझते हैं। हमारा उद्देश्य आपको प्रतिस्पर्धात्मक कीमतों पर दवाओं की एक विस्तृत श्रृंखला उपलब्ध कराना है ताकि आपको समय पर इलाज मिल सके।
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">हमें क्यों चुनें?</h2>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
                        <li><strong>गुणवत्ता की गारंटी:</strong> हम अपने उत्पादों को विश्वसनीय निर्माताओं से मंगाते हैं और यह सुनिश्चित करते हैं कि वे उच्चतम गुणवत्ता मानकों को पूरा करते हों।</li>
                        <li><strong>विशेषज्ञ सलाह:</strong> हमारी जानकार टीम आपके स्वास्थ्य और दवाओं से संबंधित किसी भी प्रश्न का उत्तर देने के लिए हमेशा तैयार है।</li>
                        <li><strong>सुविधाजनक खरीदारी:</strong> हमारे उपयोगकर्ता-मित्रवत ऑनलाइन प्लेटफ़ॉर्म के माध्यम से आप आसानी से घर बैठे अपनी दवाओं को खरीद सकते हैं।</li>
                        <li><strong>तेजी से डिलीवरी:</strong> हम त्वरित और विश्वसनीय डिलीवरी सेवाएं प्रदान करते हैं ताकि आपको समय पर आपका ऑर्डर प्राप्त हो सके।</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">हमारी प्रतिबद्धता</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        हम व्यक्तिगत सेवा प्रदान करने और अपने ग्राहकों के साथ दीर्घकालिक संबंध बनाने के लिए प्रतिबद्ध हैं। आपका स्वास्थ्य हमारी प्राथमिकता है, और हम आपकी सेहतमंद यात्रा में आपका समर्थन करते हैं।
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">अभी खरीदारी करें</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                        हमारी दवाओं और स्वास्थ्य उत्पादों की विस्तृत श्रृंखला का पता लगाएं।
                        <a href="/shop" className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400 font-semibold"> आज ही खरीदारी शुरू करें!</a>
                    </p>
                </section>
            </div>)}
        </section>
    );
};

export default About;
