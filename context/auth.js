import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import Custom404 from "../pages/404";
import FirebaseAuth from "../service/auth";
import firebaseApp from "../service/firebase";

const publicPath = [
  "/",
  "/login",
  "/faq",
  "/gallery",
  "/journal",
  "/faq/[pid]",
  "/gallery/[pid]",
  "/journal/[pid]",
];

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(false);

  const firebaseAuth = new FirebaseAuth(firebaseApp);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await firebaseAuth.signIn(email, password);
      const {
        user: { uid },
      } = userCredential;
      setUid(uid);
      router.push("/");
      setLoading(false);
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-email"
      ) {
        console.log("이메일 또는 비밀번호가 일치하지 않습니다");
      }
    }
  };

  const logout = async () => {
    setLoading(true);
    firebaseAuth.signout();
    setUid(null);
    setLoading(false);
  };

  useEffect(() => {
    firebaseAuth.userChange((user) => {
      user && setUid(user.uid);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!uid,
        uid,
        loading,
        login,
        logout,
        firebaseAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (
    !isAuthenticated &&
    !publicPath.some((path) => path === router.pathname)
  ) {
    return <Custom404 />;
  }

  return children;
};
