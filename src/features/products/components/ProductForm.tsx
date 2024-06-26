import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ProductFormValues } from "@/types/api";
import FileInput from "@/components/ui/FileInput";
import { ChangeEvent, useEffect, useState, memo } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import ImagePreview from "@/components/ImagePreview";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  selectCategories,
} from "@/features/categories/categorySlice";
import {
  addProduct,
  editProduct,
  selectProdcutsCurrentItem,
} from "@/features/products/productSlice";
import { fetchBrands, selectBrands } from "@/features/brands/brandsSlice";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { createSlug } from "@/utils/utils";

type ProductFormProps = {
  product?: ProductFormValues;
  images?: string[];
  saveFn: (data: ProductFormValues) => Promise<void>
  title: string
};

const ProductsForm = ({ product, images, saveFn, title }: ProductFormProps) => {
  const methods = useForm<ProductFormValues>({
    defaultValues: product ? product : undefined,
  });
  const { action, error, status } = useAppSelector(
    selectProdcutsCurrentItem,
  );
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    images ? images : [],
  );

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const formData: ProductFormValues = {
      ...data,
      slug_url: createSlug(data.name),
    };
    await saveFn(formData)
    methods.reset();
    setImagePreviews([]);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-6"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <h3 className="text-xl">{title}</h3>
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="flex flex-col gap-6 flex-[1] md:flex-[1.5] lg:flex-[3]">
            <ProductMain />
            <ProductGallery
              setImagePreviews={setImagePreviews}
              imagePreviews={imagePreviews}
            />
            <ProductSpecification />
          </div>
          <div className="flex-[1] flex gap-6 flex-col">
            <CategorySelect
              currentCategoryId={product ? product.category_id : null}
            />
            <BrandSelect currentBrandId={product ? product.brand_id : null} />
            <ProductStock />
            <ProductPrice />
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={methods.formState.isSubmitting || status === "pending"}
            loading={methods.formState.isSubmitting || status === "pending"}
          >
            Save
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductsForm;

type CategorySelectProps = {
  currentCategoryId: number | null;
};

const CategorySelect = ({ currentCategoryId }: CategorySelectProps) => {
  const { data: categories, status, error } = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();
  return (
    <>
      <div className="w-full flex gap-2 flex-col  shadow-md p-4 rounded-md bg-accent">
        <label htmlFor="category" className="text-lg cursor-pointer">
          Category
        </label>
        <Select
          id="category"
          className={`w-full p-4  border border-border rounded-md cursor-pointer bg-accent`}
          {...register("category_id", { required: "Category is required" })}
          value={currentCategoryId ? currentCategoryId : ""}
        >
          <Select.Option value="">Select category</Select.Option>
          {status === "pending" ? (
            <Select.Option value="">Loading...</Select.Option>
          ) : (
            categories.map((category) => (
              <Select.Option
                key={category.id}
                value={category.id}
                className={`${
                  currentCategoryId === category.id
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                {category.category_name}
              </Select.Option>
            ))
          )}
        </Select>
      </div>
      {errors.category_id && (
        <p className="text-red-500">{errors.category_id.message}</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

type BrandSelectProps = {
  currentBrandId: number | null;
};

const BrandSelect = ({ currentBrandId }: BrandSelectProps) => {
  const { data, status, error } = useAppSelector(selectBrands);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();
  return (
    <>
      <div className="w-full flex gap-2 flex-col shadow-md p-4 rounded-md bg-accent">
        <label htmlFor="brand" className="text-lg cursor-pointer">
          Brand
        </label>
        <Select
          id="brand"
          className={`w-full p-4  border border-border rounded-md cursor-pointer bg-accent`}
          {...register("brand_id", { required: "Brand is required" })}
          value={currentBrandId ? currentBrandId : ""}
        >
          <Select.Option value="">Select brand</Select.Option>
          {status === "pending" ? (
            <Select.Option value="">Loading...</Select.Option>
          ) : (
            data.map((brand) => (
              <Select.Option
                key={brand.id}
                value={brand.id}
                className={`${
                  currentBrandId === brand.id ? "bg-primary text-white" : ""
                }`}
              >
                {brand.brand_name}
              </Select.Option>
            ))
          )}
        </Select>
      </div>
      {errors.brand_id && (
        <p className="text-red-500">{errors.brand_id.message}</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

const ProductMain = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();
  return (
    <div className="bg-accent shadow-md p-4 rounded-md flex flex-col gap-2">
      <Input
        placeholder="Product name"
        label="Name"
        {...register("name", { required: "Product name is required" })}
        autoFocus={true}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <div className="flex gap-2 flex-col">
        <label htmlFor="description" className="text-lg cursor-pointer">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="focus:outline focus:outline-2 focus:outline-blue-500 border border-border rounded-md p-2 resize-none bg-accent"
          placeholder="Product description"
          rows={10}
        ></textarea>
      </div>
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
    </div>
  );
};

type ProductGalleryType = {
  setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
  imagePreviews: string[];
};

const ProductGallery = ({
  setImagePreviews,
  imagePreviews,
}: ProductGalleryType) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<ProductFormValues>();
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filePreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreviews(filePreviews);
    }
  };
  const handleDelete = async (url: string) => {
    setImagePreviews((prev) => prev.filter((imgUrl) => imgUrl != url));
    setValue("images", null);
  };
  return (
    <div className="bg-accent shadow-md p-4 rounded-md flex flex-col gap-2">
      <h2 className="text-lg">Product Gallery</h2>
      <div className="min-h-[10rem]">
        <FileInput
          label="Click to upload images"
          {...register("images", {
            required:
              imagePreviews.length === 0 ? "Category image is required" : false,
            onChange: handleFileChange,
          })}
          multiple={true}
        />
      </div>
      <ImagePreview images={imagePreviews} handleOnClick={handleDelete} />
      {errors.images && <p className="text-red-500">{errors.images.message}</p>}
    </div>
  );
};

const ProductSpecification = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();
  const { fields, append, remove } = useFieldArray<ProductFormValues>({
    name: "specifications",
  });
  useEffect(() => {
    if (fields.length < 3) {
      for (let i = 0; i < 2; i++) {
        append({ name: "", value: "" });
      }
    }
  }, [fields, append]);

  const handleRemove = (index: number) => {
    if (fields.length > 3) {
      remove(index);
    }
  };
  return (
    <div className="bg-accent w-full p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg">Specifications</h3>
        <Button
          btnType="icon"
          className="border border-border p-1"
          onClick={() => append({ name: "", value: "" })}
        >
          <PlusOutlined />
        </Button>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid gap-4 grid-cols-[1fr_1fr_auto] items-center"
          >
            <Input
              placeholder="Specification name"
              {...register(`specifications.${index}.name`, {
                required: "Specification name is required",
              })}
            />
            <Input
              placeholder="Specification value"
              {...register(`specifications.${index}.value`, {
                required: "Specification value is required",
              })}
            />
            <Button
              btnType="icon"
              className="border border-border p-2"
              onClick={() => handleRemove(index)}
            >
              <CloseOutlined />
            </Button>
          </div>
        ))}
      </div>
      {errors.specifications && (
        <p className="text-red-500">{errors.specifications.message}</p>
      )}
    </div>
  );
};

const ProductStock = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();
  return (
    <div className="bg-accent p-4 rounded-md shadow-md">
      <Input
        placeholder="Stock"
        label="Stock"
        type="number"
        {...register("quantity", {
          required: "Quantity is required",
          min: {
            value: 0,
            message: "Quantity must be greater that 0",
          },
        })}
      />
      {errors.quantity && (
        <p className="text-red-500">{errors.quantity.message}</p>
      )}
    </div>
  );
};

const ProductPrice = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();
  return (
    <div className="bg-accent p-4 rounded-md shadow-md">
      <Input
        placeholder="Price"
        label="Price"
        type="number"
        {...register("price", {
          required: "Price is required",
          min: {
            value: 1,
            message: "Price must be greater that 1",
          },
        })}
      />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}
    </div>
  );
};
