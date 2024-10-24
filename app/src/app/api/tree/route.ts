export function GET(/* request: Request */) {
  const data = {
    tree: {
      id: 1,
      name: "root",
      parentId: null,
      children: [
        {
          id: 2,
          name: "child1",
          parentId: 1,
          children: [
            { id: 4, name: "child1-child1", parentId: 2, data: "c1-c1 Hello" },
            { id: 5, name: "child1-child2", parentId: 2, data: "c1-c2 JS" },
          ],
        },
        { id: 3, name: "child2", parentId: 1, data: "c2 World" },
      ],
    },
  };
  return Response.json(data);
}
