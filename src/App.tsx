import "./App.css";
import { Route, Routes } from "react-router-dom";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Favorites from "./pages/Favorites";
import ArticleForm from "./pages/ArticleForm";
import MainLayout from "./layaouts/MainLayaout";
import CategoryView from "./pages/CategoryView";
import Home from "./pages/Home";

function App() {
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

export default App;
