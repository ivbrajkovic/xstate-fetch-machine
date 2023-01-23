// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.fetchUsers": {
      type: "done.invoke.fetchUsers";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.fetchUsers": {
      type: "error.platform.fetchUsers";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    fetchUsers: "done.invoke.fetchUsers";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignFilters: "CHANGE";
    cancelFetchUsers: "CHANGE";
    fetchUsers: "CHANGE";
    setData: "done.invoke.fetchUsers";
    setError: "error.platform.fetchUsers";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    fetchUsers: "FETCH";
  };
  matchesStates:
    | "apiClient"
    | "apiClient.failure"
    | "apiClient.idle"
    | "apiClient.loading"
    | "apiClient.success"
    | "form"
    | "form.idle"
    | { apiClient?: "failure" | "idle" | "loading" | "success"; form?: "idle" };
  tags: never;
}
