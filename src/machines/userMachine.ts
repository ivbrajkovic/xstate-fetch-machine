import { fetchUsers } from "services/fetchUsers";
import { User, UserMachineContext, UserMachineEvent } from "types";
import { actions, assign, createMachine } from "xstate";
import { results as users } from "../data/users.json";

const { cancel, send } = actions;

const DEBOUNCE_TIMEOUT = 200;

export const userMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFdZgE4FkCGBjAFgJYB2YAdAGYD26AtmYRADZgDEAwgBICCAcgOIBRANoAGALqJQAByqxCAF0JViUkAA9EAdgBMAGhABPRAEYArCbKjro8wE47AFjsBmAByizAXy8HUGHAIScmxpQnYmQjBiBVYAMUEAFS4xSSQQWXklFTVNBF0DYwQzWzIANlFXMrc3LTMdRx0Xb18Qfyw8IlIyUPDI6IUyJipsCBIoVggVchIANyoAa3IKMAUCAFU0dFhUtUzFZVV0vMcylzItMrMy3VEtEy1HGsdCxCe3MjczVzM3FxvRDUXD4-FtAl0QmEIlEYkMRmNiBMMOgaGRpExsApqHRKKsNlsdhI9nIDjljm8zhcrjcdHcHu8XkZEN9HGRmlU7N8zGZGo4fK1iFQIHA1O1wcFiVlDrlEABaBqvBDy84OVVqtVuMogtpgzrBSg0WiS0lHUB5BVMhCU5yqrR2-5mFyOFqggJ67rY+iMFjG7KmjSmEx2C5uOyiM4VDwuJomRUucNslmieM6JzVZrasXuyF9GEKX3S8kIC1FFyXT7fdyhx06MquYGtLNBbq9aEDBjMMAFslmxBuVl3ZP-f7We5OxXXHRkEyVMu2J2XaqZ3XNnNt2HDUbjbv+vImfvlRzhrRl5rRnmMoqOLQfCqufsudxHzUN10dVc9KH9WGwZC4XBwPA6T7H6MpWkeZC-N8Hh3CU9qKqcrLsu4dg6G4aGXFoy5uh+rbfoMFDYIQTDIOgXbASSoFFmUEFQXYMF1HcJ4TnWFY-HYZQmBU1R8vyQA */
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
        users: users,
      },

      states: {
        // user filters
        form: {
          initial: "idle",
          states: {
            idle: {
              on: {
                CHANGE: {
                  actions: ["assignFilters", "cancelFetchUsers", "fetchUsers"],
                },
              },
            },
          },
        },

        // fetch users
        apiClient: {
          id: "apiClient",
          initial: "idle",
          on: { FETCH: { target: ".loading" } },
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
      services: { fetchUsers: (ctx, e) => fetchUsers(ctx.filters) },

      actions: {
        // context
        assignFilters: assign((ctx, e) => ({
          filters: { ...ctx.filters, ...e.data },
        })),
        setError: assign((_ctx, e) => ({ error: e.data, users: [] })),
        setData: assign((_ctx, e) => ({ users: e.data, error: "" })),

        // fetch
        cancelFetchUsers: cancel("debounced-fetch"),
        fetchUsers: send("FETCH", {
          id: "debounced-fetch",
          delay: DEBOUNCE_TIMEOUT,
        }),
      },
    },
  );

export type UserMachine = typeof userMachine;
