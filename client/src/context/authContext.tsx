import { createContext, useState, ReactNode, useEffect } from "react";
import {
  getLoggedInUser,
  signup as signupUser,
  login as loginUser,
  logout as logoutUser,
} from "../api/imageGeneratorAPI";
import { LoginCredentials, SignUpCredentials, User } from "../models/user";

export interface AuthContextProps {
  user: User | null;
  authReady: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isError: string | null;
}

// Create the context
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isError, setError] = useState<string | null>(null);

  // Track if the authentication is ready
  const [authReady, setAuthReady] = useState<boolean>(false);

  useEffect(() => {
    setError(null);
    // Fetch the logged in user when the component mounts
    const fetchUser = async () => {
      setError(null);

      try {
        const loggedInUser = await getLoggedInUser();
        setUser(loggedInUser);
      } catch (error) {
        console.error("Failed to fetch logged in user:", error);
      } finally {
        setAuthReady(true);
      }
    };

    fetchUser();
  }, [authReady]);

  // Log in the user with provided credentials
  const login = async (credentials: LoginCredentials) => {
    setError(null);

    try {
      const loggedInUser = await loginUser(credentials);
      setUser(loggedInUser);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.error("Failed to log in user:", error);
    }
  };

  // Sign up a new user with provided credentials
  const signup = async (credentials: SignUpCredentials) => {
    setError(null);

    try {
      const newUser = await signupUser(credentials);
      setUser(newUser);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.error("Failed to sign up user:", error);
    }
  };

  // Logout the current user
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setAuthReady(true);
    } catch (error) {
      console.error("Failed to log out user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, authReady, login, signup, logout, isError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
