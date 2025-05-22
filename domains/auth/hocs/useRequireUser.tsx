import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { Redirect } from "expo-router";
import { useAuth } from "../hooks/useAuth";

export function useRequireUser<T extends object>(
  Component: React.ComponentType<T>,
) {
  return function WrappedComponent(props: T) {
    const { user, isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
      return <LoadingScreen />;
    }

    if (!isLoggedIn) {
      return <Redirect href={"/login"} />;
    }

    return <Component {...props} user={user} />;
  };
}
