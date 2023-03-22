import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CartItems(props) {
	const { imageUrl, make, model, price } = props;


	return (
		<tbody>
			{/* row 1 */}
			<tr>
				<th className="text-center">
					<button>
						<FontAwesomeIcon icon={faTrash} size="xl" />
					</button>
				</th>
				<td>
					<div className="flex items-center space-x-3">
						<div className="avatar">
							<div className="mask mask-squircle w-12 h-12">
								<img src={imageUrl} alt="Avatar Tailwind CSS Component" />
							</div>
						</div>
						<div>
							<div className="font-bold">{make}</div>
							<div className="text-sm opacity-50">{model}</div>
						</div>
					</div>
				</td>
				<td>{1}</td>
				<th>
					<div className="font-bold">{price}</div>
				</th>
			</tr>
		</tbody>
	);
}