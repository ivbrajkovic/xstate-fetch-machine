import { fetchUsers } from "services/fetchUsers";
import { UserMachineContext, UserMachineEvent } from "types";
import { actions, assign, createMachine } from "xstate";

const { cancel, send } = actions;

const DEBOUNCE_TIMEOUT = 2000;

export const userMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QDEwBcDGALABABwBsBDAOzQDpDS0AZAS1gu1JgGJkBJGgFQFEAlANoAGALqJQeAPaw6aOlJISQAD0QB2AEzlhuvfr0BGADQgAnokMBWYeQCcVgBwBmACzOXm9Y4Bsz9QC+AaaomLhUZOREeHQAwgR0YJF0EARg7LzcsQASIuJIINKy8orKagiGdrZ+wnY+PnWaPlaa-qYWCDau5K6Ohg1Wzh7+Pk1BIejY+MSR0XEJSRQEUkQQdCRQrBCKYOTrAG5SANa7oVMRFHPxiZHLq+tQCAdSGEQlJHl5ykVyCkoF5Ra6h0hlcdmchghvWErk07UQ9UM5E0VlcwnUzUcqNhrnGIDO4Rmlxi10W5Duaw2rDAACcaVIaZRiGgAGYMgC25AJ02oURJC1uK0pj2er3enzE3xkv1KAMQQJBYIhUMcMLh5nlmjs5HUDh8jl16nUMOEPjx3IufPmNwosAArhgMHBYBksrlJQUfu8yvK7EjNK5DJDnOj1G47PCED5DLZVf1HC4rHYtK4rObJoTeVcBRRafSaa6cl9PdLvXLOn7kYHg6Hw5HXLryG5nFrk1ZIZoUWm8SQpBA4MoLUSpcU-j6EABaAORqfOex2BeLpcL3zpsI8yIXeiMEcy-6gcoBnQGE-CUGRvw9XWGLSDXTR8Fr85EpnUbdMLAsMC7ssHxCq5EE31cF6hhUZ1EjEMrHIUZNGEZxmgcYRNBcJ9M1mfkbR-Mdy2nDUEBGcgY0DLFfDRIMfFxYJ8QzDdiWtMkUjSbDZT-BAtEjLp7HqPpYXg9EwTQuirVJQV7g2Fj91URAQznfoBPcSorHUG9nHrPory0ENITsBs-SEy1sxtch7UdZ1JPHY05yNWpiLcJoXE4hwdEDDFoXcNsDJfIyyTzBkLPLKydWNP0YXs-U1Pw1xLycIZYt09FnGUoIgiAA */
  createMachine(
    {
      tsTypes: {} as import("./userMachine.typegen").Typegen0,
      schema: {
        context: {} as UserMachineContext,
        events: {} as UserMachineEvent,
      },
      id: "userMachine",
      type: "parallel",
      preserveActionOrder: true,
      predictableActionArguments: true,
      context: {
        input: "",
        error: "",
        users: [],
      },
      states: {
        plantList: {
          type: "parallel",
          states: {
            change: {
              on: {
                FILTER: {
                  actions: ["assignInput", "cancelFetchPlants", "fetchPlants"],
                },
              },
            },
          },
        },
        apiClient: {
          initial: "idle",
          states: {
            idle: {
              on: { FETCH: { target: "loading" } },
            },
            loading: {
              invoke: {
                id: "fetchUsers",
                src: "fetchUsers",
                onDone: { target: "success" },
                onError: { target: "error" },
              },
            },
            success: {
              entry: ["clearError", "setData"],
              on: { FETCH: { target: "loading" } },
            },
            error: {
              entry: ["setError", "clearData"],
              on: { FETCH: { target: "loading" } },
            },
          },
        },
      },
    },
    {
      services: {
        fetchUsers: (ctx, e) => fetchUsers(ctx.input),
      },
      actions: {
        assignInput: assign({ input: (ctx, e) => e.value }),
        cancelFetchPlants: cancel("debounced-fetch"),
        fetchPlants: send("FETCH", {
          id: "debounced-fetch",
          delay: DEBOUNCE_TIMEOUT,
        }),
        setError: assign({ error: (ctx, e) => e.data }),
        clearError: assign({ error: (ctx, e) => "" }),
        setData: assign({ users: (ctx, e) => e.data }),
        clearData: assign({ users: (ctx, e) => [] }),
      },
    },
  );

export type UserMachine = typeof userMachine;
