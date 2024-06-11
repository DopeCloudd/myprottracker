import {
  loginUserResponseSchema,
  registerUserResponseSchema,
} from "../../domain/entities/schemas/api.schema";

const API_URL = "http://localhost:3032";

export const loginUser = async (email: string, password: string) =>
  fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then(loginUserResponseSchema.parse);

export const registerUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) =>
  fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    }),
  })
    .then((response) => response.json())
    .then(registerUserResponseSchema.parse);
