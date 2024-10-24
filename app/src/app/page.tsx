"use client";

import { useTree } from "@/store/tree.store";
import ky from "ky";
import { useEffect } from "react";
import { ExportTree, TreeInit } from "./Tree";

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

  // console.log(parseArrayToTree(array));
  // console.log(parseTreeToArray(parseArrayToTree(array)));

  if (!tree) return <div>Loading...</div>;

  return (
    <div className="container mx-auto font-mono">
      {<TreeInit tree={tree} />}
      <br />
      <ExportTree />
    </div>
  );
}
