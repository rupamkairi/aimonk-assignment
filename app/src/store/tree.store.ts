import { baseURL } from "@/config";
import { parseArrayToTree, parseTreeToArray } from "@/utils/tree-utils";
import ky from "ky";
import { create } from "zustand";

export const useTree = create((set) => ({
  tree: null,
  setTree: (newTree) => set({ tree: newTree }),

  addChild: async (newChild) => {
    const { id } = await (
      await ky.post(baseURL + "/api/tree", { json: newChild })
    ).json();
    newChild.id = id;
    console.log(newChild);
    return set((state) => {
      const array = parseTreeToArray(state.tree);
      array.push(newChild);
      const tree = parseArrayToTree(array);
      return { tree };
    });
  },

  editChild: async (child) => {
    await (await ky.patch(baseURL + "/api/tree", { json: child })).json();

    return set((state) => {
      const array = parseTreeToArray(state.tree);
      const ix = array.findIndex((el) => el.id === child.id);
      array[ix] = child;
      const tree = parseArrayToTree(array);
      return { tree };
    });
  },
}));
