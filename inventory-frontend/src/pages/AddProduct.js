import React, { useState } from "react";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    sku: "",
    image_url: "",
    description: "",
    quantity: 0,
    price: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const resultText = await res.text();
      console.log("Raw response:", resultText);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${resultText}`);
      }

      alert("✅ Product added successfully!");
    } catch (err) {
      console.error("❌ Add Product Error:", err.message);
      alert("Failed to add product: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 bg-white shadow-xl rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        ➕ Add New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5"
      >
        {[
          { field: "name", label: "Product Name" },
          { field: "type", label: "Type" },
          { field: "sku", label: "SKU" },
          { field: "image_url", label: "Image URL" },
          { field: "description", label: "Description" },
          { field: "quantity", label: "Quantity", type: "number" },
          { field: "price", label: "Price (₹)", type: "number" },
        ].map(({ field, label, type }) => (
          <div key={field} className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type || "text"}
              className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder={label}
              onChange={(e) =>
                setForm({
                  ...form,
                  [field]:
                    type === "number"
                      ? parseFloat(e.target.value)
                      : e.target.value,
                })
              }
            />
          </div>
        ))}

        <button
          type="submit"
          className="relative group bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-md"
        >
          Add Product
          <span className="absolute hidden group-hover:block text-xs bg-black text-white rounded px-2 py-1 top-[-35px] left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
            Submit new product
          </span>
        </button>
      </form>
    </div>
  );
}
