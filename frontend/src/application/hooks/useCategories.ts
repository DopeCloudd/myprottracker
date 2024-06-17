import { fetchCategories } from "@/application/redux/slices/category.slice";
import { RootState, useAppDispatch } from "@/application/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useCategories = () => {
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, loading, error, dispatch]);
};

export default useCategories;
