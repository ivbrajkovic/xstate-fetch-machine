import { useSelector } from "@xstate/react";
import { useUserMachineContext } from "hooks/useUserMachineContext";
import { userMachineUsersSelector } from "machines/selectors";

export const useUserMachineUsers = () => {
  const userContext = useUserMachineContext();
  return useSelector(userContext, userMachineUsersSelector);
};
