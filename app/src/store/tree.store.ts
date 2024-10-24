import { parseArrayToTree, parseTreeToArray } from "@/utils/tree-utils";
import { create } from "zustand";

export const useTree = create((set) => ({
  tree: null,
  setTree: (newTree) => set({ tree: newTree }),

  addChild: (newChild) =>
    set((state) => {
      console.log(newChild);

      const array = parseTreeToArray(state.tree);
      array.push(newChild);
      const tree = parseArrayToTree(array);

      return { tree };
    }),

  editChild: (child) =>
    set((state) => {
      console.log(child);

      const array = parseTreeToArray(state.tree);
      const ix = array.findIndex((el) => el.id === child.id);
      array[ix] = child;
      const tree = parseArrayToTree(array);

      return { tree };
    }),
}));
