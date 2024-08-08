import { useGetRequestsQuery } from "@/infrastructure/api/request.api";
import { useEffect, useState } from "react";

interface Data {
  id: number;
  url: string;
  email: string;
}

function createData(id: number, url: string, email: string): Data {
  return { id, url, email };
}

const useRequests = () => {
  const { data: requests, isLoading: requestsLoading } = useGetRequestsQuery();

  const [rows, setRows] = useState(
    () =>
      requests?.map((request) =>
        createData(request.id, request.url, request.user.email)
      ) ?? []
  );

  useEffect(() => {
    if (requests) {
      const updatedRows = requests.map((request) =>
        createData(request.id, request.url, request.user.email)
      );
      setRows(updatedRows);
    }
  }, [requests]);

  return {
    rows,
    requestsLoading,
  };
};

export default useRequests;
