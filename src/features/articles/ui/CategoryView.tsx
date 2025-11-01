import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getArticles } from "../api/articlesApi";
import type { Article } from "../domain/types";

export default function CategoryView() {
  const { category } = useParams();
  const [selectedSub, setSelectedSub] = useState<string>("all");

  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p>Error loading articles</p>;

  const filtered = articles?.filter(
    (a) => a.category.toLowerCase() === category?.toLowerCase()
  );

  const subcategories = Array.from(
    new Set(filtered?.map((a) => a.subcategory).filter(Boolean))
  );

  const visible =
    selectedSub === "all"
      ? filtered
      : filtered?.filter((a) => a.subcategory === selectedSub);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        to="/articles"
        className="text-blue-600 hover:underline flex items-center gap-1 mb-4"
      >
        <span>←</span> Back to all
      </Link>

      {/* Category title */}
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 capitalize text-gray-800">
        {category}
      </h2>

      {/* Subcategory filter buttons */}
      {subcategories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedSub("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              selectedSub === "all"
                ? "bg-blue-600! text-white! border-blue-600!"
                : "bg-gray-100! text-gray-700! hover:bg-gray-200!"
            }`}
          >
            All
          </button>

          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSub(sub ?? "")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                selectedSub === sub
                  ? "bg-blue-600! text-white! border-blue-600!"
                  : "bg-gray-100! text-gray-700! hover:bg-gray-200!"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Articles grid */}
      {visible && visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((a) => (
            <Link
              key={a.id}
              to={`/articles/${a.id}`}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-sm text-gray-500 capitalize">
                  {a.subcategory || "General"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No articles found.</p>
      )}
    </div>
  );
}
