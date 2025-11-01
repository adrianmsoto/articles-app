import type { Article } from "../domain/types";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../api/articlesApi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../core/store";
import { useState } from "react";
import { toggleFavorite } from "../redux/favoritesSlice";
import { usePagination } from "../../../core/hooks/usePagination";

const Articles = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const {
    data: listArticles = [],
    isLoading,
    isError,
    error,
  } = useQuery<Article[], Error>({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  const [category, setCategory] = useState("All");
  const filtered =
    category === "All"
      ? listArticles
      : listArticles.filter(
          (a) => a.category === category || a.subcategory === category
        );
  const { paginated, page, totalPages, next, prev } = usePagination(
    filtered,
    40
  );

  const categories = [
    "All",
    ...new Set(
      listArticles.flatMap((a) => [a.category, a.subcategory].filter(Boolean))
    ),
  ];

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error: {error.message}</h3>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        List of articles
      </h2>

      {/* Filter and Create section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
        <select
          className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <Link
          data-cy="create-article-btn"
          to="/articles/new"
          className="inline-block bg-blue-600 text-white! px-4 py-2 rounded-md text-center hover:bg-blue-700 transition w-full sm:w-auto"
        >
          + Create new
        </Link>
      </div>

      <p className="text-xs text-gray-500 mb-4 text-left">
        Showing {filtered.length} articles
      </p>

      {paginated.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map((item, index) => {
            const isFav = favorites.some((f) => f.id === item.id);
            return (
              <li
                key={index}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                <div>
                  <Link
                    to={`/articles/${item.id}`}
                    className="text-lg font-semibold hover:underline line-clamp-2"
                  >
                    {item.title}
                  </Link>

                  <p className="text-sm text-gray-500 my-3">
                    <Link
                      to={`/articles/categories/${item.category}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {item.category}
                    </Link>{" "}
                    {item.subcategory && `> ${item.subcategory}`}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-yellow-500 font-semibold">
                    ⭐ {item.rating}
                  </p>
                  <button
                    onClick={() => dispatch(toggleFavorite(item))}
                    className={`px-3 py-1 rounded-md text-sm font-light transition-all ${
                      isFav
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {isFav ? "❤️ Remove" : "🤍 Favorite"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-600 mt-6">No articles available.</p>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <button
          onClick={prev}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
        >
          ← Previous
        </button>

        <span className="text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={next}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Articles;
