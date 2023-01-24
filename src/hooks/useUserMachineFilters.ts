import { useSelector } from "@xstate/react";
import { useUserMachineContext } from "hooks/useUserMachineContext";
import { userMachineFiltersSelector } from "machines/selectors";

export const useUserMachineFilters = () => {
  const ctx = useUserMachineContext();
  const filters = useSelector(ctx, userMachineFiltersSelector);
  return { filters, send: ctx.send };
};
