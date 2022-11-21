import create from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useBearStore = create(
  devtools(
    persist((set) => ({
      //set : 함수 병합 역할
      bears: 0, //초기값
      increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }))
  )
);
