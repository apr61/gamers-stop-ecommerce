import {
	addressSearch,
	selectAddresses,
	selectAddressSearch,
	setAddressCurrentItem,
} from "../addressSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Address, QueryType } from "@/types/api";
import AddressCard from "./AddressCard";

const AddressList = () => {
	const { data, totalItems } = useAppSelector(selectAddressSearch);
	const { status, error } = useAppSelector(selectAddresses);
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page") || 1;
	const search = searchParams.get("search") || "";
	const itemsPerPage = 6;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const dispatch = useAppDispatch();

	const handleRead = (record: Address) => {
		dispatch(setAddressCurrentItem({ record: record, action: "read" }));
	};
	const handleUpdate = (record: Address) => {
		dispatch(setAddressCurrentItem({ record: record, action: "update" }));
	};
	const handleDelete = (record: Address) => {
		dispatch(setAddressCurrentItem({ record: record, action: "delete" }));
	};

	useEffect(() => {
		const from = (+page - 1) * itemsPerPage;
		const to = from + itemsPerPage - 1;
		const query: QueryType<Address> = {
			pagination: {
				from: from,
				to: to,
			},
			search: {
				query: "name",
				with: search,
			},
			tableName: "categories",
		};
		dispatch(addressSearch(query));
	}, []);

	if (error) return <p>Error: {error}</p>;

	return (
		<div className="flex flex-col gap-4">
			{
				data.map(address => (
					<AddressCard addressData={address}/>
				))
			}
		</div>
	);
};

export default AddressList;
