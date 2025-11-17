"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, LogOut, Video, Plus } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="bg-zinc-950 text-zinc-100 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Home Link */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-zinc-100 hover:text-indigo-400 transition-colors duration-200"
            prefetch={true}
            onClick={() =>
              showNotification("Welcome to ImageKit ReelsPro", "info")
            }
          >
            <Home className="w-6 h-6" />
            <span className="hidden sm:inline">Clips</span>
          </Link>

          {/* Navigation and User Menu */}
          <div className="flex items-center gap-4">
            {/* Add Post Button */}
            <Link
              href="/upload"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-100 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors duration-200"
              onClick={() => showNotification("Navigating to Add Post", "info")}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Add Post</span>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <div className="group">
                <button
                  className="flex items-center gap-2 p-2 rounded-full text-zinc-300 hover:bg-zinc-800 hover:text-indigo-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="User menu"
                >
                  <User className="w-6 h-6" />
                  {session && (
                    <span className="hidden md:inline text-sm font-medium">
                      {session.user?.email?.split("@")[0]}
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-64 bg-zinc-900 text-zinc-100 rounded-lg shadow-xl opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 transform group-focus-within:translate-y-0 translate-y-2 border border-zinc-800">
                  {session ? (
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-zinc-400 border-b border-zinc-800">
                        <span className="font-medium">
                          {session.user?.email}
                        </span>
                      </div>
                      <Link
                        href="/upload"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-indigo-400 transition-colors duration-200"
                        onClick={() =>
                          showNotification("Welcome to Admin Dashboard", "info")
                        }
                      >
                        <Video className="w-4 h-4" />
                        Video Upload
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-zinc-800 hover:text-red-400 w-full text-left transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="py-2">
                      <Link
                        href="/login"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-indigo-400 transition-colors duration-200"
                        onClick={() =>
                          showNotification("Please sign in to continue", "info")
                        }
                      >
                        <User className="w-4 h-4" />
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}