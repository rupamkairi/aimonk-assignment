import { create } from "zustand";

export const useTree = create((set) => ({
  tree: null,
  setTree: (newTree) => set({ tree: newTree }),
}));
