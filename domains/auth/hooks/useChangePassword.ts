import { logger } from "@/services/logger";
import { getAuth, updatePassword } from "firebase/auth";
import { useCallback, useState } from "react";

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const changePassword = useCallback(
    async (
      password: string,
      newPassword: string
    ): Promise<{ success: boolean; error?: string }> => {
      setLoading(true);
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return { success: false, error: "User not logged in" };

        await updatePassword(user, newPassword);

        // await send password change email
        return {
          success: true,
          error: "",
        };
      } catch (error: any) {
        logger.error(error, { method: "changePassword" });
        return {
          success: false,
          error: error.message ?? "Something went wrong",
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    changePassword,
  };
};
