import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SidebarMenu from "../../../components/SidebarMenu";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const { user: authUser } = useAuth(); // Alternatif menggunakan context/hook

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = Cookies.get("user");
        
        if (!userData) {
          navigate("/login", { replace: true });
          return;
        }

        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        // Optional: Verifikasi ke server jika diperlukan
        // const response = await verifyToken(parsedUser.token);
        
      } catch (err) {
        console.error("Failed to load user data:", err);
        setError("Gagal memuat data pengguna");
        Cookies.remove("user");
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-10 px-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="text-red-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <SidebarMenu activeItem="dashboard" />
          </div>
          
          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-800">DASHBOARD</h1>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-700 mb-2">
                    Selamat Datang, <span className="text-blue-600">{user?.name}</span>
                  </h2>
                  <p className="text-gray-600">
                    Anda login sebagai: <span className="font-semibold capitalize">{user?.role}</span>
                  </p>
                </div>
                
                {/* Dashboard Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Contoh widget */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-2">Total Pengguna</h3>
                    <p className="text-2xl font-bold text-blue-600">24</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <h3 className="font-medium text-green-800 mb-2">Total Roles</h3>
                    <p className="text-2xl font-bold text-green-600">5</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <h3 className="font-medium text-purple-800 mb-2">Aktivitas</h3>
                    <p className="text-2xl font-bold text-purple-600">12</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}