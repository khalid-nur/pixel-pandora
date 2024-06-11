import { IGallery, IGalleryInput } from "../models/image";
import { LoginCredentials, SignUpCredentials, User } from "../models/user";

// Function to fetch data
const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const respond = await fetch(input, init);

  if (respond.ok) {
    return respond;
  } else {
    const errorBody = await respond.json();

    const errorMessage = errorBody;

    throw Error(errorMessage);
  }
};
// Fetches the currently logged-in user
export const getLoggedInUser = async (): Promise<User> => {
  const response = await fetchData("/api/v1/users", { method: "GET" });

  return response.json();
};

// Signs up a new user with provided credentials
export const signup = async (credentials: SignUpCredentials): Promise<User> => {
  const response = await fetchData("/api/v1/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return response.json();
};

// Logs in a user with provided credentials
export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await fetchData("/api/v1/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return response.json();
};

// Logs out the current user
export const logout = async (): Promise<void> => {
  await fetchData("/api/v1/users/logout", { method: "POST" });
};

// Get images data from the backend database
export const getImages = async (): Promise<IGallery[]> => {
  const responded = await fetchData("/api/v1/images/", {
    method: "GET",
  });

  return responded.json();
};

// Creates a new image
export const createImage = async (note: IGalleryInput): Promise<IGallery> => {
  const respond = await fetchData("/api/v1/images/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });

  return respond.json();
};
