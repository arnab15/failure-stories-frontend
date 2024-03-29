import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
import withProtectedRoute from "../hoc/withProtectedRoute";
import authService from "../services/authService";

function Logout() {
  const router = useRouter();
  const { setCurrentUser, currentUser } = useAuth();
  if (!currentUser) {
    if (typeof window !== "undefined") {
      router.replace("/");
      return null;
    }
  }
  const logoutUser = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("_accessToken");
      setCurrentUser(null);
      router.replace("/home");
    } catch (error) {
      localStorage.removeItem("_accessToken");
      router.replace("/home");
      setCurrentUser(null);
      console.log("error logout");
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      logoutUser();
    }
  }, []);

  return null;
}

export default dynamic(() => Promise.resolve(withProtectedRoute(Logout)), {
  ssr: false,
});
