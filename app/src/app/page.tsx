"use client";

import ky from "ky";
import { useEffect, useState } from "react";
import { TreeInit } from "./Tree";
import { useTree } from "@/store/tree.store";

export default function Home() {
  const { tree, setTree } = useTree();

  useEffect(() => {
    (async () => {
      try {
        const body = await (await ky.get("/api/tree")).json();
        console.log({ body });
        setTree(body.tree);
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  if (!tree) return <div>Loading...</div>;

  return <div>{<TreeInit tree={tree} />}</div>;
}
