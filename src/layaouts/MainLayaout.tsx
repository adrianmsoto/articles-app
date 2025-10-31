import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
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

      <main className="flex-1 mx-auto px-4 pt-24 pb-10 min-w-11/12 w-full">
        <Outlet />
      </main>
    </div>
  );
}
