const API_URL = "http://localhost:3032";

type FetchOptions = {
  method: "GET" | "POST";
  endpoint: string;
  body?: Record<string, string>;
};

const fetchClient = async ({ body, method, endpoint }: FetchOptions) => {
  const config: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "POST") {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    if (!response.ok) {
      const errorData = await response.json();
      return Promise.reject(errorData);
    }
    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default fetchClient;
