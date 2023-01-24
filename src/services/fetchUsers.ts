import { curry, filter } from "ramda";
import { User, UserFilters } from "types";

const filterByName = curry((name: string, user: User) =>
  user.name.first.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
);

// TODO: add cancelation

export const fetchUsers = async (filters: UserFilters): Promise<User[]> => {
  const url = `https://randomuser.me/api/?results=10&noinfo&&gender=${filters.gender}`;
  const response = await fetch(url);
  const { results: users } = await response.json();
  return filter(filterByName(filters.name), users);
};
