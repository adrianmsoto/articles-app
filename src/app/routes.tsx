import { Route, Routes } from "react-router-dom";
import Articles from "../features/articles/ui/Articles";
import ArticleDetail from "../features/articles/ui/ArticleDetail";
import ArticleForm from "../features/articles/ui/ArticleForm";
import MainLayout from "../shared/layout/MainLayout";
import Home from "../features/home/ui/Home";
import CategoryView from "../features/articles/ui/CategoryView";
import Favorites from "../features/articles/ui/Favorites";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/new" element={<ArticleForm />} />
        <Route path="articles/edit/:id" element={<ArticleForm />} />
        <Route path="articles/:id" element={<ArticleDetail />} />
        <Route path="favorites" element={<Favorites />} />
        <Route
          path="/articles/categories/:category"
          element={<CategoryView />}
        />
        <Route path="*" element={<div>Not found</div>} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
