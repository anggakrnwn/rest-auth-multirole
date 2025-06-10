import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="p-5 mb-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="py-10 px-5">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">FULLSTACK JAVASCRIPT DEVELOPER</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Belajar Full Stack JavaScript Developer dengan Express dan React di SantriKoding.com
                </p>
                <hr className="border-gray-300 mb-6" />
                <Link
                    to="/register"
                    className="inline-block bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg mr-4 hover:bg-blue-700 transition"
                >
                    REGISTER
                </Link>
                <Link
                    to="/login"
                    className="inline-block bg-gray-500 text-white text-lg font-medium px-6 py-3 rounded-lg hover:bg-gray-600 transition"
                >
                    LOGIN
                </Link>
            </div>
        </div>
    );
}
