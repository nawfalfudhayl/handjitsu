import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem("token");
        console.log("User logged out successfully");

        router.replace("/");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    handleLogout();
  }, []);

  return null;
};

export default Logout;
