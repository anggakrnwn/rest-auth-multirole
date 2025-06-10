import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";
import { getMenuData } from "../services/api/menu"; // Adjusted import path
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [menus, setMenus] = useState([]);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const menuData = await getMenuData();
        setMenus(menuData);
        
        // Auto-expand parent menu of current route
        const activeMenu = menuData.find(menu => 
          menu.path === location.pathname || 
          menu.children?.some(child => child.path === location.pathname)
        );
        
        if (activeMenu) {
          setExpandedMenus(prev => ({ ...prev, [activeMenu.id]: true }));
        }
      } catch (error) {
        console.error("Menu loading error:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadMenu();
  }, [location.pathname, navigate]);

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  const renderMenu = (menuItems) => {
    return menuItems.map((menu) => (
      <div key={menu.id} className="mb-1">
        <div
          className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
            location.pathname === menu.path
              ? "bg-blue-100 text-blue-800"
              : "hover:bg-gray-100 text-gray-700"
          }`}
          onClick={() => {
            if (menu.children?.length) {
              toggleMenu(menu.id);
            } else if (menu.path !== "#") {
              navigate(menu.path);
            }
          }}
        >
          {menu.icon && (
            <span className="mr-3 text-lg">
              <i className={`fa fa-${menu.icon}`} />
            </span>
          )}
          <span className="flex-1 font-medium">{menu.name}</span>
          {menu.children?.length > 0 && (
            <span className="ml-2 text-sm">
              {expandedMenus[menu.id] ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          )}
        </div>

        {menu.children?.length > 0 && expandedMenus[menu.id] && (
          <div className="ml-8 mt-1">
            {renderMenu(menu.children)}
          </div>
        )}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {renderMenu(menus)}
      </div>
      
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <FiLogOut className="mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}