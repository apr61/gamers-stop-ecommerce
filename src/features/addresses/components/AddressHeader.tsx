import Button from "@/components/ui/Button";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/store/hooks";
import { setAddressCurrentItem } from "../addressSlice";

const CategoryHeader = () => {
	const dispatch = useAppDispatch();

	return (
		<header className="flex items-center gap-4 w-full">
			<div className="ml-auto">
				<Button
					className="flex items-center gap-2"
					onClick={() =>
						dispatch(
							setAddressCurrentItem({
								record: null,
								action: "create",
							}),
						)
					}
				>
					<>
						<PlusOutlined />
						Add new address
					</>
				</Button>
			</div>
		</header>
	);
};

export default CategoryHeader;
