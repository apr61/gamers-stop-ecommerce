import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAppDispatch } from "@/store/hooks";
import { PlusOutlined } from "@ant-design/icons";
import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { setBrandCurrentItem } from "../brandsSlice";

const BrandHeader = () => {
	const [search, setSearch] = useState<string>("");
	const [_, setSearchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		setSearchParams((prev) => {
			prev.set("search", e.target.value);
			return prev;
		});
	};
	return (
		<header className="flex items-center gap-4">
			<div className="flex justify-between w-full">
				<Button
					className="flex items-center gap-2"
					onClick={() =>
						dispatch(setBrandCurrentItem({ record: null, action: "create" }))
					}
				>
					<>
						<PlusOutlined />
						Add new brand
					</>
				</Button>
				<div className="flex gap-2">
					<Input
						type="search"
						placeholder="search"
						value={search}
						onChange={(e) => handleChange(e)}
						className="bg-accent border-border"
					/>
				</div>
			</div>
		</header>
	);
};

export default BrandHeader;
