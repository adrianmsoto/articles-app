import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.favorites);
  if (favorites.length === 0) return <p>Empty Favorites</p>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Favorites</h2>

      <ul className="space-y-3">
        {favorites &&
          favorites.map((item, index) => (
            <li
              key={index}
              className="border p-4 rounded-lg hover:shadow-md transition"
            >
              <Link
                to={`/articles/${item.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                {item.title}
              </Link>
              <p className="text-sm text-gray-500">{item.category}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Favorites;
