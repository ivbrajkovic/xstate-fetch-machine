import { userMachineContext } from "context/userMachineContext";
import { userMachine } from "machines/userMachine";
import { useContext } from "react";

export const useUserMachineContext = () => {
  const context = useContext(userMachineContext);
  if (!context) {
    throw new Error(
      `use${userMachine.id}Context must be used inside ${userMachine.id}Provider`,
    );
  }
  return context;
};
