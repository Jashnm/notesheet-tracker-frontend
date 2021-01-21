import useSWR from "swr";

import { getProfile } from "../API/userActions";

export default function useUser() {
  const { data: user, mutate, error } = useSWR("profile", getProfile);

  const loading: boolean = !user && !error;
  const authenticated: boolean = !error && user;

  return {
    loading,
    authenticated,
    user,
    mutate,
    error
  };
}
