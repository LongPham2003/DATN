import { useState } from "react";

import ListProduct from "./Product/ListProduct";
import ListProductDetail from "./ProductDetail/ListProductDetail";

export default function SanPham() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "San Pham",
      content: <ListProduct />,
    },
    {
      name: "San Pham Chi tiet",
      content: <ListProductDetail />,
    },
  ];

  return (
    <div className="mx-auto min-w-full max-w-md">
      {/* Tabs Navigation */}
      <div className="flex space-x-4 border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 transition-opacity duration-300 ${
              activeTab === index
                ? "border-b-2 border-blue-500 font-semibold text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 rounded-md border bg-white p-4 shadow-md">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
