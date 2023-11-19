import { AppState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"
import { IGlobalStore } from "."

const getGlobalState = (state: AppState) => state.global

export const sIsLoading = createSelector(
  getGlobalState,
  (state: IGlobalStore) => state.isLoading > 0
)
