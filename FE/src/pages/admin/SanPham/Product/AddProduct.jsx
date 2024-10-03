import React, { useState } from 'react';

export default function AddProduct() {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log({ productName, category, description });
    };

    return (
        <div className="w-72 mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Thêm sản phẩm</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="productName" className="block mb-1">Tên sản phẩm:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block mb-1">Danh mục:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    >
                        <option value="">Chọn danh mục</option>
                        <option value="category1">Danh mục 1</option>
                        <option value="category2">Danh mục 2</option>
                        <option value="category3">Danh mục 3</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="block mb-1">Mô tả:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                    Thêm sản phẩm
                </button>
            </form>
        </div>
    );
}