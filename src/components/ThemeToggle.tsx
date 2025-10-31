// src/components/ThemeToggle.tsx
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { toggleTheme } from "../store/slices/themeSlice";

const ThemeToggle = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="flex items-center justify-center gap-2 p-2 rounded-full border transition-colors duration-300
                 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {mode === "light" ? (
        <>
          <span>🌞</span>
          <span className="sr-only">Switch to Dark Mode</span>
        </>
      ) : (
        <>
          <span>🌙</span>
          <span className="sr-only">Switch to Light Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
