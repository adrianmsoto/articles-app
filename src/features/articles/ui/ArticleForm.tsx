import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getArticles, updateArticles } from "../api/articlesApi";
import type { Article } from "../domain/types";

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

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get List
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simple
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.author) newErrors.author = "Author is required";
    if (!formData.content) newErrors.content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // NO enviar si hay errores
    }

    mutation.mutate(formData);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {existing ? "Editar artículo" : "Nuevo artículo"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            name="title"
            data-cy="input-title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.title && (
            <p className="text-red-400 text-xs text-left">{errors.title}</p>
          )}
        </div>

        <div>
          <input
            name="category"
            data-cy="input-category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.category && (
            <p className="text-red-400 text-xs text-left">{errors.category}</p>
          )}
        </div>
        <input
          name="subcategory"
          data-cy="input-subcategory"
          placeholder="Subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <div>
          <input
            name="author"
            data-cy="input-author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.author && (
            <p className="text-red-400 text-xs text-left">{errors.author}</p>
          )}
        </div>
        <div>
          <textarea
            name="content"
            data-cy="input-content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {errors.content && (
            <p className="text-red-400 text-xs text-left">{errors.content}</p>
          )}
        </div>
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="rating"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        {mutation.isPending ? (
          <div>Saving data...</div>
        ) : (
          <button
            data-cy="submit-article"
            type="submit"
            className="px-4 py-2 rounded"
          >
            {existing ? "Save changes" : "Create Article"}
          </button>
        )}
      </form>
    </div>
  );
}
