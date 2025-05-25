import { useGetMeQuery } from "../authApi";

export function useAuth() {
  const { data: user, isLoading, isError } = useGetMeQuery();

  const isLoggedIn = Boolean(user?.id);

  return {
    user,
    userId: user?.id ?? "",
    displayName: user?.displayName ?? "",
    isEmailVerified: user?.isEmailVerified,
    isLoggedIn,
    isLoading,
    isError,
  };
}
