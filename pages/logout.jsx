import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
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
      router.replace("/");
    } catch (error) {
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

export default Logout;
