import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Get first letter of name for avatar
    const avatarLetter = user?.name?.charAt(0).toUpperCase() || 'U';

    return (
        <nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-blue-600 text-xl shadow-md">
                            Q
                        </div>
                        <span className="text-white font-bold text-xl">QuickPay</span>
                    </div>

                    {/* User Info & Logout */}
                    <div className="flex items-center space-x-4">
                        {/* User Avatar */}
                        <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-semibold text-blue-600">
                                {avatarLetter}
                            </div>
                            <span className="text-white font-medium hidden sm:block">{user?.name}</span>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                        >
                            <LogOut size={18} />
                            <span className="hidden sm:block">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
