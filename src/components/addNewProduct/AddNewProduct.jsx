import React, { useState } from 'react'
import './addNewProduct.css'
import CloseIcon from '@mui/icons-material/Close';

const specifications = {
    "graphics Card": ["Graphics Ram Size", "GPU Clock Speed", "Video Output Interface", "Graphics Coprocessor"],
    "monitors": ["Screen Size", "Special Feature", "Refresh Rate", "Connectivity Technology"],
    "consoles": [],
    "keyboards & mouse": ["Compatible Devices", "Connectivity Technology", "Color"],
    "mousepads": ["Color", "Feature", "Material"],
    "gamepads": ["Compatible Devices", "Color", "Controller Type", "Connectivity Technology"],
    "routers": ["Feature", "Frequency Band Class", "Wireless Communication Standard", "Model Name"],
    "storage": ["Digital Storage Capacity", "Hard Disk Interface", "Hard Disk Description", "Compatible Devices", "Installation Type", "Hard Disk Size"],
    "ram": ["Computer Memory Size", "RAM Memory Technology", "Memory Speed", "Compatible Devices"],
    "games": []
}

const AddNewProduct = () => {
    const [images, setImages] = useState()
    function fileHandler(e) {
        setImages(e.target.files)
    }
    function handleFileRemove(i){
        setImages(oldImages => Array.from(oldImages).filter((_, ind) => ind !== i))
    }

    return (
        <section className='add-new-product'>
            <h2>Add New Product</h2>
            <form className='add-new-product__form'>
                <div className="input-group">
                    <label htmlFor="product_name" className="input-group__label">
                        Product Name
                    </label>
                    <input
                        className="input-group__input"
                        type="text"
                        placeholder="Enter product name"
                        id="product_name"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="product_desc" className="input-group__label">
                        Product Description
                    </label>
                    <textarea id='product_desc' className='product_desc' required placeholder='Product description'></textarea>
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
                        required
                    />
                </div>
                <div className="input-group">
                    <select className='input_select' required>
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
                    <input type="file" id='product_images' files={images} multiple accept='image/*' onChange={fileHandler} />
                    {
                        images?.length > 0 && (
                            <div className='product_images_wrapper'>
                                {
                                    Array.from(images).map((image, i) => (
                                        <div className='product_image' key={image.name}>
                                            <p>{image.name}</p>
                                            <button type='button' className='product_image_btn' onClick={() => handleFileRemove(i)}><CloseIcon /></button>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                <button className='add-new-product__btn'>Add product</button>
            </form>
        </section>
    )
}

export default AddNewProduct