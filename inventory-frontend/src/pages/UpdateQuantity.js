import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function UpdateQuantity() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(0);

  const updateQuantity = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/products/${id}/quantity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });
    if (res.ok) alert("Quantity updated");
    else alert("Failed");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Update Quantity for ID: {id}</h1>
      <input className="border p-2 mb-3 w-full" type="number" onChange={(e) => setQuantity(parseInt(e.target.value))} />
      <button className="bg-yellow-600 text-white p-2 rounded" onClick={updateQuantity}>
        Update
      </button>
    </div>
  );
}
