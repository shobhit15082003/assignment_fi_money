import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [quantities, setQuantities] = useState({});

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setProducts(data);

      const initialQuantities = {};
      const initialEditMode = {};
      data.forEach((p) => {
        const id = p.id || p._id;
        initialQuantities[id] = p.quantity;
        initialEditMode[id] = false;
      });

      setQuantities(initialQuantities);
      setEditMode(initialEditMode);
    } catch (err) {
      alert("Failed to load products");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/products/${id}/quantity`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: parseInt(quantities[id]) }),
      });

      if (!res.ok) throw new Error(await res.text());

      alert("Quantity updated!");
      setEditMode({ ...editMode, [id]: false }); // Switch back to Edit mode
    } catch (err) {
      alert("Failed to update quantity: " + err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-6 px-4">
      <h2 className="text-2xl font-bold mb-4">Product Inventory</h2>

      {products.map((p) => {
        const id = p.id || p._id;

        return (
          <div key={id} className="border p-4 rounded shadow mb-4">
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p>SKU: {p.sku}</p>
            <p>Price: ₹{p.price}</p>

            <div className="mt-2 flex items-center gap-3">
              <span className="text-sm font-medium">Quantity:</span>
              {editMode[id] ? (
                <>
                  <input
                    type="number"
                    className="border px-2 py-1 w-24"
                    value={quantities[id]}
                    onChange={(e) =>
                      setQuantities({ ...quantities, [id]: e.target.value })
                    }
                  />
                  <button
                    onClick={() => handleUpdate(id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{quantities[id]}</span>
                  <button
                    onClick={() => setEditMode({ ...editMode, [id]: true })}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
