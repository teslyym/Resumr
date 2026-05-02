import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Placeholder methods
  const login = async (email, password) => {
    console.log("TODO: implement login", { email, password });
  };

  const register = async (name, email, password) => {
    console.log("TODO: implement register", { name, email, password });
  };

  const logout = async () => {
    console.log("TODO: implement logout");
    setUser(null);
  };

  const _devToggleAuth = () => {
    setUser(
      user
        ? null
        : { name: "Test User", email: "[email protected]", plan: "free" },
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, _devToggleAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
