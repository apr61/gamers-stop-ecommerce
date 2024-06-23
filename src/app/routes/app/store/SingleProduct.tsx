import PageLoader from "@/components/PageLoader";
import ProductPreviewImage from "@/components/ProductImagePreview";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { getProductBySlugUrl } from "@/services/api/product";
import { Product } from "@/types/api";
import { currencyFormatter } from "@/utils/currencyFormatter";
import { Navigate, useParams } from "react-router-dom";

export const SingleProduct = () => {
  const { slugUrl } = useParams();
  if (!slugUrl) return <Navigate to="/store" />;
  const {
    data: product,
    error,
    loading,
  } = useCustomQuery<Product>(() => getProductBySlugUrl(slugUrl), true);
  if (loading) return <PageLoader />;
  if (error) return <p>{error}</p>;
  if (product === null) return <Navigate to="/store" />;
  return (
    <div className="max-w-7xl mx-auto w-full p-4 rounded-md flex flex-col md:flex-row gap-12">
      <ProductPreviewImage images={product.images} name={product.name} />
      <div className="w-full bg-dimBlack p-4  rounded-md">
        <header>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p>
            <span className="text-gray-700 dark:text-slate-400 font-semibold">
              Published :{" "}
            </span>
            {new Date(product.created_at).toLocaleDateString()}
          </p>
        </header>
        <p className="text-xl font-bold my-4">
          {currencyFormatter(product.price)}
        </p>
        <section className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Description :
          </h3>
          <p>{product.description}</p>
        </section>
        <section className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Services :
          </h3>
          <ul>
            <li>10 days replacement</li>
            <li>Cash on delivery available</li>
          </ul>
        </section>
        <section className="my-4 w-full">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Specifications :
          </h3>
          <div className="border border-border rounded-sm p-4 my-2">
            <table className="w-full border-collapse table-auto">
              <tbody>
                <tr className="border-b border-border">
                  <th className="text-start p-2">Category</th>
                  <td className="p-2">{product.category?.category_name}</td>
                </tr>
                <tr className="border-b border-border">
                  <th className="text-start p-2">Brand</th>
                  <td className="p-2">{product.brand?.brand_name}</td>
                </tr>
                {product.specifications.map((spec, index) => (
                  <tr
                    key={spec.name + String(index)}
                    className="border-b border-border"
                  >
                    <th className="text-start p-2">{spec.name}</th>
                    <td className="p-2">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
