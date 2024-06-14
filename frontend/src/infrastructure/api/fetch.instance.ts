const API_URL = "http://localhost:3032";

type FetchOptions = {
  method: "GET" | "POST";
  endpoint: string;
  body?: Record<string, string>;
  headers?: Record<string, string>;
};

type FetchResponse<T> = {
  data: T;
  error?: string;
};

const fetchClient = async <T>({
  body,
  method,
  headers,
  endpoint,
}: FetchOptions): Promise<FetchResponse<T>> => {
  const config: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (method === "POST" && body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    if (!response.ok) {
      const errorData = await response.json();
      return Promise.reject({ error: errorData });
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return Promise.reject({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export default fetchClient;
