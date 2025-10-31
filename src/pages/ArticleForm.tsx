import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getArticles, updateArticles } from "../api/articlesApi";
import type { Article } from "../types/article";

export default function ArticleForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Article>({
    id: Date.now(),
    title: "",
    category: "",
    subcategory: "",
    author: "",
    content: "",
    image: "",
    rating: 0,
  });

  // Obtener lista actual
  const articles = queryClient.getQueryData<Article[]>(["articles"]);
  const existing = articles?.find((a) => a.id === Number(id));

  if (existing && formData.title === "") setFormData(existing);

  const mutation = useMutation({
    mutationFn: async (newArticle: Article) => {
      const articles = (await getArticles()) || [];
      let updated: Article[];

      if (existing) {
        updated = articles.map((a) =>
          a.id === newArticle.id ? newArticle : a
        );
      } else {
        updated = [...articles, newArticle];
      }

      return await updateArticles(updated); // ✅ guarda en JSONBin
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["articles"], data);
      navigate("/articles");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {existing ? "Editar artículo" : "Nuevo artículo"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="subcategory"
          placeholder="Subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="rating"
          type="number"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          min={0}
          max={5}
          className="border p-2 w-full rounded"
        />

        {mutation.isPending ? (
          <div>Saving data...</div>
        ) : (
          <button type="submit" className="px-4 py-2 rounded">
            {existing ? "Save changes" : "Create Article"}
          </button>
        )}
      </form>
    </div>
  );
}
