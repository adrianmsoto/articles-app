import { Link, Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function MainLayout() {
  const theme = useSelector((state: RootState) => state.theme.mode);
  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-gray-50" : "bg-white text-gray-900"
      }`}
    >
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <nav className="container mx-auto flex justify-center gap-6 py-4">
          <Link to="/" className="hover:underline font-medium text-gray-700">
            Home
          </Link>
          <Link
            to="/articles"
            className="hover:underline font-medium text-gray-700"
          >
            Articles
          </Link>
          <Link
            to="/favorites"
            className="hover:underline font-medium text-gray-700"
          >
            Favorites
          </Link>
        </nav>
      </header>
      <div className="absolute top-20 right-4">
        <ThemeToggle />
      </div>
      <main className="flex-1 mx-auto px-4 pt-24 pb-10 min-w-11/12 w-full">
        <Outlet />
      </main>
    </div>
  );
}
