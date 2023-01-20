import { results as users } from "data/users.json";
import { curry, filter } from "ramda";
import { User } from "types";

const FETCH_TIME = 500;

export const usernameIncludesChars = curry((chars: string, user: User) =>
  user.name.first.includes(chars),
);

export const fetchUsers = (input: string): Promise<User[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const filterUserPredicate = usernameIncludesChars(input);
      const filteredUsers = filter(filterUserPredicate, users);
      resolve(filteredUsers);
    }, FETCH_TIME);
  });
