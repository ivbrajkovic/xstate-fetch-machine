// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: "fetchData";
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    fetchData: "FETCH";
    setData: "RESOLVE";
    setError: "REJECT";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates: "failure" | "idle" | "loading" | "success";
  tags: never;
}
