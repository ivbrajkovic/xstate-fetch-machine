import { curry } from "ramda";

export const stringIncludeChars = curry((chars: string, str: string) =>
  str.includes(chars),
);
