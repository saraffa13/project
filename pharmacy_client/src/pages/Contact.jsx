import React, { useState } from 'react';
import emailjs from "emailjs-com";
import { notify, notifyError } from '../utils/helper';

const Contact = () => {

	const [formData, setFormData] = useState({
		name: '',
		address: '',
		email: '',
		phone: '',
		message: '',
	});

	const [errors, setErrors] = useState({
		name: '',
		address: '',
		email: '',
		phone: '',
		message: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const validateForm = () => {
		let formErrors = { name: '', address: '', email: '', phone: '', message: '' };
		let isValid = true;

		if (!formData.name.trim()) {
			formErrors.name = 'Name is required';
			isValid = false;
		}

		if (!formData.address.trim()) {
			formErrors.address = 'Address is required';
			isValid = false;
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(formData.email)) {
			formErrors.email = 'Please enter a valid email address';
			isValid = false;
		}

		const phonePattern = /^\d+$/;
		if (!phonePattern.test(formData.phone) || formData.phone.length < 10) {
			formErrors.phone = 'Please enter a valid phone number';
			isValid = false;
		}

		if (!formData.message.trim()) {
			formErrors.message = 'Message is required';
			isValid = false;
		}

		setErrors(formErrors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const templateParams = {
			from_name: formData.name,
			from_email: formData.email,
			message: formData.message,
			phone: formData.phone,
			address: formData.address,
		};

		if (validateForm()) {
			try {

				const response = await emailjs.send(
					import.meta.env.VITE_EMAILJS_SERVICE_ID,
					import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
					templateParams,
					import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
				);


				notify("Message sent successfully!");
				setFormData({
					name: '',
					address: '',
					email: '',
					phone: '',
					message: '',
				})

			} catch (err) {
				console.log("Failed to send email:", err);
				notifyError("Failed to send message. Please try again.");
			}
		}
	};

	return (
		<section className="p-8 bg-gray-100 min-h-screen">
			<h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Contact Us</h1>

			<div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
				<form onSubmit={handleSubmit} noValidate>
					<div className="mb-6">
						<label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
							placeholder="Enter your name"
						/>
						{errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
					</div>

					<div className="mb-6">
						<label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Address</label>
						<textarea
							id="address"
							name="address"
							value={formData.address}
							onChange={handleInputChange}
							className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
							rows={3}
							placeholder="Enter your address"
						/>
						{errors.address && <p className="text-red-500 text-sm mt-2">{errors.address}</p>}
					</div>

					<div className="mb-6">
						<label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
							placeholder="Enter your email"
						/>
						{errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
					</div>

					<div className="mb-6">
						<label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handleInputChange}
							className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
							placeholder="Enter your phone number"
						/>
						{errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
					</div>

					<div className="mb-6">
						<label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleInputChange}
							className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
							rows={5}
							placeholder="Enter your message"
						/>
						{errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
					</div>

					<div className="text-center">
						<button
							type="submit"
							className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-300"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Contact;
