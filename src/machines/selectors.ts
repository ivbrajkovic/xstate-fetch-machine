import { UserMachine } from "machines/userMachine";
import { StateFrom } from "xstate";

export const userMachineUsersSelector = (state: StateFrom<UserMachine>) =>
  state.context.users;

export const userMachineFiltersSelector = (state: StateFrom<UserMachine>) =>
  state.context.filters;
