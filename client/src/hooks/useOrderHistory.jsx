import React, { useState } from "react";

export default function useOrderHistory(userID) {
	const [purchaseHistory, setPurchaseHistory] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:8080/api/users/${userID}/my_orders`)
			.then((response) => {
				setPurchaseHistory({ ...response.data });
			})
			.catch((err) => console.error("123", err));
	}, []);

	return { purchaseHistory };
}
