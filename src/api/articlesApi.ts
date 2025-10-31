import type { Article } from "../types/article";

// Usa import.meta.env en Vite (navegador)
const BIN_URL = import.meta.env.VITE_BIN_URL;
const MASTER_KEY = import.meta.env.VITE_JSONBIN_KEY;
const isTest =
  typeof process !== "undefined" && process.env.NODE_ENV === "test";
const API_URL = isTest ? process.env.VITE_BIN_URL : BIN_URL;
const API_KEY = isTest ? process.env.VITE_JSONBIN_KEY : MASTER_KEY;

export const getArticles = async (): Promise<Article[]> => {
  const res = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
  });

  if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

  const data = await res.json();
  return data?.record?.articles ?? [];
};

export const getArticleById = async (id: string): Promise<Article> => {
  const articles = await getArticles();
  const article = articles.find((a) => a.id === parseInt(id));
  if (!article) throw new Error("Not found Article");
  return article;
};

export const updateArticles = async (articles: Article[]) => {
  const res = await fetch(BIN_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify({ articles }),
  });

  if (!res.ok) throw new Error(`Error al guardar: ${res.status}`);
  const data = await res.json();
  return data?.record?.articles ?? [];
};

export const deleteArticle = async (id: number) => {
  const articles = await getArticles();
  const update = articles.filter((a) => a.id !== id);
  return await updateArticles(update);
};
