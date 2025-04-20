import api from "./axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch {
    throw new Error("Login failed");
  }
}

export async function register(
  credentials: RegisterCredentials
): Promise<AuthResponse> {
  try {
    const response = await api.post("/auth/register", credentials);
    return response.data;
  } catch {
    throw new Error("Registration failed");
  }
}
