import { fetchUsers } from "services/fetchUsers";
import { User, UserMachineContext, UserMachineEvent } from "types";
import { actions, assign, createMachine } from "xstate";

const { cancel, send } = actions;

const DEBOUNCE_TIMEOUT = 250;

export const userMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFdZgE4FkCGBjAFgJYB2YAdAGYD26AtmYRADZgDEAwgBICCAcgOIBRAPq9umQQG0ADAF1EoAA5VYhAC6EqxBSAAeiAGwBWaWQAsAJgsAOAMwBOOwfsAaEAE9EtgIynf3i3sHG0DvIwBfcLdUDBwCEnJqOgZmNi4+IWEhXgARQQAlGXkkEGVVDS0dfQRrCzJvb2t7M2sDaWcGgHYDN08EC1trMjbOizNO6zN7b1tpCwNI6LQsPCJSMmxFQnYmQjBiNVYAMUEAFS5hAFUAZQLrop0y9U1tEurR3sNO007bWzHWr8jK0LIsQDEVvF1pttrt9moyEwqNgICQoKwIFpyCQAG5UADWiTAagIl2WsAeJSeFVeoGqRm89jI0wM1l8FiMRgMliMnwQxk6zOsRgBFm6bQ5YIhcTW5BhOz2B0RyNRxHRGHQNDIiiY2DUSXoFGJpPJlKUKmelTeiAZTJZbLmnO5HL53Vs5jMxkaZjMtk6Rl9kSiIGIVAgcB00tWCUeFppVUQAFoxnzvAZhs5RkFWgZGtJflLljKEpQaLRY+UXgmELYzPVGs1Wu1pt5uqnpHXvC17NJGWmDJ17EPC7Fo+sDSkWBXLbS9IhLILPWErAPBpZxny-XU1x37CZHN09yPIbKNlsFfDp-Hrf0zHyA+npO12hzd6yzMfi9Dz3ClYwp1ScZVje1iCrYRidIy7RhJBkwWK6vxkD44EDgyvodqCwZRlCco-oqCJIiiaJXsBdKIGMPyDpMZhdr2Fhpp0fLcoKoyga04wGH8-yfmOuGwvhZCwMguC4HA8CAZWVpkfy9jpgOYpBAMYxBK4HiGH85jCgMJjgdIswflhRa8We-HwpQ2CEEwyDoGAJFSXOMlyaMg7-P8UwOK6gzMp6Aa2KyNjjEG4RAA */
  createMachine(
    {
      tsTypes: {} as import("./userMachine.typegen").Typegen0,
      schema: {
        context: {} as UserMachineContext<User[]>,
        events: {} as UserMachineEvent,
      },
      id: "userMachine",
      type: "parallel",
      preserveActionOrder: true,
      predictableActionArguments: true,

      context: {
        filters: {
          gender: "all",
          name: "",
        },
        error: "",
        users: [],
      },

      states: {
        // user filters
        form: {
          entry: "fetchUsers",
          initial: "idle",
          states: {
            idle: {
              on: {
                CHANGE_NAME: {
                  actions: [
                    "assignFilters",
                    "cancelFetchDebounced",
                    "startFetchDebounced",
                  ],
                },
                CHANGE_GENDER: { actions: ["assignFilters", "fetchUsers"] },
              },
            },
          },
        },

        // fetch users
        apiClient: {
          id: "apiClient",
          initial: "idle",
          on: { FETCH_USERS: { target: ".loading" } },
          states: {
            idle: {},
            loading: {
              invoke: {
                id: "fetchUsers",
                src: "fetchUsers",
                onDone: { target: "success" },
                onError: { target: "failure" },
              },
            },
            success: { entry: ["setData"] },
            failure: { entry: ["setError"] },
          },
        },
      },
    },
    {
      services: {
        fetchUsers: (ctx, _e) => fetchUsers(ctx.filters),
      },
      actions: {
        // context
        assignFilters: assign((ctx, e) => ({
          filters: { ...ctx.filters, ...e.data },
        })),
        setError: assign((_ctx, e) => ({ error: e.data, users: [] })),
        setData: assign((_ctx, e) => ({ users: e.data, error: "" })),

        // fetch
        fetchUsers: send("FETCH_USERS"),
        cancelFetchDebounced: cancel("fetchDebounceTimer"),
        startFetchDebounced: send("FETCH_USERS", {
          id: "fetchDebounceTimer",
          delay: DEBOUNCE_TIMEOUT,
        }),
      },
    },
  );

export type UserMachine = typeof userMachine;
