import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../api/articlesApi";
import type { Article } from "../domain/types";
import { useEffect, useState } from "react";
import {
  updateArticleRating,
  useDeleteArticle,
} from "../domain/articlesService";

const ArticleDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery<Article, Error>({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id!),
  });
  const [isSavingRating, setIsSavingRating] = useState(false);
  const [rating, setRating] = useState(0);
  const deleteMutation = useDeleteArticle(Number(id));

  useEffect(() => {
    if (data?.rating) setRating(data.rating);
  }, [data]);

  const handleRate = async (value: number) => {
    if (!data) return;
    setIsSavingRating(true);
    setRating(value); // actualización visual inmediata
    try {
      await updateArticleRating(data, value, id!);
    } finally {
      setIsSavingRating(false);
    }
  };

  const renderLink = (
    <Link
      data-cy="back-to-articles"
      to="/articles"
      className="text-blue-600 hover:underline mb-4 inline-block"
    >
      ← Back to list
    </Link>
  );
  if (isLoading) return <p>Loading article...</p>;
  if (isError)
    return (
      <div>
        {renderLink}
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div className="min-w-[400px] max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-lg border border-gray-100 transition hover:shadow-xl">
      {/* Navigation or back link */}
      {renderLink}

      {/* Title */}
      <h3 className="text-3xl font-bold mb-3 text-gray-900 leading-snug">
        {data?.title}
      </h3>

      <div className="flex flex-col md:flex-row gap-6 items-center mb-4">
        {/* Image */}
        <div className="flex-1 overflow-hidden rounded-2xl">
          <img
            src={data?.image || "https://picsum.photos/600/400?blur=3"}
            alt={data?.title || "Default image"}
            className="w-full h-48 md:h-36 object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-4">
          <p className="text-gray-700 text-left">{data?.content}</p>
          <p className="text-xs text-right text-gray-400">
            Author: {data?.author}
          </p>
        </div>
      </div>

      {/* Rating section */}
      <div className="flex items-center gap-1 mb-6">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            data-cy={`rate-${num}`}
            onClick={() => handleRate(num)}
            disabled={isSavingRating}
            className={`text-2xl transition-transform duration-200 hover:scale-110 ${
              num <= rating ? "text-yellow-400" : "text-gray-300"
            } ${isSavingRating ? "opacity-25 cursor-wait" : ""}`}
          >
            ★
          </button>
        ))}
        {isSavingRating ? (
          <div className="ml-2 text-sm text-gray-400 italic">Updating...</div>
        ) : (
          <span className="ml-2 text-gray-600 text-sm font-medium">
            {rating}/5
          </span>
        )}
      </div>

      {/* Category and subcategory */}
      <p className="text-sm text-gray-500 mb-6 italic">
        {`Category: ${data?.category} › ${data?.subcategory}`}
      </p>

      {/* Action buttons */}
      <div className="flex gap-3 justify-between items-center">
        {deleteMutation.isPending ? (
          <div className="text-gray-400 italic">Deleting...</div>
        ) : (
          <button
            onClick={() => {
              if (confirm("Delete this article?")) deleteMutation.mutate();
            }}
            data-cy="btn-delete-article"
            disabled={deleteMutation.isPending}
            className="bg-red-200! px-4 py-2 rounded-lg font-medium transition hover:bg-red-600 active:scale-95"
          >
            Delete
          </button>
        )}

        <Link
          to={`/articles/edit/${data?.id}`}
          className="bg-blue-500 text-white! px-4 py-2 rounded-lg font-medium transition hover:bg-blue-600 active:scale-95"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ArticleDetail;
