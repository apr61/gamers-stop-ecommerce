import { ChangeEvent, useState } from "react";
import "./addNewProduct.css";
import CloseIcon from "@mui/icons-material/Close";
import { addNewProductService } from "../../services/products";

const specifications = {
  "graphics Card": [
    "Graphics Ram Size",
    "GPU Clock Speed",
    "Video Output Interface",
    "Graphics Coprocessor",
  ],
  monitors: [
    "Screen Size",
    "Special Feature",
    "Refresh Rate",
    "Connectivity Technology",
  ],
  consoles: [],
  "keyboards & mouse": [
    "Compatible Devices",
    "Connectivity Technology",
    "Color",
  ],
  mousepads: ["Color", "Feature", "Material"],
  gamepads: [
    "Compatible Devices",
    "Color",
    "Controller Type",
    "Connectivity Technology",
  ],
  routers: [
    "Feature",
    "Frequency Band Class",
    "Wireless Communication Standard",
    "Model Name",
  ],
  storage: [
    "Digital Storage Capacity",
    "Hard Disk Interface",
    "Hard Disk Description",
    "Compatible Devices",
    "Installation Type",
    "Hard Disk Size",
  ],
  ram: [
    "Computer Memory Size",
    "RAM Memory Technology",
    "Memory Speed",
    "Compatible Devices",
  ],
  games: [],
};

const AddNewProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<FileList | null>(null);

  function fileHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImages(e.target.files);
    }
  }

  function handleFileRemove(i: number) {
    setImages((oldImages) => {
      if (!oldImages) return null;
      const filteredImages = Array.from(oldImages).filter(
        (_, ind) => ind !== i
      );
      return filteredImages.length > 0
        ? (filteredImages as unknown as FileList)
        : null;
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Prepare form data to send
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDesc", productDesc);
    formData.append("productBrand", productBrand);
    formData.append("productPrice", productPrice);
    formData.append("productQuantity", productQuantity);
    formData.append("category", category);
    if (images) {
      Array.from(images).forEach((image, index) => {
        formData.append(`productImage${index}`, image);
      });
    }
    // Call API to add new product
    // await addNewProductService(formData)
  };

  return (
    <section className="add-new-product">
      <h2>Add New Product</h2>
      <form className="add-new-product__form" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group">
          <label htmlFor="product_name" className="input-group__label">
            Product Name
          </label>
          <input
            className="input-group__input"
            type="text"
            placeholder="Enter product name"
            id="product_name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product_desc" className="input-group__label">
            Product Description
          </label>
          <textarea
            id="product_desc"
            className="product_desc"
            value={productDesc}
            onChange={(e) => setProductDesc(e.target.value)}
            required
            placeholder="Product description"
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="product_brand" className="input-group__label">
            Brand
          </label>
          <input
            className="input-group__input"
            type="text"
            placeholder="Enter brand"
            id="product_brand"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product_price" className="input-group__label">
            Product Price
          </label>
          <input
            className="input-group__input"
            type="number"
            placeholder="Enter product price"
            id="product_price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product_quantity" className="input-group__label">
            Product Quantity
          </label>
          <input
            className="input-group__input"
            type="number"
            placeholder="Enter product quantity"
            id="product_quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <select
            className="input_select"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select category</option>
            <option value="graphics card">Graphics Card</option>
            <option value="monitors">Monitors</option>
            <option value="storage">Storage</option>
            <option value="games">Games</option>
            <option value="ram">Ram</option>
            <option value="router">Router</option>
            <option value="mousepads">Mousepads</option>
            <option value="keyboards & mouse">Keyboards & Mouse</option>
            <option value="consoles">Consoles</option>
            <option value="gamepad">Gamepad</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="product_images" className="input-group__label">
            Product Images
          </label>
          <input
            type="file"
            id="product_images"
            value=""
            multiple={true}
            accept="image/*"
            onChange={(e) => fileHandler(e)}
          />
          {images && images?.length > 0 && (
            <div className="product_images_wrapper">
              {Array.from(images).map((image, i) => (
                <div className="product_image" key={image.name}>
                  <p>{image.name}</p>
                  <button
                    type="button"
                    className="product_image_btn"
                    onClick={() => handleFileRemove(i)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="add-new-product__btn">Add product</button>
      </form>
    </section>
  );
};

export default AddNewProduct;
