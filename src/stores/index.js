import create from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useBearStore = create(
  devtools(
    persist((set) => ({
      bears: false,
      inc: () => set((state) => ({ bears: !state.bears })),
      // removeAllBears: () => set({ bears: 0 }),
    }))
  )
);
