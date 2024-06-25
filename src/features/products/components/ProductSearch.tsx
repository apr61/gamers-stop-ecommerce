import { SearchOutlined } from "@ant-design/icons";

const ProductSearch = () => {
	return (
		<div>
			<div className="relative flex items-center w-[30rem] bg-transparent border border-gray-500 rounded-md focus-within:outline focus-within:outline-1 focus-within:outline-blue-500">
				<label htmlFor="search_products" className="sr-only">
					Search for products
				</label>
				<span className="p-2 block text-lg cursor-pointer">
					<SearchOutlined />
				</span>
				<input
					type="search"
					id="search_products"
					className="bg-transparent p-2 w-full focus:outline-none"
					placeholder="Search product name"
					list="products-searched"
				/>
				<div className="hidden absolute top-[3rem] border border-border p-2 rounded-sm bg-dimBlack h-[15rem] overflow-y-auto w-full">
					{[...Array(5)].map((_, i) => (
						<p key={i} className="p-2 border-b border-border">Product 1</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductSearch;
