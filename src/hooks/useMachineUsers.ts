import { useSelector } from "@xstate/react";
import { useUserMachineContext } from "context/userMachineContext";
import { usersSelector } from "machines/selectors";

export const useUserMachineUsers = () => {
  const userContext = useUserMachineContext();
  const users = useSelector(userContext, usersSelector);
  return users;
};
