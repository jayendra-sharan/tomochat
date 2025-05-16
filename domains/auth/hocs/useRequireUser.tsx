import LoadingScreen from "@/domains/shared/components/LoadingScreen";
import { useGetMeQuery } from "../authApi"
import { Redirect } from "expo-router";

export function useRequireUser<T extends object>(Component: React.ComponentType<T>) {
  return function WrappedComponent(props: T) {
    const { data: user, isLoading } = useGetMeQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

    if (isLoading) {
      return <LoadingScreen />
    }

    if (!user) {
      return <Redirect href={"/login"} />
    }

    return <Component {...props} user={user} />
  }
}
