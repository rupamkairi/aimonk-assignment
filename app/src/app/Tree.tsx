import { useTree } from "@/store/tree.store";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export function Tree({ id, name, parentId, children, data }) {
  const { addChild, editChild } = useTree();
  const [expand, setExpand] = useState(false);

  return (
    <div className="py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="btn btn-square btn-sm shadow"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          <input
            className="input input-bordered input-sm"
            defaultValue={name}
            onChange={() => {}}
            onBlur={(e) => {
              // console.log(id, e.target.value);
              const child = { id, parentId, name: e.target.value, data };
              editChild(child);
            }}
          />
        </div>
        <div className="flex gap-2">
          {/* <button
            className="btn btn-sm"
            onClick={() => {
              const newChild = {
                id: Math.round(Math.random() * 100),
                parentId: id,
                name: "New Child",
                data: "New Data",
              };
              addChild(newChild);
            }}
          >
            Create Data for {id}
          </button> */}
          <button
            className="btn btn-sm"
            onClick={() => {
              const newChild = {
                id: Math.round(Math.random() * 1000),
                parentId: id,
                name: "New Child",
                data: "New Data",
              };
              addChild(newChild);
            }}
          >
            Add Child
          </button>
        </div>
      </div>

      {expand && (
        <div className="my-2">
          {children?.length && (
            <div className="ml-8">
              {children?.map((el, key) => (
                <TreeInit key={key} tree={el} />
              ))}
            </div>
          )}
          {data && (
            <div className="flex items-center gap-2">
              {/* <label className="ml-5 label text-sm">{data}</label> */}
              <p className="text-xs pl-1">DATA</p>
              <input
                className="input input-bordered input-sm"
                defaultValue={data}
                onBlur={(e) => {
                  const child = { id, parentId, name, data: e.target.value };
                  editChild(child);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function TreeInit({ tree }) {
  // console.log(tree);
  return (
    <div>
      <Tree {...tree} />
    </div>
  );
}

export function ExportTree() {
  const { tree } = useTree();
  const [text, setText] = useState("");

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => {
          setText(JSON.stringify(tree, null, 2));
        }}
      >
        Export
      </button>

      <div className="my-2">
        <pre>{text}</pre>
      </div>
    </div>
  );
}
