import AppRoutes from "./routes";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-lg font-semibold">
            HOME
          </Link>

          <div>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              anggakrnwn
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AppRoutes />
      </div>
    </div>
  );
}
