import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getArticleById,
  deleteArticle,
  getArticles,
  updateArticles,
} from "../api/articlesApi";
import type { Article } from "../domain/article";
import { queryClient } from "../../../core/api/queryClient";
import { useEffect, useState } from "react";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery<Article, Error>({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id!),
  });

  const mutation = useMutation({
    mutationFn: () => deleteArticle(Number(id)),
    onSuccess: (updated) => {
      queryClient.setQueryData(["articles"], updated);
      navigate("/articles");
    },
  });

  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (data?.rating) setRating(data.rating);
  }, [data]);

  if (isLoading) return <p>Loading article...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleRate = async (value: number) => {
    setRating(value);
    try {
      const articles = (await getArticles()) || [];
      const updated = articles.map((a) =>
        a.id === data?.id ? { ...a, rating: value } : a
      );
      const saved = await updateArticles(updated);

      // Update cache
      queryClient.setQueryData(["articles"], saved);
      queryClient.setQueryData(["article", id], { ...data, rating: value });
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <div className="min-w-[400px] max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <Link
        to="/articles"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to list
      </Link>
      <h3 className="text-2xl font-bold mb-3 text-gray-800">{data?.title}</h3>

      <div className="my-4">
        <div className="text-left">{data?.content}</div>
        <p className="text-xs text-right">Author: {data?.author}</p>
      </div>
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => handleRate(num)}
            className={`text-2xl transition ${
              num <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
        <span className="ml-2 text-gray-600 text-sm">{rating}/5</span>
      </div>
      <p className="text-gray-600 mb-4">Category: {data?.category}</p>
      <div className="flex gap-2 mt-6 justify-between items-center">
        {mutation.isPending ? (
          <div>Pending...</div>
        ) : (
          <button
            onClick={() => {
              if (confirm("¿Eliminar este artículo?")) mutation.mutate();
            }}
            disabled={mutation.isPending}
            className="bg-red-400! text-white! rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}

        <Link
          to={`/articles/edit/${data?.id}`}
          className=" text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ArticleDetail;
