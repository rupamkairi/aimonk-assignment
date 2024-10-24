import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export function Tree({ id, name, parentId, children, data }) {
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
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          <input
            className="input input-bordered input-sm"
            defaultValue={name}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-sm"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            Create Data for {id}
          </button>
          <button
            className="btn btn-sm"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            Create Child for {id}
          </button>
        </div>
      </div>

      {expand && (
        <div className="py-2 pl-8">
          <div>
            {children?.map((el, key) => (
              <TreeInit key={key} tree={el} />
            ))}
          </div>
          <label className="py-2 pl-12 label text-sm">{data}</label>
        </div>
      )}
    </div>
  );
}

export function TreeInit({ tree }) {
  // console.log(tree);
  return (
    <div className="container mx-auto font-mono">
      <Tree {...tree} />
    </div>
  );
}
