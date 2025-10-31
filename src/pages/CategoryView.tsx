import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArticles } from "../api/articlesApi";
import type { Article } from "../types/article";
import { useState } from "react";

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
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/articles" className="text-blue-600 hover:underline">
        ← Back to all
      </Link>

      <h2 className="text-3xl font-bold mt-4 mb-6 capitalize">{category}</h2>

      {subcategories.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setSelectedSub("all")}
            className={`px-3 py-1 rounded ${
              selectedSub === "all"
                ? "bg-blue-500 text-blue-500"
                : "bg-gray-200"
            }`}
          >
            All
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSub(sub ? sub : "")}
              className={`px-3 py-1 rounded ${
                selectedSub === sub
                  ? "bg-blue-500 text-blue-500"
                  : "bg-gray-200"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {visible && visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visible.map((a) => (
            <Link
              key={a.id}
              to={`/articles/${a.id}`}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">{a.title}</h3>
              <p className="text-sm text-gray-500">{a.subcategory}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No articles.</p>
      )}
    </div>
  );
}
