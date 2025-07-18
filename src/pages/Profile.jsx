import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateProfile, updatePassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

function getInitials(name, email) {
  if (name && name.trim().length > 0) {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  }
  if (email) {
    return email[0].toUpperCase();
  }
  return "U";
}

function Profile() {
    const { currentUser } = useAuth();
    const [name, setName] = useState(currentUser?.displayName || "");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const handleUpdateProfile = async () => {
        let updated = false;
        try {
            if (name !== currentUser.displayName) {
                await updateProfile(currentUser, { displayName: name });
                updated = true;
            }
            if (password) {
                await updatePassword(currentUser, password);
                updated = true;
                setPassword("");
            }
            if (updated) {
                toast.success("Profile updated!");
            } else {
                toast("No changes to update.");
            }
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            toast.error("Failed to logout");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50 py-10 px-2">
            <div className="bg-white/90 rounded-2xl shadow-2xl border border-blue-100 p-10 w-full max-w-md relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_30%_30%,#60a5fa_0%,transparent_60%)]"></div>
                {/* Avatar */}
                <div className="flex flex-col items-center mb-6 relative z-10">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-5xl shadow-lg mb-2">
                    {currentUser?.photoURL ? (
                      <img src={currentUser.photoURL} alt="avatar" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span>{getInitials(name, currentUser?.email)}</span>
                    )}
                  </div>
                  <div className="text-lg font-semibold text-blue-700">{name || currentUser?.email}</div>
                </div>
                <h1 className="text-2xl font-extrabold text-blue-700 mb-6 text-center drop-shadow z-10">Your Profile</h1>
                <div className="mb-6 z-10">
                    <label className="block text-sm font-medium text-blue-700 mb-1">Name</label>
                    <input
                        type="text"
                        className="block w-full rounded-full border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-400 focus:ring-blue-400 text-lg px-4 py-3 mb-2"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="border-t border-blue-100 my-6" />
                <div className="mb-6 z-10">
                    <label className="block text-sm font-medium text-blue-700 mb-1">Email</label>
                    <input
                        type="email"
                        className="block w-full rounded-full border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-400 focus:ring-blue-400 text-lg px-4 py-3 mb-2"
                        value={currentUser?.email || ""}
                        disabled
                    />
                </div>
                <div className="border-t border-blue-100 my-6" />
                <div className="mb-6 z-10">
                    <label className="block text-sm font-medium text-blue-700 mb-1">New Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className="block w-full rounded-full border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-blue-400 focus:ring-blue-400 text-lg px-4 py-3 mb-2"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="New password"
                    />
                    <button
                        type="button"
                        className="text-blue-500 text-xs mt-1 mb-2"
                        onClick={() => setShowPassword(s => !s)}
                    >
                        {showPassword ? "Hide" : "Show"} Password
                    </button>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full shadow transition font-semibold mb-4 z-10" onClick={handleUpdateProfile}>Update Profile</button>
                <button className="w-full bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 font-semibold transition z-10" onClick={handleLogout}>Logout</button>
            </div>
        </main>
    );
}

export default Profile;