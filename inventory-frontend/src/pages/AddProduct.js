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
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="grid gap-3">
        {["name", "type", "sku", "image_url", "description", "quantity", "price"].map((field) => (
          <input
            key={field}
            type={field === "quantity" || field === "price" ? "number" : "text"}
            className="border p-2"
            placeholder={field}
            onChange={(e) =>
              setForm({
                ...form,
                [field]: field === "quantity" || field === "price"
                  ? parseFloat(e.target.value)
                  : e.target.value,
              })
            }
          />
        ))}
        <button className="bg-indigo-600 text-white p-2 rounded">Add</button>
      </form>
    </div>
  );
}
