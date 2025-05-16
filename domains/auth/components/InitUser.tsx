import { useGetMeQuery } from "../authApi";

export default function InitUser () {
  useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true
  });
  return null;
}
