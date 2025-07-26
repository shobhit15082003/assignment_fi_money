import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [quantities, setQuantities] = useState({});
  const [page, setPage] = useState(1); // 🆕 Track current page
  const [hasMore, setHasMore] = useState(true); // 🆕 Determine if next page exists

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/products?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setProducts(data);
      setHasMore(data.length === 10); // if less than 10, assume no more pages

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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

      alert("✅ Quantity updated!");
      setEditMode({ ...editMode, [id]: false });
    } catch (err) {
      alert("❌ Failed to update quantity: " + err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]); // 🆕 refetch when page changes

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        📦 Product Inventory
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products available.</p>
      ) : (
        <>
          <div className="grid gap-6">
            {products.map((p) => {
              const id = p.id || p._id;

              return (
                <div
                  key={id}
                  className="bg-white shadow-md rounded-xl border border-gray-200 p-6 transform transition-all duration-300 hover:scale-[1.015] hover:shadow-lg hover:border hover:border-blue-500"
                >
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500">SKU: {p.sku}</p>
                  </div>

                  <p className="text-gray-700 mb-2">💰 Price: ₹{p.price}</p>

                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-gray-700 font-medium">
                      📦 Quantity:
                    </span>
                    {editMode[id] ? (
                      <>
                        <input
                          type="number"
                          className="border border-gray-300 px-3 py-1 rounded-md w-24 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-sm"
                          value={quantities[id]}
                          onChange={(e) =>
                            setQuantities({
                              ...quantities,
                              [id]: e.target.value,
                            })
                          }
                        />
                        <button
                          onClick={() => handleUpdate(id)}
                          className="relative group bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md transition"
                        >
                          Save
                          <span className="absolute hidden group-hover:block text-xs bg-black text-white rounded px-2 py-1 top-[-35px] left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
                            Save quantity
                          </span>
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-800">{quantities[id]}</span>
                        <button
                          onClick={() =>
                            setEditMode({ ...editMode, [id]: true })
                          }
                          className="relative group bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition"
                        >
                          Edit
                          <span className="absolute hidden group-hover:block text-xs bg-black text-white rounded px-2 py-1 top-[-35px] left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
                            Edit quantity
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🧭 Pagination Controls */}
          <div className="flex justify-center mt-10 gap-4 items-center mb-5">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className={`px-4 py-2 rounded-md text-white ${
                page === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition`}
            >
              ◀ Prev
            </button>

            <span className="text-gray-700 font-medium">Page {page}</span>

            <button
              disabled={!hasMore}
              onClick={() => setPage((prev) => prev + 1)}
              className={`px-4 py-2 rounded-md text-white ${
                !hasMore
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition`}
            >
              Next ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}
