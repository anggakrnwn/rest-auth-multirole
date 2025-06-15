import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-5 mb-8 bg-gray-100 rounded-lg shadow">
      <div className="py-10 px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          FULLSTACK JAVASCRIPT DEVELOPER
        </h1>
        <p className="text-lg text-gray-700 mb-4 max-w-2xl">
          Belajar Full Stack JavaScript Developer dengan Express dan React
        </p>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap gap-4">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg text-lg"
          >
            REGISTER
          </Link>
          <Link
            to="/login"
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg text-lg"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}
