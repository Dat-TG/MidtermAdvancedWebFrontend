import { AppState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"

const getSelf = (state: AppState) => state

export const sGetLog = createSelector(
  getSelf,
  (state: AppState) => state.log.data
)