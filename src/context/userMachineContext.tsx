// https://github.com/mattpocock/xstate-next-boilerplate/blob/main/src/lib/createXStateContext.ts

import { useInterpret } from "@xstate/react";
import { UserMachine, userMachine } from "machines/userMachine";
import { createContext, FC, ReactElement } from "react";

import { InterpreterFrom } from "xstate";

export const userMachineContext =
  createContext<InterpreterFrom<UserMachine> | null>(null);
userMachineContext.displayName = userMachine.id;

export const UserMachineProvider: FC<{ children: ReactElement }> = (props) => {
  const userService = useInterpret(userMachine, { devTools: true });
  return (
    <userMachineContext.Provider value={userService}>
      {props.children}
    </userMachineContext.Provider>
  );
};
