import useSWR from "swr";

export function useCurrentUser() {
  const { data, mutate } = useSWR("/api/user");
  return [data, { mutate }];
}

export function useUser(id) {
  const { data } = useSWR(`/api/users/${id}`, {
    revalidateOnFocus: false,
  });
  return data;
}
