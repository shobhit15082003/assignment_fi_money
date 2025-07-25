import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  );
}
