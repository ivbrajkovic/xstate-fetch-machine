import { UserMachine } from "machines/userMachine";
import { StateFrom } from "xstate";

export const usersSelector = (state: StateFrom<UserMachine>) =>
  state.context.users;
