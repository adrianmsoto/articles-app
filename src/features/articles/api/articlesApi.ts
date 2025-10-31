import type { Article } from "../domain/types";

// ToDo, make this automatic to allow run tests
// const API_URL = import.meta.env.VITE_BIN_URL;
// const API_KEY = import.meta.env.VITE_JSONBIN_KEY;
// const API_URL = process.env.VITE_BIN_URL
// const API_KEY = process.env.VITE_JSONBIN_KEY
const API_URL = "https://api.jsonbin.io/v3/b/6904d2fcd0ea881f40c9b279";
const API_KEY = "$2a$10$/dIgjdhgM.rEL/JdsuIi5uBXLUpyJrLDrTYliJwPJwVyfHKWA.AL2";

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
  const res = await fetch(API_URL, {
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
