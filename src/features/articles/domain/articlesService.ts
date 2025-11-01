import { useMutation } from "@tanstack/react-query";
import { deleteArticle, getArticles, updateArticles } from "../api/articlesApi";
import { queryClient } from "../../../core/api/queryClient";
import { useNavigate } from "react-router-dom";
import type { Article } from "./types";

export const updateArticleRating = async (
  article: Article,
  value: number,
  id: string
) => {
  try {
    const articles = (await getArticles()) || [];
    const updated = articles.map((a) =>
      a.id === article.id ? { ...a, rating: value } : a
    );
    const saved = await updateArticles(updated);

    // Update cache
    queryClient.setQueryData(["articles"], saved);
    queryClient.setQueryData(["article", id], { ...article, rating: value });

    return saved;
  } catch (err) {
    console.error("Error updating rating:", err);
    throw err;
  }
};

export const useDeleteArticle = (id: number) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteArticle(id),
    onSuccess: (updatedArticles) => {
      queryClient.setQueryData(["articles"], updatedArticles);
      navigate("/articles");
    },
  });
};

export const saveArticle = async (article: Article, existing?: Article) => {
  const articles = (await getArticles()) || [];
  const updated = existing
    ? articles.map((a) => (a.id === article.id ? article : a))
    : [...articles, article];
  return await updateArticles(updated);
};
