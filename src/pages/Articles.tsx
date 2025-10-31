import type { Article } from "../types/article";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../api/articlesApi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { toggleFavorite } from "../store/slices/favoritesSlice";
import { useState } from "react";
import { usePagination } from "../hooks/usePagination";

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
    6
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
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        List of articles
      </h2>

      <div className="flex justify-between mb-10 items-center">
        <select
          className="border border-gray-300 rounded-lg p-2 w-[60%]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <Link to="/articles/new" className="inline-block p-2 rounded">
          + Create artícule
        </Link>
      </div>

      <p className="text-xs text-gray-500 mb-2 text-left">
        Mostrando {filtered.length} artículos
      </p>
      {paginated.length > 0 ? (
        <ul>
          {paginated.map((item, index) => {
            const isFav = favorites.some((f) => f.id === item.id);
            return (
              <li
                key={index}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow flex flex-col justify-between my-2"
              >
                <div>
                  <Link
                    to={`/articles/${item.id}`}
                    className="text-xl font-semibold hover:underline"
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
                    className={`px-2 py-1 rounded-md text-sm font-light transition-all ${
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
        <p>No hay artículos disponibles.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={prev}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          ← preview
        </button>
        <span>
          page {page} of {totalPages}
        </span>
        <button
          onClick={next}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          next →
        </button>
      </div>
    </div>
  );
};

export default Articles;
