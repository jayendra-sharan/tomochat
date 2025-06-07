import { useAppDispatch } from "@/hooks/useAppDispatch";
import { authApi, useGetMeQuery } from "../authApi";
import { useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase/firebaseClient";
import { logger } from "@/services/logger";

// @todo extract login, register etc to support loading
// @todo ref: account/change-password

// @todo extract
export type RegisterResponse = {
  success: boolean;
  error?: string;
};

export type LoginResponse = {
  success: boolean;
  error?: string;
};

export function useAuth() {
  const dispatch = useAppDispatch();
  const { data: user, isLoading, isError, refetch } = useGetMeQuery();

  const isLoggedIn = Boolean(user?.id);

  const login = useCallback(
    async (email: string, password: string): Promise<LoginResponse> => {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await cred.user.getIdToken();

        dispatch(
          authApi.util.updateQueryData("getMe", undefined, (draft) => {})
        );

        await refetch();
        return {
          success: true,
        };
      } catch (error) {
        logger.error(error, { method: "login" });
        return {
          success: false,
          error: "Invalid email or password",
        };
      }
    },
    [dispatch, refetch]
  );

  const register = useCallback(
    async (
      email: string,
      password: string,
      displayName: string
    ): Promise<RegisterResponse> => {
      try {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await cred.user.getIdToken();

        await dispatch(
          authApi.endpoints.register.initiate({
            idToken,
            displayName,
          })
        );

        return {
          success: true,
        };
      } catch (error) {
        const errorCode = (error as { code: string }).code;
        logger.error(error, { method: "register" });
        return {
          success: false,
          error:
            errorCode === "auth/email-already-in-use"
              ? "User already registered."
              : "Registeration failed, try again",
        };
      }
    },
    [dispatch, refetch]
  );

  const logout = useCallback(async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      dispatch(authApi.util.resetApiState());
    } catch (error) {
      logger.error(error, { method: "logout" });
    }
  }, [dispatch]);

  return {
    user,
    userId: user?.id ?? "",
    displayName: user?.displayName ?? "",
    isLoggedIn,
    isLoading,
    isError,
    login,
    register,
    refetch,
    logout,
  };
}
