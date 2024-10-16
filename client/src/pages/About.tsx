import React from 'react';

const About = () => {
    return (
        <div className='p-4'>
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
        </div>
    );
};

export default About;
