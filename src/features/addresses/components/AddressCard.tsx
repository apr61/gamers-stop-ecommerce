import { Link } from "react-router-dom";
import { Address } from "@/types/api";

type AddressCardProps = {
	addressData: Address;
};

function AddressCard({ addressData }: AddressCardProps) {
	const {
		id,
		name,
		address,
		pincode,
		cityDistrict,
		townLocality,
		state,
		phoneNumber,
	} = { ...addressData };
	return (
		<div className="w-full border shadow-sm">
			<div className="p-2">
				<p className="text-sm font-bold">{name}</p>
				<div className="py-3">
					<p className="text-gray-500">{address}, {townLocality}</p>
					<p className="text-gray-500">
						{cityDistrict} - {pincode}
					</p>
					<p className="text-gray-500">{state}</p>
				</div>
				<p className="text-gray-500">
					Mobile: {phoneNumber}
				</p>
			</div>
			<div className="flex w-full py-3 border-t-2 border var(--clr-border) justify-around">
				<Link
					to={`edit/${id}`}
					className="text-center text-gray-700 w-1/2 focus:outline focus:ring-2 focus:ring-gray-700 rounded"
				>
					Edit
				</Link>
				<span>|</span>
				<button
					className="border-0 bg-transparent cursor-pointer text-center text-red-600 w-1/2 focus:outline focus:ring-2 focus:ring-gray-700 rounded"
					onClick={() => {}}
				>
					Remove
				</button>
			</div>
		</div>
	);
}

export default AddressCard;
