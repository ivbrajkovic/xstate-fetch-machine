// https://github.com/mattpocock/xstate-next-boilerplate/blob/main/src/lib/createXStateContext.ts

import { useInterpret } from "@xstate/react";
import { UserMachine, userMachine } from "machines/userMachine";
import {
  createContext,
  FC,
  ReactElement,
  useContext as useReactContext,
} from "react";

import { InterpreterFrom } from "xstate";

export const userStateContext =
  createContext<InterpreterFrom<UserMachine> | null>(null);
userStateContext.displayName = userMachine.id;

export const UserMachineProvider: FC<{ children: ReactElement }> = (props) => {
  const userService = useInterpret(userMachine);
  return (
    <userStateContext.Provider value={userService}>
      {props.children}
    </userStateContext.Provider>
  );
};

export const useUserMachineContext = () => {
  const context = useReactContext(userStateContext);
  if (!context) {
    throw new Error(
      `use${userMachine.id}Context must be used inside ${userMachine.id}Provider`,
    );
  }
  return context;
};
