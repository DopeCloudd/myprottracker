import { useGetCategoriesQuery } from "@/infrastructure/api/category.api";

export default function Categories() {
  const { data, isFetching, isLoading } = useGetCategoriesQuery();

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data?.map((category) => (
        <div key={category.id}>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  );
}
