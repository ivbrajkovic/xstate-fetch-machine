import { allPass, curry, filter } from "ramda";
import { User, UserFilters } from "types";
import { results as users } from "../data/users.json";

const FETCH_TIME = 500;

const filterByName = curry((name: string, user: User) =>
  user.name.first.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
);

const filterByGender = curry((gender: string, user: User) =>
  gender === "all" ? true : gender !== user.gender,
);

let timer: number | undefined;

export const fetchUsers = (filters: UserFilters): Promise<User[]> =>
  new Promise((resolve) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      const userFilter = allPass([
        filterByGender(filters.gender),
        filterByName(filters.name),
      ]);
      const filteredUsers = filter(userFilter, users);
      resolve(filteredUsers);
      timer = undefined;
    }, FETCH_TIME);
  });
