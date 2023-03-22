import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export default function CheckoutForm({ products, onSuccess, totalInString }) {
	const amount_in_cents = products.reduce(
		(acc, product) => acc + parseInt(product.price_in_cents),
		0
	);

	const stripe = useStripe();
	const elements = useElements();
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState(null);
	const handleSubmit = async (event) => {
		event.preventDefault();
		setProcessing(true);

		// Create a PaymentIntent on your server
		const response = await axios.post("/api/checkout", {
			amount_in_cents,
			products,
		});
		const { clientSecret: client_secret } = response.data;

		// Use the client secret to confirm the payment on the client-side
		console.log(client_secret.client_secret);
		const { error, paymentIntent } = await stripe.confirmCardPayment(
			client_secret.client_secret,
			{
				payment_method: {
					card: elements.getElement(CardElement),
				},
			}
		);

		if (error) {
			setError(error.message);
			setProcessing(false);
		} else {
			// Payment succeeded, call onSuccess callback
			onSuccess();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			{error && <div>{error}</div>}
			<button disabled={processing}>
				{processing ? "Processing..." : `Pay ${totalInString}`}
			</button>
		</form>
	);
}
